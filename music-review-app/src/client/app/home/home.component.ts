import { Component, OnInit } from '@angular/core';
import { SongsService } from './../songs/songsServices/songs.service';
import { SongsModel } from './../songs/songsModel';
import { AuthService } from './../services/auth.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { RatingDialogComponent } from './../ratings/rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[SongsService],
})
export class HomeComponent implements OnInit {
  topTenSongs:SongsModel[];
  comments:string;  

  constructor(private _songsService:SongsService,public auth: AuthService,private dialog: MatDialog) { 
    //console.log(`logged in User Details are ${auth.userProfileSubject$.value.email}`);
    //this.callServiceForDisplayingTop10Songs();
  }

  ngOnInit() {
    console.log(`Calling service to retrieve top 10 most reviewed songs`);
    this.callServiceForDisplayingTop10Songs();
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
  }
}
