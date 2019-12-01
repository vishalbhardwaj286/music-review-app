import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpHandler } from '@angular/common/http';
import { PlaylistModel } from './../playlistModel';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http:HttpClient) { }

  createNewPlaylist(newPlaylist:PlaylistModel):Observable<PlaylistModel>{
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let uploadNewPlaylistURL = `/secure/playlist/${newPlaylist.playlistTitle}`;
    let options = {
      headers:httpHeaders
    };
    return this.http.put<PlaylistModel>(uploadNewPlaylistURL,JSON.stringify(newPlaylist),options);
  };
}
