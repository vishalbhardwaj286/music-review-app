import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpHandler } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  checkUserRoles(loggedInUser:string){
    console.log(`Executing service for fetching existing playlists of user`);
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let fetchUserRolesURI = `/secure/users?user=${loggedInUser}`;
    let options = {
      headers:httpHeaders
    };
    return this.http.get<any>(fetchUserRolesURI);
  }
}
