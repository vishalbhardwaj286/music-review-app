import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormControl,Validators } from '@angular/forms';
import { PlaylistService } from './../playlistsServices/playlist.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-playlist-dialog-component-from-home-page',
  templateUrl: './playlist-dialog-component-from-home-page.component.html',
  styleUrls: ['./playlist-dialog-component-from-home-page.component.css']
})
export class PlaylistDialogComponentFromHomePageComponent implements OnInit {
  songID:string;
  selectedPlaylist:string;
  loggedInUser:string
  addNewSongToPlaylistController = new FormControl(null,Validators.required);
  allPlaylists:object[];
  playlistSelectedToAddSong:string;
  itemToChange:object;

  constructor(
    private dialogRef: MatDialogRef<PlaylistDialogComponentFromHomePageComponent>,
    private _playlistService:PlaylistService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) data,
  ) { 
    this.songID = data.songID;
    this.loggedInUser = auth.userProfileSubject$.value.email;
  }

  ngOnInit() {
    //Calling playlist service to fetch all existing playlists of User
    this.callPlaylistServiceToFetchExistingUserPlaylist();
    this.addNewSongToPlaylistController.valueChanges.subscribe(newValue=>{
      this.selectedPlaylist = newValue;
    });
  }
  //Calling the actual Service
  callPlaylistServiceToFetchExistingUserPlaylist(){
    this._playlistService.fetchExistingPlaylist(this.loggedInUser).subscribe(result=>{
      this.allPlaylists =  result.playlists;
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(`Updating the attributes`);
    this.callServiceForUpdatingPlaylistAttributes();
    this.dialogRef.close();
  }
  
  //Calling Playlist Service for Adding New Song To It
  callServiceForUpdatingPlaylistAttributes() {
    let selectedSongsJson = [];
      console.log(`New song ${this.songID} added`);
      console.log('newSongsAdded');
      selectedSongsJson.push({'songs':this.songID});
      this.itemToChange = {
        "songsInPlaylist":selectedSongsJson,
        'userEmail':'vishalbhardwaj630@gmail.com'
      }
      this._playlistService.updateExistingPlaylist(this.itemToChange,this.selectedPlaylist).subscribe(result=>{
      console.log(`Service Executed`);
    });
  }

}


// let selectedSongsJson = [];
// console.log(`New song ${newValue} added`);
// console.log('newSongsAdded');
// for(let i=0;i<newValue.length;i++) {
// selectedSongsJson.push({'songs':newValue[i]});
// }

// this.itemToChange = {
//   "songsInPlaylist":selectedSongsJson,
//   'userEmail':'vishalbhardwaj630@gmail.com'
// }
// });