import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PlaylistService } from './../../playlists/playlistsServices/playlist.service';
import { Observable } from 'rxjs';
import { PlaylistModel } from './../../playlists/playlistModel';
import { AuthService } from './../../services/auth.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-add-song-to-playlist-dialog',
  templateUrl: './add-song-to-playlist-dialog.component.html',
  styleUrls: ['./add-song-to-playlist-dialog.component.css']
})

/*
  AddSongToPlaylistDialogComponent is used to add Song to the playlist
  from search bar. This is a Dialog compoent which gets opened from the
  search bar whenever user wants to add searched song to playlist
*/
export class AddSongToPlaylistDialogComponent implements OnInit {
  addNewSongToPlaylistForm:FormGroup;
  playlistsData:PlaylistModel[];
  selectedPlaylistID:string;
  optionSelectedControl = new FormControl();
  itemToChange:Object;
  selectedSongTitle:string;
  selectedSongID:string;
  isToReRenderParentComponent:boolean=false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSongToPlaylistDialogComponent>,
    private _playlistService:PlaylistService,
    private _authService:AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) { this.selectedSongID = data.songId;
      this.selectedSongTitle = data.songTitle;
      console.log(`Selected song id is ${this.selectedPlaylistID}`);
    }

  ngOnInit() {
    //fetch all user's playlist.
    this.fetchAllPlaylistsOfUser();
    this.optionSelectedControl.valueChanges.subscribe(val=>{
      console.log(`We have selected playlist with id ${val}`);
      this.selectedPlaylistID = val
    });
          
  }

  fetchAllPlaylistsOfUser() {
    let userEmail = this._authService.userProfileSubject$.value.email
    this._playlistService.fetchExistingPlaylist(userEmail).subscribe(
      results=>{
        this.playlistsData = results.playlists;
      }
    )
  }
  close() {
    this.dialogRef.close();
  }

  save() {
    console.log('Save Called');
    let selectedSongsJson = [];
      console.log(`New song ${this.selectedSongID} added`);
      console.log('newSongsAdded');
      selectedSongsJson.push({'songs':this.selectedSongID});
      this.itemToChange = {
        "songsInPlaylist":selectedSongsJson,
        'userEmail':this._authService.userProfileSubject$.value.email
      }
    this._playlistService.updateExistingPlaylist(this.itemToChange,this.selectedPlaylistID).subscribe(result=>{
      if(result.message ==="Success") {
        this.isToReRenderParentComponent = true;
        this.dialogRef.close(this.isToReRenderParentComponent);
      }
      
    });
  }

  createNewPlaylist(){
    console.log(`Calling service to create a new playlist`);
    this.router.navigate(['/createPlaylist']);
    this.close();
  }
}
