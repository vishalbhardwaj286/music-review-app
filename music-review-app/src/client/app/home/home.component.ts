import { Component, OnInit } from '@angular/core';
import { SongsService } from './../songs/songsServices/songs.service';
import { SongsModel } from './../songs/songsModel';
import { AuthService } from './../services/auth.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { RatingDialogComponent } from './../ratings/rating-dialog/rating-dialog.component';
import { PlaylistDialogComponentFromHomePageComponent } from './../playlists/playlist-dialog-component-from-home-page/playlist-dialog-component-from-home-page.component';
import { ViewHiddenSongsDialogComponent } from '../songs/view-hidden-songs-dialog/view-hidden-songs-dialog.component';
// import { UserService } from './../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[SongsService],
})
export class HomeComponent implements OnInit {
  topTenSongs:SongsModel[];
  comments:string;
  topTenSongsfiltered
  receivedChildMessage: string;
  isAdminLoggedIn:string;
  updateObject:object;
  isToReRender:boolean = true;
  getMessage(message: string) {
    this.receivedChildMessage = message;
  }

  constructor(private _songsService:SongsService,public auth: AuthService,private dialog: MatDialog) { 
    this.auth.userProfile$.subscribe(result=>{
      if(result!==null) {
        this.isAdminLoggedIn = localStorage.getItem("isAdmin"); 
      }
    });
    this._songsService.observing.subscribe(newValue=>{
      console.log(`new value is the ${newValue}`);
      this.topTenSongsfiltered = newValue;
      
    })
  }

  

  ngOnInit() {
    console.log(`Calling service to retrieve top 10 most reviewed songs`);
    // this.isAdminLoggedIn = localStorage.getItem("isAdmin");
    console.log(`Logged in user is admin ${this.isAdminLoggedIn}`);
    if(this.auth.loggedIn) {
      this.callServiceForDisplayingAllSongs();
    }
    else {
      this.callServiceForDisplayingTop10Songs();
    }
    
  }

  callServiceForDisplayingAllSongs() {
    this._songsService.fetchAllSongs().subscribe(
      songs=>{
        this.topTenSongs = songs.reviews;
      }
    )
  }

  callServiceForDisplayingTop10Songs(){
    this._songsService.fetchTop10Songs().subscribe(
      songs=>{
        console.log(`Inside it ${songs.reviews[0]}`);
        this.topTenSongs = songs.reviews;
      }
    )
  }


  openDialog(songID:string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = "100px";
    dialogConfig.minWidth = "100px";

    dialogConfig.data = {
      songID:songID,
      comments: this.comments
  };
  const dialogRef = this.dialog.open(RatingDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );    
  }

  addSongToPlaylistDialog(songID:string) {
    console.log(`songID to be added is ${songID}`);
    const dialogConfigForAddingSongToPlaylist = new MatDialogConfig();
    dialogConfigForAddingSongToPlaylist.disableClose = true;
    dialogConfigForAddingSongToPlaylist.autoFocus = true;
    dialogConfigForAddingSongToPlaylist.minHeight = "100px";
    dialogConfigForAddingSongToPlaylist.minWidth = "100px";

    dialogConfigForAddingSongToPlaylist.data = {
      songID:songID
  };
  const dialogRef = this.dialog.open(PlaylistDialogComponentFromHomePageComponent, dialogConfigForAddingSongToPlaylist);
    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );    
  }
  
  //This function hides the selected song by admin from all the subsequent views
  hideSongFromList(songID:string) {
    //call the song service for hiding the song id
    console.log(`Song id to update is ${songID}`);
  this.updateObject = {
    'songID':songID,
    'songVisibility':false
  }    
    this._songsService.hideSongFromList(this.updateObject).subscribe(result=>{
      if(result.result === "Success") {
        //Refresh the page again to show unhidden songs list
        this.callServiceForDisplayingTop10Songs();
      }
    });
  }

  //Function to open dialog box to show all hidden songs to admin
  viewAllHiddenSongs(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = "300px";
    dialogConfig.minWidth = "650px";
    dialogConfig.data = {
      
  };
  const dialogRef = this.dialog.open(ViewHiddenSongsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data=>{
      console.log("Dialog output:", data);
      this.isToReRender = data;
      if(this.isToReRender == true) {
        // Re-rendering home page
        this.callServiceForDisplayingTop10Songs();
      }   
    });

    
  }
  
}
