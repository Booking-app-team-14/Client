import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('passwordElement') passwordElement: ElementRef;

  password: string = '';

  passwordChangeEvent(){
    this.password = this.passwordElement.nativeElement.value;
  }

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
      "username": this.username,
      "password": this.password
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

    if (this.username.includes('owner')) {
      this.userService.setUserRole("host");
    } else if (this.username.includes('admin')) {
      this.userService.setUserRole("admin");
    } else if (this.username.includes('guest')) {
      this.userService.setUserRole("guest");
    }

    this.router.navigate([`/`]);
  }

}
