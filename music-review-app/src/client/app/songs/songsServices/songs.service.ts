import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpHandler } from '@angular/common/http';
import { SongsModel } from './../songsModel';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  
  constructor(private http:HttpClient) { }
  searchTerm$ = new Subject<string>();
  
  observing = this.searchTerm$.asObservable();

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
  

  
  // search(query:Observable<string>) {
  //   return query.pipe(
  //     debounceTime(250),
  //     distinctUntilChanged(),
  //     switchMap(songTitle => this.fetchAllSongs(songTitle))
  //   );
  // }
  fetchAllSongs(query?:string):Observable<any>{
    console.log(`Executing service to fetch all songs`);
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let fetchAllSongsURI = `/secure/songs?searchQuery=${query}`;
    let options = {
      headers:httpHeaders
    };

    return this.http.get<any>(fetchAllSongsURI,options);
  }
  readonly filteredSongs$ = this.searchTerm$.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(songTitle => this.fetchAllSongs(songTitle))
  );
  searchSongs(songTitle:string) {
    if(songTitle!=="")
    this.searchTerm$.next(songTitle);
    else
    this.searchTerm$.next(null);
  }
  //service for hiding the song
  hideSongFromList(updateObject:object){
    //call backend REST API to handle the request.
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let updateSongAttributesURI = `/secure/songs`;
    let options = {
      headers:httpHeaders
    };

    //start from here
    return this.http.post<any>(updateSongAttributesURI,updateObject,options);    
  }
}

