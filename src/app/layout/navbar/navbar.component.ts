import { Component } from '@angular/core';
//import { userRole } from '../../app.component';
import {UserService} from "../../login/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  //userRole: string = userRole;
  userRole: string = '';

  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.userService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }


}
