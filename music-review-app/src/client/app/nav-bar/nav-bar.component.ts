import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from './../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdminLoggedIn:string
  constructor(public auth: AuthService,private _userService:UserService) { 
    this.auth.userProfile$.subscribe(result=>{
      if(result!==null) {
        this.getUserRoles(auth.userProfileSubject$.value.email);
      }
    });
  }

  ngOnInit() {
    this.isAdminLoggedIn = localStorage.getItem("isAdmin");
    console.log(`Logged in user is admin ${this.isAdminLoggedIn}`);
  }

  getUserRoles(email:string) {
    if(this.auth.loggedIn!=null) {
      this.isAdminLoggedIn = "false";
    this._userService.checkUserRoles(email).subscribe(result=>{
      if(result.Users.role === "site manager access") {
        this.isAdminLoggedIn = "true";
        localStorage.setItem('isAdmin',this.isAdminLoggedIn); 
      }
      else {
        localStorage.setItem('isAdmin',this.isAdminLoggedIn);  
      }
      localStorage.setItem('loggedInUserName',this.auth.userProfileSubject$.value.email);  

    });
    
    }
  }
}

