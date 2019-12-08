import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpHandler } from '@angular/common/http';
import { RatingsModel } from '../ratingsModel';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http:HttpClient) { }

  addReviewToSong(newReview:RatingsModel):Observable<RatingsModel>{
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let uploadNewPlaylistURL = `/secure/reviews/${newReview.reviewedSongID}`;
    let options = {
      headers:httpHeaders
    };
    return this.http.post<RatingsModel>(uploadNewPlaylistURL,newReview,options);
  };

}
