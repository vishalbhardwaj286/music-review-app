import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpHandler } from '@angular/common/http';
import { PlaylistModel } from './../playlistModel';

@Injectable({
  providedIn: 'root'
})
/*
  Playlist service class acts as an interface between Front End (Angular) and Backend (Node JS)
  This class contains several methods to call while handling all the functions related to the handling of Playlist
*/
export class PlaylistService {

  constructor(private http:HttpClient) { }
  /*
  This method calls the below mentioned URI to create a new playlist specified by the user
  */
  createNewPlaylist(newPlaylist:PlaylistModel):Observable<PlaylistModel>{
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let uploadNewPlaylistURL = `/secure/playlist/${newPlaylist.playlistTitle}`;
    let options = {
      headers:httpHeaders
    };
    return this.http.put<PlaylistModel>(uploadNewPlaylistURL,newPlaylist,options);
  };

  /*
  This function calls the backend to fetch all the existing playlist of the Logged In user and return it to the 
  class calling this service
  */
  fetchExistingPlaylist(loggedInUser:String):Observable<any>{
    console.log(`Executing service for fetching existing playlists of user`);
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let fetchExistingPlaylistURI = `/secure/playlists/${loggedInUser}`;
    let options = {
      headers:httpHeaders
    };

    return this.http.get<any>(fetchExistingPlaylistURI);
  };

  /*
  This method takes one arguement of Playlist Model while performing remove Songs from Playlist 
  Operation and returns the PlayList Model object to the caller method
  */
  removeSongFromPlaylist(SongToDeleteInPlaylist:PlaylistModel):Observable<PlaylistModel>{
    console.log(`Executing service for removing existing song from playlist`);
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let fetchExistingPlaylistURI = `/secure/playlist/songs/${SongToDeleteInPlaylist.playlistID}`;
    let options = {
      headers:httpHeaders
    };

    return this.http.post<PlaylistModel>(fetchExistingPlaylistURI,SongToDeleteInPlaylist,options);
  };

  /*
  This service takes no arguement and retrieve all the public playlists and returns them back to 
  the caller function
  */
  fetchAllPublicPlaylist():Observable<any>{
    console.log(`Executing service for fetching existing playlists of user`);
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let fetchExistingPlaylistURI = `/public/fetchAllPublicPlaylists`;
    let options = {
      headers:httpHeaders
    };
    return this.http.get<any>(fetchExistingPlaylistURI,options);
  };
  
  /*
  Below method takes Playlist object and Playlist ID as an arguement and
  perform user specified update operation on the Playlist ID and returns the updated object to the
  caller method
  */
  updateExistingPlaylist(updatedPlaylist:Object,playlistID:string):Observable<any>{
    console.log(`Executing service for fetching existing playlists of user`);
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let fetchExistingPlaylistURI = `/secure/playlist/${playlistID}`;
    let options = {
      headers:httpHeaders
    };
    return this.http.post<any>(fetchExistingPlaylistURI,updatedPlaylist,options);
  };
}
