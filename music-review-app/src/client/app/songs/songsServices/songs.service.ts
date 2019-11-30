import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpHandler } from '@angular/common/http';
import { SongsModel } from './../songsModel';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  
  constructor(private http:HttpClient) { }

  uploadNewSong(newSong:SongsModel):Observable<SongsModel>{
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let uploadNewSongURL = `/secure/song/${newSong.title}`;
    let options = {
      headers:httpHeaders
    };
    return this.http.put<SongsModel>(uploadNewSongURL,newSong,options);
  };

  fetchTop10Songs():Observable<any>{
    console.log(`Calling service inside service`);
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let fetchtop10SongsURL = `/public/fetchTopTenSongs/`;
    let options = {
      headers:httpHeaders
    };

    return this.http.get<any>(fetchtop10SongsURL);
  };

}
