import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdminLoggedIn:string
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.isAdminLoggedIn = localStorage.getItem("isAdmin");
    console.log(`Logged in user is admin ${this.isAdminLoggedIn}`);
  }

}