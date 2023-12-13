import { HttpClient } from '@angular/common/http';
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
    
    // TODO: Implement register functionality dependant on input fields

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

}
