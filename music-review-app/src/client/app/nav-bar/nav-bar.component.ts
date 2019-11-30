import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SongsService } from './../songs/songsServices/songs.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, public songs:SongsService) { }

  ngOnInit() {
  }

}