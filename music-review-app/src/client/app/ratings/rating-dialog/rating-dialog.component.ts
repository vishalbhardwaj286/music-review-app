import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormControl,Validators } from '@angular/forms';
import { RatingService } from './../ratingsServices/rating.service';
import { RatingsModel } from './../ratingsModel';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css']
})
export class RatingDialogComponent implements OnInit {
  currentRate : number;
  userComments : string;
  songID:string;
  ratingControl = new FormControl(null,Validators.required);
  newReview:Object;

  constructor(
    private dialogRef: MatDialogRef<RatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    ratingConfig:NgbRatingConfig,
    private _ratingService:RatingService
  ) {
    this.userComments = data.comments;
    this.songID = data.songID;
    ratingConfig.max = 5;
   }

  ngOnInit() {
    this.ratingControl.valueChanges.subscribe(value=>{
      this.currentRate = value;
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(`For song ${this.songID} Comments given are ${this.userComments} and rating of ${this.currentRate}
    is given`);
    let SongToReview : RatingsModel  = {
      
      reviewedSongID:this.songID,
      // createdByUser:this.auth.userProfileSubject$.value.email
      ratingsGivenByUser:{
        'rating':this.currentRate,
        'ratedByUser':'vishalbhardwaj630@gmail.com',
        'comments':this.userComments
      }
    };
    this.callServiceForSavingUserReviews(SongToReview);
    this.dialogRef.close();
  }

  callServiceForSavingUserReviews(SongToReview:RatingsModel) {
    this._ratingService.addReviewToSong(SongToReview).subscribe(result=>{
      this.newReview = result;
      
    });
  }
}
