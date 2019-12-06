import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchMusicWithinPlaylistPipe } from './search-music-within-playlist.pipe';



@NgModule({
  declarations: [SearchMusicWithinPlaylistPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SearchMusicWithinPlaylistPipe
  ],
  providers:[
    SearchMusicWithinPlaylistPipe
  ]
})
export class PipeModule { }
