import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SongsService } from './../songs/songsServices/songs.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import {MatDialog, MatDialogConfig} from "@angular/material";
import { AddSongToPlaylistDialogComponent } from './add-song-to-playlist-dialog/add-song-to-playlist-dialog.component';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-search-home-page',
  templateUrl: './search-home-page.component.html',
  styleUrls: ['./search-home-page.component.css'],
  providers:[SongsService]
})

/*
  SearchHomePageCompoent is intitalied whenever user clicks on the search bar placed on the 
  the right hand side of the home page. This component takes care of searching user entered query 
  in the Songs Database.
*/
export class SearchHomePageComponent implements OnInit {
  searchControl = new FormControl();
  searchTerm$ = new Subject<string>();
  songsData:Observable<string[]>;
  songsList:string[];
  playlistTitle:string;
  filteredSongs;
  isAdminLoggedIn:string;

  /*
    Event Emmitter to transfer the values of the event to the parent function which is home Compoent
  */
  @Output() messageToEmit = new EventEmitter<string>();

/*
    Constructor for injecting the songsService,MatDialog and Auth Service.
  */
  constructor(private _songsService : SongsService,private dialog: MatDialog,private auth:AuthService) { 
    this._songsService.filteredSongs$.subscribe(newValue=>{
      console.log(`new value is ${newValue.songs}`);
      this.filteredSongs = newValue.songs;

      this.messageToEmit.emit(this.filteredSongs);
    });
  }

  ngOnInit() {
    console.log('Initialising component');
    this.isAdminLoggedIn = localStorage.getItem("isAdmin"); 
    }

    /*
      Function to open dialog when user clicks on the add song to playlist while searching for any song
    */
    openDialog(songID:string,songTitle:string) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.minHeight = "300px";
      dialogConfig.minWidth = "500px";
  
      dialogConfig.data = {
        songId: songID,
        songTitle:songTitle
    };
    const dialogRef = this.dialog.open(AddSongToPlaylistDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
          data =>{
            console.log("Dialog output:", data.isToReRenderParentComponent)
          }); 
    }

    searchSongs(songTitle: string) {
      this._songsService.searchSongs(songTitle);
  
    }

    
}