import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SongsService } from './../songs/songsServices/songs.service';
import { Observable } from 'rxjs';
import { SearchMusicWithinHomePipe } from '../pipe/search-music-within-home.pipe';
import {map, startWith} from 'rxjs/operators';


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
  // results: any[] = [];
  // queryField: FormControl = new FormControl();

  constructor(private _songsService : SongsService,private _pipe:SearchMusicWithinHomePipe) { 
    
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
          // this.songsList = this._pipe.transform(this.songsData,query);
        }
      )
    }

    // handleQuery(queryField:FormControl) {
    //   console.log(`Got quiery Field as ${queryField.value}`);
    //   this.fetchAllSongs(this.queryField.value);
      
    // }

    displayTitlefunction(song){
      return song?song.title:undefined;
    }

}
