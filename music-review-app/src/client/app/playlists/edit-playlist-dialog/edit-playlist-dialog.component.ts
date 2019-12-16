import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PlaylistService } from './../playlistsServices/playlist.service';
import { SongsService } from './../../songs/songsServices/songs.service';
import { AuthService } from './../../services/auth.service';
import { PlaylistModel } from './../playlistModel';


@Component({
  selector: 'app-edit-playlist-dialog',
  templateUrl: './edit-playlist-dialog.component.html',
  styleUrls: ['./edit-playlist-dialog.component.css']
})
/*
  Class which is called from Edit Playlist component for displaying the 
  Dialog Box for editing various user requested options
*/
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
  newSongsAddedController = new FormControl();
  itemToChange:Object;
  playListIDToChange:string;
  playListUpdated:object;
  newSongsAdded:string[] = [];
  allSongsDropdown:object[];
  isToReRenderParentComponent:boolean = false;  
  existingPlayListData:PlaylistModel[];
  songAlreadyExist:boolean = false;
  playListTitle:string;

  /*
    Injected various required services for handling and managing all the user requested 
    operations in this dialog box
  */
  constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditPlaylistDialogComponent>,
        private _playlistService:PlaylistService,
        private _songsService:SongsService,
        private _authService:AuthService,
        @Inject(MAT_DIALOG_DATA) data) {

        this.description = data.description;
        this.playListID = data.id;
        this.existingPlayListData = data.playListData;
        this.playListTitle = data.playlistTitle;
    }

  /*
    This is called when the Component is in the initialisation
    state
  */
  ngOnInit() {

    //Local method used to fetch All Songs to show in dropdown
    this.callServiceToFetchAllSongs();

    //Handling Playlist Title Changes
    this.newPlaylistTitleController.valueChanges.subscribe(newValue=>{
      console.log(`New title is ${newValue}`);
      this.itemToChange = {
        'playlistTitle':newValue,
        'userEmail':this._authService.userProfileSubject$.value.email
      }
    });
    
    //Handling Playlist Description Changes
    this.newPlaylistDescriptionController.valueChanges.subscribe(newValue=>{
      console.log(`New Description is ${newValue}`);
      // let key = 'playlistDescription';
      this.itemToChange = {
        "playlistDescription":newValue,
        'userEmail':this._authService.userProfileSubject$.value.email
      }
      
    });
    //Handling Playlist Visibility Scope Changes
    this.newPlaylistVisibilityScopeController.valueChanges.subscribe(newValue=>{
      console.log(`New Scope is ${newValue}`);
      this.itemToChange = {
        "playListVisibilityScope":newValue,
        'userEmail':this._authService.userProfileSubject$.value.email
      }
    });
    //Handling of new songs added in playlist
    this.newSongsAddedController.valueChanges.subscribe(newValue=>{
      let selectedSongsJson = [];
      console.log(`New song ${newValue} added`);
      console.log('newSongsAdded');
      for(let i=0;i<this.existingPlayListData.length;i++) {
        if(this.playListTitle === this.existingPlayListData[i].playlistTitle) {
          for(let j=0;j<this.existingPlayListData[i].songsInPlaylist.length;j++){
            if(this.existingPlayListData[i].songsInPlaylist[j].songs._id ==newValue) {
              this.songAlreadyExist = true;
            }
          }  
        }
      }
      if(!this.songAlreadyExist) {
        for(let i=0;i<newValue.length;i++) {
          selectedSongsJson.push({'songs':newValue[i]});
        }  
      }
      
      
      this.itemToChange = {
        "songsInPlaylist":selectedSongsJson,
        'userEmail':this._authService.userProfileSubject$.value.email
      }
    });

  }
  /*
    Function called from the template itself to close the dialog button
    on user request
  */
  close() {
    this.dialogRef.close();
  }

  /*
    Below function is triggered after user has performed required changes
    in the Dialog Button. this function basically saves the user requested 
    operations in the DB.
  */
  save() {
    console.log(`Updating the attributes`);
    this.callServiceForUpdatingPlaylistAttributes();
  }
  
  /*
    This function is calling the playlist services to updated user requested changes 
    in the Database
  */
  callServiceForUpdatingPlaylistAttributes() {
        this._playlistService.updateExistingPlaylist(this.itemToChange,this.playListID).subscribe(updatedPlaylist=>{
          this.playListUpdated = updatedPlaylist;
          if(updatedPlaylist.message==="Success") {
            this.isToReRenderParentComponent = true;
            this.dialogRef.close(this.isToReRenderParentComponent);
          }
        });
  }

  /*
    Service called to display all songs in the dropdown button to user
    who may try to perform add more songs operation in the existing playlist
  */
  callServiceToFetchAllSongs(){
    this._songsService.fetchAllSongs().subscribe(results=>{
      this.allSongsDropdown = results.reviews;
    });
  }
}
