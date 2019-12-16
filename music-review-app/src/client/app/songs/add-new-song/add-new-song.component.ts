import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SongsService } from './../songsServices/songs.service';
import { Observable } from 'rxjs';
import { SongsModel } from './../songsModel';
import { RatingService } from './../../ratings/ratingsServices/rating.service';
import { RatingsModel } from './../../ratings/ratingsModel';


@Component({
  selector: 'app-add-new-song',
  templateUrl: './add-new-song.component.html',
  styleUrls: ['./add-new-song.component.css'],
  providers:[SongsService]
})
/*
    AddNewSongComponent is used to add new song to the Application by the Users/Admin
*/
export class AddNewSongComponent implements OnInit {
  uploadNewSongForm: FormGroup;
  songUploaded = false;
  titleController = new FormControl();
  artistController = new FormControl();
  albumController = new FormControl();
  genreController = new FormControl();
  songsData:Observable<SongsModel>[];
  profile:string;

/*
  Injecting all the required services such as AuthService to handle Authentication and checking if the user if logged in or not.
  Rating service for updating the provded rating of the particular song
*/
  constructor(public auth: AuthService,private formBuilder: FormBuilder,private _songsService:SongsService,private _ratingService:RatingService) { 
    console.log(`logged in User Details are ${auth.userProfileSubject$.value.email}`);
    
  }

  ngOnInit() {
      this.uploadNewSongForm = this.formBuilder.group({
      hideRequired: false,
      floatLabel: 'auto',
      titleOfSong:['',[Validators.required]],
      artistOfSong:['',[Validators.required]],
      songAlbum:[],
      genreOfSong:['',Validators.required],
      releaseYearOfSong:[],
      reviews:[],
      userEmail:[]
    });

  }

/*
  OnFormSubmit is called when the user clicks on the template form and press submit to add new song to the application	
*/
  onFormSubmit(form:any) {
    let ItemToAdd  = {
      title:form.titleOfSong,
      artist:form.artistOfSong,
      album:form.songAlbum,
      genre:form.genreOfSong,
      year:form.releaseYearOfSong,
      reviews:form.reviews,
      addedByUser:this.auth.userProfileSubject$.value.email
    };
    this.callServiceForUploadingNewSong(ItemToAdd);
    this.uploadNewSongForm.reset();
  }
/*
  This method takes one Song Object and passes it further to the songs service class to 
  call uploadNewSong() method with parameter of the song object
  Once the call back comes, it calls the rating service method to update the ratings (user comments)
  in the Rating Database and render on the home page component.	
*/
  callServiceForUploadingNewSong(newSong:any){
    this._songsService.uploadNewSong(newSong).subscribe(
      newSong=>{
        this.songUploaded = true;
        
          this.callServiceToUpdateReviews(newSong);
        
        
      }
    )
  }
/*
  Service to Update Reviews in the Rating Database  	
*/
  callServiceToUpdateReviews(song:any) {
    let SongToReview : RatingsModel  = {
      
      reviewedSongID:song.newSong[0]._id,
      ratingsGivenByUser:{
        'rating':5,
        'ratedByUser':this.auth.userProfileSubject$.value.email,
        'comments':song.newSong[0].reviews
      }
    };
  this._ratingService.addReviewToSong(SongToReview).subscribe(result=>{
    console.log(`Reviews saved successfully ${result}`);
  })
  }

  getTitleErrorMessage(){
    if(this.titleController.hasError('required')) {
      return this.titleController.hasError('required') ? 'You must specify the title of the song' : undefined    
    }
  }
    getArtistErrorMessage(){
    if(this.artistController.hasError('required')) {
      return this.artistController.hasError('required') ? 'You must specify the artist of the song' : undefined    
    }
  }
    getGenreErrorMessage(){ 
     if(this.genreController.hasError('required')) {
      return this.genreController.hasError('required') ? 'You must specify the genre of the song' : undefined    
    }
  }
    getAlbumErrorMessage(){
      if(this.albumController.hasError('required')) {
      return this.albumController.hasError('required') ? 'You must specify the album of the song' : undefined    
    }
  }

}
