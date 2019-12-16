import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AdminService } from './../adminServices/admin.service';

@Component({
  selector: 'app-grant-privilige-to-users',
  templateUrl: './grant-privilige-to-users.component.html',
  styleUrls: ['./grant-privilige-to-users.component.css']
})
/*
This class is specific to admin handler that is used specifically by admin to perform admin related operations
*/
export class GrantPriviligeToUsersComponent implements OnInit {
  loggedInUser:string
  userObject:object;
  selectedUsersToGrantAccess:object[]=[];
  itemToChange:Object;
  constructor(private _authService:AuthService,private _adminService:AdminService) { 
    
  }

  //Calling Class function to fetch all users on the Initialization of component itself
  ngOnInit() {
    //Calling Service to fetch all users present in the system.
    this.loggedInUser = localStorage.getItem('loggedInUserName');
    this.callAdminServiceToFetchAllUsers(this.loggedInUser);
  }

  //Calling Admin service to fetch all users on the Initialization of component itself
  callAdminServiceToFetchAllUsers(loggedInUser:string) {
    this._adminService.fetchAllUsers(loggedInUser).subscribe(results=>{
      this.userObject = results;
      console.log(`user object is ${this.userObject}`);
    });
  }

  //This function maintains the selected users list to grant access to 
  handleClick(userID) {
    console.log(`Clicked`);
    this.selectedUsersToGrantAccess.push(userID);

  }

  //Handle Submit button when Admin wants to grant access to normal users for admin operations
  handleGrantAccessClicked() {
    //Checking if user has selected any songs or randomly pressed submit
    if(this.selectedUsersToGrantAccess.length>0) {
      //Prepare JSON to submit the data
      console.log(`number of users selected ${this.selectedUsersToGrantAccess.length}`)
      let selectedUsersJSON = [];
      
      
      for(let i=0;i<this.selectedUsersToGrantAccess.length;i++) {
      selectedUsersJSON.push(
      {
        'id':this.selectedUsersToGrantAccess[i],
        'newRole':"site manager access"
      },
      );
      }
      
      this.itemToChange = {
        selectedUsersJSON
      }
      //Call service to send the data to backend and update the database
      this._adminService.adminUpdateUserRoles(this.itemToChange).subscribe(result=>{
        console.log(`status got is ${result.status}`);
        this.callAdminServiceToFetchAllUsers(this.loggedInUser);
      });
    }
  }
}
