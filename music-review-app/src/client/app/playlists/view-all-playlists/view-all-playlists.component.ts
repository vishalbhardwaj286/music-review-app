import { Component, OnInit } from '@angular/core';
import { PlaylistService } from './../playlistsServices/playlist.service';
import { PlaylistModel } from '../playlistModel';

@Component({
  selector: 'app-view-all-playlists',
  templateUrl: './view-all-playlists.component.html',
  styleUrls: ['./view-all-playlists.component.css']
})
/*
  Below Component is rendered for both the guest user and the logged in users including Admins
  The main functionlity of this component is to display all the public playlists to the landing users
*/
export class ViewAllPlaylistsComponent implements OnInit {

  allPlaylists:PlaylistModel[];

  /*
    Playlist service is injected in the constructor which is later
    required for calling all the methods of Playlists
  */

  constructor(private _playlistService:PlaylistService) { }

  ngOnInit() {
    this.callServiceForFetchingAllPublicPlaylists();
  }

  /*
    This method calls the fetchAllPublicPlaylist method of the service 
    to retrieve list of all the playlists whose visibility is set to 
    public by its creators. 
  */
  callServiceForFetchingAllPublicPlaylists(){
    this._playlistService.fetchAllPublicPlaylist().subscribe(allPlaylists=>{
      this.allPlaylists = allPlaylists.playlists;
    });
  }
}
