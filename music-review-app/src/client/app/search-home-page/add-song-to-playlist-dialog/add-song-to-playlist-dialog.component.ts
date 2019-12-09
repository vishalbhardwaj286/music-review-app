import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PlaylistService } from './../../playlists/playlistsServices/playlist.service';
import { Observable } from 'rxjs';
import { PlaylistModel } from './../../playlists/playlistModel';

@Component({
  selector: 'app-add-song-to-playlist-dialog',
  templateUrl: './add-song-to-playlist-dialog.component.html',
  styleUrls: ['./add-song-to-playlist-dialog.component.css']
})
export class AddSongToPlaylistDialogComponent implements OnInit {
  addNewSongToPlaylistForm:FormGroup;
  playlistsData:PlaylistModel[];
  selectedPlaylistID:string;
  optionSelectedControl = new FormControl();
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSongToPlaylistDialogComponent>,
    private _playlistService:PlaylistService,
    @Inject(MAT_DIALOG_DATA) data
  ) { }

  ngOnInit() {
    //fetch all user's playlist.
    this.fetchAllPlaylistsOfUser();
    this.optionSelectedControl.valueChanges.subscribe(val=>{
      console.log(`We have selected playlist with id ${val}`);
      this.selectedPlaylistID = val
    });
          
  }

  fetchAllPlaylistsOfUser() {
    let userEmail = 'vishalbhardwaj630@gmail.com';
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
    // this._playlistService.
  }

  createNewPlaylist(){
    console.log(`Calling service to create a new playlist`);
  }
}
