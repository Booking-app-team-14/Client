/*import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  passwordVisibility : boolean = true;
  passwordConfirmVisibility : boolean = true;
  passwordType : string = "password";
  passwordConfirmType : string = "password";

  constructor(private _router: Router, private http: HttpClient) { }

  register() {

    //TODO: Implement register functionality dependant on input fields

    const body = {
      "username": "admin@example.com",
      "password": "12345678",
      "firstName": "Adminko",
      "lastName": "Adminkovic",
      "address": "Adminska 2, Novi Sad",
      "phoneNumber": "+381012345678",
      "role": "ADMIN",
      "isBlocked": false,
      "numberOfReports": 0
    };

    this.http.post('http://localhost:8080/api/register/users?type=ADMIN', body).subscribe({
      error: (err) => {
        console.error(err);
        alert("Error while sending the POST request!");
      }
    });

    this._router.navigateByUrl("/login");

  }

}*/

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RegisterService} from "./register.service";

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

  // Ovde dodajte polja za čuvanje podataka iz forme, ako ih nemate
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  phoneNumber: string = '';
  role: string = 'GUEST';
  //passwordConfirmType: any;

  constructor(private _router: Router, private http: HttpClient, private registerService: RegisterService) {}

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
      isBlocked: false,  // Možete dodati i ova polja ako su potrebna
      numberOfReports: 0 // Možete dodati i ova polja ako su potrebna
    };

    this.registerService.registerUser(body, this.role).subscribe({
      next: (userId) => {
        console.log('User registered with ID:', userId);
        // Dodajte dalje radnje kao što su prikazivanje poruka o uspehu, redirekcija, itd.
        this._router.navigateByUrl('/login');
      },
      error: (err) => {
        console.error(err);
        alert('Error while sending the POST request!');
      }
    });
  }
}
