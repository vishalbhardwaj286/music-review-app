import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SongsService } from './../songs/songsServices/songs.service';
import { Observable } from 'rxjs';
import { SearchMusicWithinHomePipe } from '../pipe/search-music-within-home.pipe';
import {map, startWith} from 'rxjs/operators';
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
  
  songsData:Observable<string[]>;
  songsList:string[];
  playlistTitle:string

  constructor(private _songsService : SongsService,private _pipe:SearchMusicWithinHomePipe,private dialog: MatDialog) { 
    
  }

  ngOnInit() {
    this.fetchAllSongs(this.playlistTitle);
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.songsList.filter(
        option => option['title'].toLowerCase().includes(filterValue) ||
        option['genre'].toLowerCase().includes(filterValue) ||
        option['artist'].toLowerCase().includes(filterValue) 
        );
    }
    
    fetchAllSongs(query:string) {
      this._songsService.fetchAllSongs(query).subscribe(
        songs=>{
          this.songsList = songs.songs;
          console.log(`Songs Data is ${this.songsData}`);
          this.songsData = this.searchControl.valueChanges
          .pipe(
            startWith(''),
            map(
              value => 
              this._filter(value))
          );
        }
      )
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
}