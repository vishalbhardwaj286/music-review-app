import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpHandler } from '@angular/common/http';
import { SongsModel } from './../songsModel';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/*
  Songs Service calls the backend music routes to fetch the User Requested URI
*/
export class SongsService {
  
  constructor(private http:HttpClient) { }
  searchTerm$ = new Subject<string>();
  
  observing = this.searchTerm$.asObservable();

  /*
    UploadNewSong takes one arguement of the Songs Model and create new song by calling the specific 
    URI and return the SongsModel Object to the caller method 
  */
  uploadNewSong(newSong:SongsModel):Observable<SongsModel>{
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let uploadNewSongURL = `/secure/song/${newSong.title}`;
    let options = {
      headers:httpHeaders
    };
    return this.http.put<SongsModel>(uploadNewSongURL,newSong,options);
  };

  /*
    FetchTopTenSongs() takes no arguement and returns the top ten songs sorted according to 
    the number of reviews 	
  */
  fetchTop10Songs():Observable<any>{
    console.log(`Calling service inside service`);
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let fetchtop10SongsURL = `/public/fetchTopTenSongs/`;
    let options = {
      headers:httpHeaders
    };

    return this.http.get<any>(fetchtop10SongsURL);
  };
  
/*
  Fetch All song takes one query parameter and performs operation based on the 
  value of query parameter
*/
  fetchAllSongs(query?:string):Observable<any>{
    console.log(`Executing service to fetch all songs`);
    let showAllHiddenSongsQuery = (query === 'showAllHiddenSongsQuery'?'showAllHiddenSongsQuery':undefined);
    let searchQuery = (query !== undefined?query:undefined);
    let fetchAllSongsURI =`/secure/songs`;
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    if(showAllHiddenSongsQuery !==undefined){
      fetchAllSongsURI = `/secure/songs?showAllHiddenSongsQuery=${showAllHiddenSongsQuery}`;
    }
    else if(searchQuery !== undefined){
      fetchAllSongsURI = `/public/songs?searchQuery=${searchQuery}`;
    }
    
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

    //Calling Backend to hide song
    return this.http.post<any>(updateSongAttributesURI,updateObject,options);    
  }
  unhideSongFromList(updateObject:object) {
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let updateVisibilityofSongURI = `/secure/songs`;
    let options = {
      headers:httpHeaders
    };

    //Calling Backend to unhide songs
    return this.http.patch<any>(updateVisibilityofSongURI,updateObject,options);  
  }
  
}

