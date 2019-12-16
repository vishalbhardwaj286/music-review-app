/*
  The main module of the application which contains all the necessary modules and 
  component required by the application
*/

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
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component'; 
import { SongsService } from './songs/songsServices/songs.service';
import { AboutUsComponent } from './about-us/about-us.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonUtilsModule } from './common-utils/common-utils.module';
import { PipeModule } from './pipe/pipe.module';
import { SearchHomePageComponent } from './search-home-page/search-home-page.component';
import { AddSongToPlaylistDialogComponent } from './search-home-page/add-song-to-playlist-dialog/add-song-to-playlist-dialog.component';
import { RatingsModule } from './ratings/ratings.module';
import { RatingDialogComponent } from './ratings/rating-dialog/rating-dialog.component';
import { PlaylistDialogComponentFromHomePageComponent } from './playlists/playlist-dialog-component-from-home-page/playlist-dialog-component-from-home-page.component';
import { AdminModule } from './admin/admin.module';
import { ViewHiddenSongsDialogComponent } from './songs/view-hidden-songs-dialog/view-hidden-songs-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutUsComponent,
    SearchHomePageComponent,
    AddSongToPlaylistDialogComponent
  ],
  imports: [
  
BrowserModule,
  AppRoutingModule,
  NgbModule,
  SongsModule,
  MatButtonModule,
  PlaylistsModule, 
  BrowserAnimationsModule,
  HttpClientModule,
  MatExpansionModule,
  CommonUtilsModule,
  PipeModule,
  RatingsModule,
  AdminModule
  ],
  exports:[
    CommonUtilsModule,
    PipeModule
  ],
  entryComponents:[AddSongToPlaylistDialogComponent,RatingDialogComponent,PlaylistDialogComponentFromHomePageComponent,ViewHiddenSongsDialogComponent],
  providers: [SongsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
