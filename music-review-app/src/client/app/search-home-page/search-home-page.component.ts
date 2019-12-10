import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SongsService } from './../songs/songsServices/songs.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import {MatDialog, MatDialogConfig} from "@angular/material";
import { AddSongToPlaylistDialogComponent } from './add-song-to-playlist-dialog/add-song-to-playlist-dialog.component';

@Component({
  selector: 'app-search-home-page',
  templateUrl: './search-home-page.component.html',
  styleUrls: ['./search-home-page.component.css'],
  providers:[SongsService]
})
export class SearchHomePageComponent implements OnInit {
  searchControl = new FormControl();
  searchTerm$ = new Subject<string>();

  songsData:Observable<string[]>;
  songsList:string[];
  playlistTitle:string

  constructor(private _songsService : SongsService,private dialog: MatDialog) { 
  
  }

  readonly filteredSongs$ = this.searchTerm$.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(songTitle => this._songsService.fetchAllSongs(songTitle))
  );

  ngOnInit() {
    console.log('Initialising component');
  
    }
    
    displayTitlefunction(song){
      return song?song.title:undefined;
    }

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
          data => console.log("Dialog output:", data)
      );    
    }

    
  searchSongs(songTitle: string) {
    this.searchTerm$.next(songTitle);
  }
}