import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { SongsService } from '../songsServices/songs.service';

@Component({
  selector: 'app-view-hidden-songs-dialog',
  templateUrl: './view-hidden-songs-dialog.component.html',
  styleUrls: ['./view-hidden-songs-dialog.component.css']
})
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

  close() {
    this.dialogRef.close();
  }

  save() {
    if(this.selectedSongtToUnhide.length>0) {
      this.callServiceToChangeVisibilityOfSongs();
    }
    
  }

  handleClick(songID:string) {
    this.selectedSongtToUnhide.push(songID);
  }

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
