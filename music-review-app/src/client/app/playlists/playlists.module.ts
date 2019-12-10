import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewPlaylistComponent } from './create-new-playlist/create-new-playlist.component';
import { CommonUtilsModule } from './../common-utils/common-utils.module';
import { EditPlaylistComponent } from './edit-playlist/edit-playlist.component';
import {MatDialogModule} from "@angular/material";
import { EditPlaylistDialogComponent } from './edit-playlist-dialog/edit-playlist-dialog.component';
import { PipeModule } from './../pipe/pipe.module';
import { ViewAllPlaylistsComponent } from './view-all-playlists/view-all-playlists.component';
import { PlaylistDialogComponentFromHomePageComponent } from './playlist-dialog-component-from-home-page/playlist-dialog-component-from-home-page.component';

@NgModule({
  declarations: [CreateNewPlaylistComponent, EditPlaylistComponent, EditPlaylistDialogComponent, ViewAllPlaylistsComponent, PlaylistDialogComponentFromHomePageComponent],
  imports: [
  CommonModule,
  CommonUtilsModule,
  MatDialogModule,
  PipeModule
  ],
  entryComponents:[EditPlaylistDialogComponent]
})
export class PlaylistsModule { }
