import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterService} from "./register.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  passwordVisibility: boolean = true;
  passwordType: string = 'password';
  passwordConfirmType : string = "password";
  passwordConfirmVisibility : boolean = true;

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  phoneNumber: string = '';
  role: string = 'GUEST';
  //passwordConfirmType: any;

  constructor(private _router: Router, private http: HttpClient, private registerService: RegisterService, private snackBar: MatSnackBar ) {}

  register() {
    const body = {
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      phoneNumber: this.phoneNumber,
      role: this.role,
      isBlocked: false,
      numberOfReports: 0
    };

    this.registerService.registerUser(body, this.role).subscribe({
      next: (userId) => {
        console.log('User registered with ID:', userId);

        alert('Registration successful! Please check your email for the activation link.')

        this._router.navigateByUrl('/login');
      },
      error: (err) => {
        console.error(err);
        alert('Error while sending the POST request!');
      }
    });
  }
}
