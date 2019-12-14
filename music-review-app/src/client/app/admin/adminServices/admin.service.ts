import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpHandler } from '@angular/common/http';
import { UserModel } from './../UserModel';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  fetchAllUsers(loggedInUser:string) :Observable<object> {
    //Calling backend REST API to fetch all users in the system
    console.log(`Executing service for fetching existing playlists of user`);
    let httpHeaders = new HttpHeaders().set('Content-Type','application/Json');
    let fetchAllUsersURI = `/secure/users`;
    let options = {
      headers:httpHeaders
    };

    return this.http.get<any>(fetchAllUsersURI,options);
  }

}

