import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpHandler } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
/*
  User Service contaning only the services related to the User Related Activities
*/
export class UserService {

  constructor(private http:HttpClient) { }

  /*
    This function takes one parameter LoggedInUser details as a string 
    and passes it to the Backend to fetch the role of the particular
    user
  */
  checkUserRoles(loggedInUser:string){
    console.log(`Executing service for fetching existing playlists of user`);
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let fetchUserRolesURI = `/secure/users?user=${loggedInUser}`;
    let options = {
      headers:httpHeaders
    };
    return this.http.get<any>(fetchUserRolesURI,options);
  }
}
