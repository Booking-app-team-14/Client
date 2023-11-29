import { Component } from '@angular/core';
//import { userRole } from '../../app.component';
import {UserService} from "../../login/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userRole: string = '';

  user: {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string,
    avatarPath: string
  } = { // get logged user from service
    firstName: 'Sava',
    lastName: 'Savić',
    email: 'test@example.com',
    address: '1234 Main St, Anytown, USA',
    phone: '+381 66 0123456',
    avatarPath: 'assets/user-avatar.png'
  };
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

}
