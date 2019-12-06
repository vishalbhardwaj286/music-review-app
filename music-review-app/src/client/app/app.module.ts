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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutUsComponent
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
  MatExpansionModule
  ],
  providers: [SongsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
