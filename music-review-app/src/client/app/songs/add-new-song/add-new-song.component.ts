import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SongsService } from './../songsServices/songs.service';
import { Observable } from 'rxjs';
import { SongsModel } from './../songsModel';


@Component({
  selector: 'app-add-new-song',
  templateUrl: './add-new-song.component.html',
  styleUrls: ['./add-new-song.component.css'],
  providers:[SongsService],
  
})
export class AddNewSongComponent implements OnInit {
  uploadNewSongForm: FormGroup;
  songUploaded = false;

  songsData:Observable<SongsModel>[];
  profile:string;

  constructor(public auth: AuthService,private formBuilder: FormBuilder,private _songsService:SongsService) { 
    console.log(`logged in User Details are ${auth.userProfileSubject$.value.email}`);
    
  }

  ngOnInit() {
      this.uploadNewSongForm = this.formBuilder.group({
      hideRequired: false,
      floatLabel: 'auto',
      titleOfSong:['',[Validators.required]],
      artistOfSong:['',[Validators.required]],
      songAlbum:[],
      genreOfSong:[],
      releaseYearOfSong:[],
      reviews:[],
      userEmail:[]
    });

  }

  onFormSubmit(form:any) {
    let ItemToAdd : SongsModel  = {
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

  callServiceForUploadingNewSong(newSong:SongsModel){
    this._songsService.uploadNewSong(newSong).subscribe(
      newSong=>{
        this.songUploaded = true;
      }
    )
  }
 
}
