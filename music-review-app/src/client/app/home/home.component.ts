import { Component, OnInit } from '@angular/core';
import { SongsService } from './../songs/songsServices/songs.service';
import { SongsModel } from './../songs/songsModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[SongsService],
})
export class HomeComponent implements OnInit {
  topTenSongs:SongsModel[];
  

  constructor(private _songsService:SongsService) { 
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

}
