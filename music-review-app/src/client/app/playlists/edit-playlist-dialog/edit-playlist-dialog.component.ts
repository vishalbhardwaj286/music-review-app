import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PlaylistService } from './../playlistsServices/playlist.service';
import { PlaylistModel } from './../playlistModel';

@Component({
  selector: 'app-edit-playlist-dialog',
  templateUrl: './edit-playlist-dialog.component.html',
  styleUrls: ['./edit-playlist-dialog.component.css']
})
export class EditPlaylistDialogComponent implements OnInit {

  editPlaylistForm: FormGroup;
  description:string;
  playListID:string;
  selectedOptionToEdit:string;
  playlistDescription:string;
  optionSelectedControl = new FormControl();
  newPlaylistTitleController = new FormControl();
  newPlaylistDescriptionController = new FormControl();
  newPlaylistVisibilityScopeController = new FormControl();
  itemToChange:Object;
  playListIDToChange:string;
  playListUpdated:object;

  constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditPlaylistDialogComponent>,
        private _playlistService:PlaylistService,
        @Inject(MAT_DIALOG_DATA) data) {

        this.description = data.description;
        this.playListID = data.id;
    }

  ngOnInit() {
  
    //Handling Playlist Title Changes
    this.newPlaylistTitleController.valueChanges.subscribe(newValue=>{
      console.log(`New title is ${newValue}`);
      this.itemToChange = {
        'playlistTitle':newValue,
        'userEmail':'vishalbhardwaj630@gmail.com'
      }
    });
    
    //Handling Playlist Description Changes
    this.newPlaylistDescriptionController.valueChanges.subscribe(newValue=>{
      console.log(`New Description is ${newValue}`);
      // let key = 'playlistDescription';
      this.itemToChange = {
        "playlistDescription":newValue,
        'userEmail':'vishalbhardwaj630@gmail.com'
      }
      
    });
    //Handling Playlist Visibility Scope Changes
    this.newPlaylistVisibilityScopeController.valueChanges.subscribe(newValue=>{
      console.log(`New Scope is ${newValue}`);
      this.itemToChange = {
        "playListVisibilityScope":newValue,
        'userEmail':'vishalbhardwaj630@gmail.com'
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(`Updating the attributes`);
    this.callServiceForUpdatingPlaylistAttributes();
    this.dialogRef.close(this.editPlaylistForm.value);
  }
  
  callServiceForUpdatingPlaylistAttributes() {
        this._playlistService.updateExistingPlaylist(this.itemToChange,this.playListID).subscribe(updatedPlaylist=>{
          this.playListUpdated = updatedPlaylist;
        });
  }
}
