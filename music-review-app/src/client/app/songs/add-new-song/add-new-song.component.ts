import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-add-new-song',
  templateUrl: './add-new-song.component.html',
  styleUrls: ['./add-new-song.component.css']
})
export class AddNewSongComponent implements OnInit {
  options: FormGroup;
  titleOfSong:string="";
  artistOfSong:string="";
  songAlbum:string="";
  genreOfSong:string="";
  releaseYearOfSong:string="";
  reviews:string="";
  
  constructor(public auth: AuthService,fb: FormBuilder) { 
      this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
  }

  uploadNewSong(form:any){
    this.titleOfSong = form.titleOfSong;
    console.log(`title of the song is ${this.titleOfSong}`);
  }
}
