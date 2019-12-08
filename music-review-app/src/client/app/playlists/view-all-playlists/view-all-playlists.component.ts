import { Component, OnInit } from '@angular/core';
import { PlaylistService } from './../playlistsServices/playlist.service';
import { PlaylistModel } from '../playlistModel';

@Component({
  selector: 'app-view-all-playlists',
  templateUrl: './view-all-playlists.component.html',
  styleUrls: ['./view-all-playlists.component.css']
})
export class ViewAllPlaylistsComponent implements OnInit {

  allPlaylists:PlaylistModel[];

  constructor(private _playlistService:PlaylistService) { }

  ngOnInit() {
    this.callServiceForFetchingAllPublicPlaylists();
  }

  callServiceForFetchingAllPublicPlaylists(){
    this._playlistService.fetchAllPublicPlaylist().subscribe(allPlaylists=>{
      this.allPlaylists = allPlaylists.playlists;
    });
  }
}
