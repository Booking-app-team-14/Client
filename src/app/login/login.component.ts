import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {}

  loginUser(): void {

    // TODO: Implement login functionality dependant on input fields

    // let role = '';
    // if (this.username.includes('host')) {
    //   role = 'host';
    // } else if (this.username.includes('admin')) {
    //   role = 'admin';
    // }
    // else if (this.username.includes('guest')) {
    //   role = 'guest';
    // }

    // this.userService.setUserRole(role);

    const body = {
      "username": "admin@example.com",
      "password": "12345678"
    };

    this.http.post('http://localhost:8080/api/login', body, { responseType: 'text' }).subscribe({
      next: (jwt: any) => {
        localStorage.setItem('currentUser', JSON.stringify({ token: jwt }));
      },
      error: (err) => {
        console.error(err);
        alert("Error while sending the POST request!");
      }
    });

    this.userService.setUserRole("admin");

    this.router.navigate([`/`]);
  }

}
