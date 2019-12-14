import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewSongComponent } from './songs/add-new-song/add-new-song.component';
import { CreateNewPlaylistComponent } from './playlists/create-new-playlist/create-new-playlist.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { AuthGuard } from './auth.guard';
import {HomeComponent} from '../app/home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EditPlaylistComponent } from './playlists/edit-playlist/edit-playlist.component';
import { ViewAllPlaylistsComponent } from './playlists/view-all-playlists/view-all-playlists.component';
import { GrantPriviligeToUsersComponent } from './admin/grant-privilige-to-users/grant-privilige-to-users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'addNewSong',
    component:AddNewSongComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'createPlaylist',
    component:CreateNewPlaylistComponent
  },
  {
    path:'aboutUs',
    component:AboutUsComponent
  },
  {
    path:'editPlaylist',
    component:EditPlaylistComponent
  },
  {
    path:'viewAllPlaylists',
    component:ViewAllPlaylistsComponent
  },
  {
    path:'grantPriviligeToUsersComponent',
    component:GrantPriviligeToUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
    
  ]
})
export class AppRoutingModule { }
