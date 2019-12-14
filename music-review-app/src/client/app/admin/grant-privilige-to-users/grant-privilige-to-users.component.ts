import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AdminService } from './../adminServices/admin.service';

@Component({
  selector: 'app-grant-privilige-to-users',
  templateUrl: './grant-privilige-to-users.component.html',
  styleUrls: ['./grant-privilige-to-users.component.css']
})
export class GrantPriviligeToUsersComponent implements OnInit {
  loggedInUser:string
  userObject:object;
  selectedUsersToGrantAccess:string[];
  constructor(private _authService:AuthService,private _adminService:AdminService) { 
    
  }

  ngOnInit() {
    //Calling Service to fetch all users present in the system.
    this.callAdminServiceToFetchAllUsers(localStorage.getItem('loggedInUserName'));
  }

  callAdminServiceToFetchAllUsers(loggedInUser:string) {
    this._adminService.fetchAllUsers(loggedInUser).subscribe(results=>{
      this.userObject = results;
      console.log(`user object is ${this.userObject}`);
    });
  }

  handleClick(userID) {
    console.log(`Clicked`);
    this.selectedUsersToGrantAccess.push(userID);

  }

  //Handle Submit button when Admin wants to grant access to normal users for admin operations
  handleSubmitButtonClicked() {
    //Checking if user has selected any songs or randomly pressed submit
    if(this.selectedUsersToGrantAccess.length>0) {
      //Prepare JSON to submit the data

      //Call service to send the data to backend and update the database
    }
  }
}
