import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from './../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
/*
  This class is responsible for managing the functions related to the 
  navigation bar displaying all components present in the application
*/
export class NavbarComponent implements OnInit {
  isAdminLoggedIn:string
  loggedInPersonEmail:string = null;

  constructor(public auth: AuthService,private _userService:UserService) { 
    this.auth.userProfile$.subscribe(result=>{
      if(result!==null) {
        this.loggedInPersonEmail = auth.userProfileSubject$.value.email;
        let data = this.loggedInPersonEmail.split('@') ;
        this.loggedInPersonEmail = data[0];
        this.getUserRoles(auth.userProfileSubject$.value.email);
      }
    });
  }

  ngOnInit() {
    this.isAdminLoggedIn = localStorage.getItem("isAdmin");
    console.log(`Logged in user is admin ${this.isAdminLoggedIn}`);
  }

  /*
    Function to get logged in user roles 
  */
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

