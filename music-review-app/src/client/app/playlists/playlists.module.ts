import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewPlaylistComponent } from './create-new-playlist/create-new-playlist.component';
import { CommonUtilsModule } from './../common-utils/common-utils.module';
import { EditPlaylistComponent } from './edit-playlist/edit-playlist.component';
import {MatDialogModule} from "@angular/material";
import { EditPlaylistDialogComponent } from './edit-playlist-dialog/edit-playlist-dialog.component';
import { PipeModule } from './../pipe/pipe.module';

@NgModule({
  declarations: [CreateNewPlaylistComponent, EditPlaylistComponent, EditPlaylistDialogComponent],
  imports: [
  CommonModule,
  CommonUtilsModule,
  MatDialogModule,
  PipeModule
  ],
  entryComponents:[EditPlaylistDialogComponent]
})
export class PlaylistsModule { }
