import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewSongComponent } from './songs/add-new-song/add-new-song.component';
import { CreateNewPlaylistComponent } from './playlists/create-new-playlist/create-new-playlist.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // }
  {
    path:'addNewSong',
    component:AddNewSongComponent
  },
  {
    path:'createPlaylist',
    component:CreateNewPlaylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


exports: [RouterModule]
})
export class AppRoutingModule { }
