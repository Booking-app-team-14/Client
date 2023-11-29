import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordVisibility : boolean = true;
  passwordConfirmVisibility : boolean = true;
  passwordType : string = "password";
  passwordConfirmType : string = "password";


  username: string = '';

  constructor(private userService: UserService, private router: Router) {}

  loginUser(): void {
    let role = '';
    if (this.username.includes('host')) {
      role = 'host';
    } else if (this.username.includes('admin')) {
      role = 'admin';
    }
    else if (this.username.includes('guest')) {
      role = 'guest';
    }

    this.userService.setUserRole(role);

    // preusmeri na main
    this.router.navigate([`/`]);
  }

}
