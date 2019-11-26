import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewPlaylistComponent } from './create-new-playlist/create-new-playlist.component';
import { CommonUtilsModule } from './../common-utils/common-utils.module';


@NgModule({
  declarations: [CreateNewPlaylistComponent],
  imports: [
  CommonModule,
  CommonUtilsModule
  ]
})
export class PlaylistsModule { }
