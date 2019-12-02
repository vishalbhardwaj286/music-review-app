import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlistsServices/playlist.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {
  playlistsData:object[];
  constructor(public auth: AuthService,private _playlistService:PlaylistService) { }

  ngOnInit() {
    this.getAllPlaylists();
  }
  
  getAllPlaylists(){
    let userEmail = this.auth.userProfileSubject$.value.email;
    this._playlistService.fetchExistingPlaylist(userEmail).subscribe(
      playlists=>{
        this.playlistsData = playlists.results;
        // console.log(`Songs Data is ${this.songsData}`);
        // this.songsList = songs.songs;
      }
    )
  }

}
