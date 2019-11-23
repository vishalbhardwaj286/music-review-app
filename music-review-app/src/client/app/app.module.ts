import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SongsModule} from './songs/songs.module';
import {MatButtonModule} from '@angular/material/button';
import { PlaylistsModule } from './playlists/playlists.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
    
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  NgbModule,
  SongsModule,
  MatButtonModule,
  PlaylistsModule, 
  BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
