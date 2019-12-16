import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { SongsService } from '../songsServices/songs.service';

@Component({
  selector: 'app-view-hidden-songs-dialog',
  templateUrl: './view-hidden-songs-dialog.component.html',
  styleUrls: ['./view-hidden-songs-dialog.component.css']
})
/*
  Component to Render Hidden songs to the admin. It opens a dilaog
  box which contains all the hidden songs information in the table
*/
export class ViewHiddenSongsDialogComponent implements OnInit {

  dataSource:object;
  displayedColumns: string[] = ['position', 'title', 'artist', 'genre','year'];
  selectedSongtToUnhide:string[]=[];
  itemToChange:object;
  isToReRender:boolean = false;
  constructor(
 
    private dialogRef: MatDialogRef<ViewHiddenSongsDialogComponent>,
    private _songsService:SongsService,
    @Inject(MAT_DIALOG_DATA) data) {

    
}

  ngOnInit() {
    this.callServiceToFetchAllHiddenSongs();
  }

  //Calling song service to fetch all hidden songs
  callServiceToFetchAllHiddenSongs() {
    this._songsService.fetchAllSongs('showAllHiddenSongsQuery').subscribe(result=>{
      this.dataSource = result;
    })
  }

  /*
    Called from the template in order to close the dialog box	
  */
  close() {
    this.dialogRef.close();
  }

  /*
    Function called to save the user requested changes	
  */
  save() {
    if(this.selectedSongtToUnhide.length>0) {
      this.callServiceToChangeVisibilityOfSongs();
    }
    
  }

  /*
    handleClick method takes one string arguement which is 
    songID that is updated every time the user click on the 
    check box corresponding to the song user wants to add
  */
  handleClick(songID:string) {
    this.selectedSongtToUnhide.push(songID);
  }

  /*
    Calling song Service method to toggle the visibility of the songs
  */
  callServiceToChangeVisibilityOfSongs(){
    let selectedSongsJSON = [];
    for(let i=0;i<this.selectedSongtToUnhide.length;i++) {
      selectedSongsJSON.push(
      {
        'id':this.selectedSongtToUnhide[i],
        'songVisibility':true
      },
      );
      }
      
      this.itemToChange = {
        selectedSongsJSON
      }
    this._songsService.unhideSongFromList(this.itemToChange).subscribe(result=>{
      if(result.status === "Success") {
        //Re-render the whole page to show the updated view to the User
        this.isToReRender = true;
        this.dialogRef.close(this.isToReRender);
      }
      else {
        this.dialogRef.close(this.isToReRender);
      }
      
    });
  }

  
}
