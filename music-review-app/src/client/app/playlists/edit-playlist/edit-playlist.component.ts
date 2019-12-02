import { Component, OnInit, Inject } from '@angular/core';
import { PlaylistService } from '../playlistsServices/playlist.service';
import { AuthService } from '../../services/auth.service';
import { PlaylistModel } from './../playlistModel';


@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {
  playlistsData:PlaylistModel[];
  playlistEdited:boolean;
  constructor(public auth: AuthService,private _playlistService:PlaylistService) { }

  ngOnInit() {
    this.getAllPlaylists();
  }
  
  getAllPlaylists(){
    let userEmail = this.auth.userProfileSubject$.value.email;

    this._playlistService.fetchExistingPlaylist(userEmail).subscribe(
      results=>{
        this.playlistsData = results.playlists;
      }
    )
  }

  deleteSongFromPlaylist(songID:string,playlistID:string){
    console.log(`Deleting song ${songID} from Playlist ${playlistID}`);
    
    let SongToDeleteInPlaylist : PlaylistModel  = {
      
      playlistID:playlistID,
      songsInPlaylist:songID,
      // createdByUser:this.auth.userProfileSubject$.value.email
      createdByUser:'vishal b.'
    };
    this.callPlaylistServiceForDeletingSongFromPlaylist(SongToDeleteInPlaylist);
  }
  
  callPlaylistServiceForDeletingSongFromPlaylist(SongToDeleteInPlaylist){
    this._playlistService.removeSongFromPlaylist(SongToDeleteInPlaylist).subscribe(
      result=>{
        this.playlistEdited = true;
      }
    )
  }
  
}
