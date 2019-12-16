import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { PlaylistService } from './../playlistsServices/playlist.service';
import { SongsService } from './../../songs/songsServices/songs.service';
import { Observable } from 'rxjs';
import { PlaylistModel } from './../playlistModel';
import { AuthService } from './../../services/auth.service';
import { SearchMusicWithinPlaylistPipe } from './../../pipe/search-music-within-playlist.pipe';

@Component({
  selector: 'app-create-new-playlist',
  templateUrl: './create-new-playlist.component.html',
  styleUrls: ['./create-new-playlist.component.css'],
  providers:[PlaylistService]
})
/*
  Class responsible for creating new playlist and rendering the 
  create new playlist component
*/
export class CreateNewPlaylistComponent implements OnInit {
  createNewPlaylistForm: FormGroup;
  query:string;
  songs = new FormControl();
  visibilitySelected = new FormControl();
  playlistCreated = false;
  songsData:Observable<any>[];
  selectedSongs:object[];
  selectedVisibility:string = 'Private';
  songsList: string;
  
  /*
    Injected all the required services
  */
  constructor(public auth: AuthService,private _playlistService:PlaylistService, private _songsService:SongsService, private _pipe:SearchMusicWithinPlaylistPipe) {

   }

  ngOnInit() {
    this.getAllSongs();
  }
  /*
    Function used to call service to fetch all songs to display in songs dropdown
    while creating new playlists
  */
  getAllSongs(){
    this._songsService.fetchAllSongs().subscribe(
      songs=>{
        this.songsData = songs.reviews;
        console.log(`Songs Data is ${this.songsData}`);
        this.songsList = songs.reviews;
      }
    )
  }

  /*
    Function called when user clicks on submit to create new playlists
  */
  onFormSubmit(form:any){
    let selectedSongsJson = [];
    console.log(`On Form Submit called ${this.selectedVisibility}`);
    for(let i=0;i<this.selectedSongs.length;i++) {
      selectedSongsJson.push({'songs':this.selectedSongs[i]});
    }
    

    let PlaylistToAdd : PlaylistModel  = {
      playlistTitle:form.playlistTitle,
      playlistDescription:form.playlistDescription,
      songsInPlaylist:selectedSongsJson,
      playListVisibilityScope:this.selectedVisibility,
      createdByUser:this.auth.userProfileSubject$.value.email
     
    };
    this.callServiceForCreatingNewPlaylist(PlaylistToAdd);
    this.createNewPlaylistForm.reset();
  }

  /*
    Calling Playlist service for actually creating the user playlist
  */
  callServiceForCreatingNewPlaylist(newPlaylist:PlaylistModel){
    this._playlistService.createNewPlaylist(newPlaylist).subscribe(
      newPlaylist=>{
        this.playlistCreated = true;
      }
    )
  }

  /*
    Below funtion takes care of displaying all the search keywords which are type by the user
    to add song to the playlist
  */
  handleQuery(query:string){
    console.log(`Checking for input query ${query}`);
    console.log(`Calling pipe`);
    this.songsList = this._pipe.transform(this.songsData,query);
  }
  
}
