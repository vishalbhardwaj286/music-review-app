import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewPlaylistComponent } from './create-new-playlist/create-new-playlist.component';
import { CommonUtilsModule } from './../common-utils/common-utils.module';
import { EditPlaylistComponent } from './edit-playlist/edit-playlist.component';


@NgModule({
  declarations: [CreateNewPlaylistComponent, EditPlaylistComponent],
  imports: [
  CommonModule,
  CommonUtilsModule
  ]
})
export class PlaylistsModule { }
