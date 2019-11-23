import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewSongComponent } from './add-new-song/add-new-song.component';
import { CommonUtilsModule } from './../common-utils/common-utils.module';

@NgModule({
  declarations: [
    AddNewSongComponent
  ],
  imports: [
  
  CommonModule,
    CommonUtilsModule
  ],
  
})
export class SongsModule { }
