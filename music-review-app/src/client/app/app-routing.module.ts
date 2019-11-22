import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewSongComponent } from './songs/add-new-song/add-new-song.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
