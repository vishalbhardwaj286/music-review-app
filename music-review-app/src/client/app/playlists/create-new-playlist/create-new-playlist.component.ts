import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { PlaylistService } from './../playlistsServices/playlist.service';
import { SongsService } from './../../songs/songsServices/songs.service';
import { Observable } from 'rxjs';
import { PlaylistModel } from './../playlistModel';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-create-new-playlist',
  templateUrl: './create-new-playlist.component.html',
  styleUrls: ['./create-new-playlist.component.css'],
  providers:[PlaylistService]
})
export class CreateNewPlaylistComponent implements OnInit {
  createNewPlaylistForm: FormGroup;
  songs = new FormControl();
  playlistCreated = false;
  songsData:Observable<any>[];
  selectedSongs:string[];
  songsList: string;
  constructor(public auth: AuthService,private _playlistService:PlaylistService, private _songsService:SongsService) {

   }

  ngOnInit() {
    this.getAllSongs();
  }

  getAllSongs(){
    this._songsService.fetchAllSongs().subscribe(
      songs=>{
        this.songsData = songs.songs;
        console.log(`Songs Data is ${this.songsData}`);
        this.songsList = songs.songs;
      }
    )
  }

  onFormSubmit(form:any){
    console.log(`On Form Submit called ${form.selectedSongs}`);
    
    for(let i=0;i<this.selectedSongs.length ;i++){  //How to properly iterate here!!
      this.selectedSongs = JSON.stringify(this.selectedSongs);
      
    }
    let PlaylistToAdd : PlaylistModel  = {
      playlistTitle:form.playlistTitle,
      playlistDescription:form.playlistDescription,
      songsInPlaylist:this.selectedSongs,
      // createdByUser:this.auth.userProfileSubject$.value.email
      createdByUser:'vishal B.'
    };
    this.callServiceForCreatingNewPlaylist(PlaylistToAdd);
    this.createNewPlaylistForm.reset();
  }

  callServiceForCreatingNewPlaylist(newPlaylist:PlaylistModel){
    this._playlistService.createNewPlaylist(newPlaylist).subscribe(
      newPlaylist=>{
        this.playlistCreated = true;
      }
    )
  }

  }
