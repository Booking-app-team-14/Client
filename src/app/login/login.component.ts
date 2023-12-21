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

    const body = {
      "username": this.username,
      "password": this.password
    };

    this.http.post('http://localhost:8080/api/login', body, { responseType: 'text' }).subscribe({
      next: (jwt: any) => {
        localStorage.setItem('currentUser', JSON.stringify({ token: jwt }));

        this.http.get(`http://localhost:8080/api/users/byUsername/${this.username}`).subscribe({
          next: (userData: any) => {
            if (userData && userData.role) {
              if (userData.role === "GUEST") {
                this.userService.setUserRole("guest");
              } else if (userData.role === "OWNER") {
                this.userService.setUserRole("host");
              } else if (userData.role === "ADMIN") {
                this.userService.setUserRole("admin");
              } else {
                this.userService.setUserRole("guest");
              }
            } else {
              this.userService.setUserRole("guest");
            }
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error(err);
            alert("Error while fetching user data!");
          }
        });


        alert("Login successful! Redirecting to the homepage...");
        this.router.navigate([`/`]);
      },
      error: (err) => {
        console.error(err);
        alert("Error while sending the POST request!");
      }
    });

  }



}
