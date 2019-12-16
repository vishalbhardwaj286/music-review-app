import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewSongComponent } from './add-new-song/add-new-song.component';
import { CommonUtilsModule } from './../common-utils/common-utils.module';
import { ViewHiddenSongsDialogComponent } from './view-hidden-songs-dialog/view-hidden-songs-dialog.component';
/*
  Model specific to the Songs features containing only Songs Components and
  Importing CommonUtilsModule
*/
@NgModule({
  declarations: [
    AddNewSongComponent,
    ViewHiddenSongsDialogComponent
  ],
  imports: [
  
  CommonModule,
    CommonUtilsModule
  ],
  
})
export class SongsModule { }
