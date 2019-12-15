import { Component, OnInit, Inject } from '@angular/core';
import { PlaylistService } from '../playlistsServices/playlist.service';
import { AuthService } from '../../services/auth.service';
import { PlaylistModel } from './../playlistModel';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { EditPlaylistDialogComponent } from './../edit-playlist-dialog/edit-playlist-dialog.component';


@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {
  playlistsData:PlaylistModel[];
  playlistEdited:boolean;
  constructor(public auth: AuthService,private _playlistService:PlaylistService,private dialog: MatDialog) { }

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

  // editPlaylist(playlistID:string){
  //   console.log(`Editing Playlist`);
  //   //show popup.
  // }

  openDialog(playlistID:string,playlistTitle:string,playlistDescription:string,playListVisibilityScope:string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = "300px";
    dialogConfig.minWidth = "650px";
    dialogConfig.data = {
      id: playlistID,
      playlistTitle:playlistTitle,
      playlistDescription:playlistDescription,
      playListVisibilityScope:playListVisibilityScope
  };
  const dialogRef = this.dialog.open(EditPlaylistDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => {console.log("Dialog output:", data)
          if(data) {
            this.getAllPlaylists();
          }
        });    
  }

  deleteSongFromPlaylist(songID:string,playlistID:string){
    console.log(`Deleting song ${songID} from Playlist ${playlistID}`);
    
    let SongToDeleteInPlaylist : PlaylistModel  = {
      
      playlistID:playlistID,
      songsInPlaylist:songID,
      createdByUser:this.auth.userProfileSubject$.value.email
      
    };
    this.callPlaylistServiceForDeletingSongFromPlaylist(SongToDeleteInPlaylist);
  }
  
  callPlaylistServiceForDeletingSongFromPlaylist(SongToDeleteInPlaylist){
    this._playlistService.removeSongFromPlaylist(SongToDeleteInPlaylist).subscribe(
      result=>{
        this.playlistEdited = true;
        this.getAllPlaylists();
      }
    )
  }
  
}
