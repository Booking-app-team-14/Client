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


    const body = {
      "username": this.username,
      "password": this.password
    };

    this.http.post('http://localhost:8080/api/login', body, { responseType: 'text' }).subscribe({
      next: (jwt: any) => {
        localStorage.setItem('currentUser', JSON.stringify({ token: jwt }));

        // Ispravite putanju endpoint-a za dohvat korisničkih podataka
        this.http.get(`http://localhost:8080/api/users/byUsername/${this.username}`).subscribe({
          next: (userData: any) => {
            // Provera da li postoji podatak o roli
            if (userData && userData.role) {
              // Postavljanje uloge korisnika
              if (userData.role === "GUEST") {
                this.userService.setUserRole("guest");
              } else if (userData.role === "OWNER") {
                this.userService.setUserRole("host");
              } else if (userData.role === "ADMIN") {
                this.userService.setUserRole("admin");
              } else {
                // U slučaju nepoznate uloge, postavite podrazumevanu vrednost
                this.userService.setUserRole("guest");
              }
            } else {
              // Ako nema podataka o roli, postavite podrazumevanu vrednost
              this.userService.setUserRole("guest");
            }

            // Redirekcija na početnu stranicu nakon uspešnog logovanja
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error(err);
            alert("Error while fetching user data!");
          }
        });

        // Obaveštenje o uspešnom logovanju
        alert("Login successful! Redirecting to the homepage...");
      },
      error: (err) => {
        console.error(err);
        alert("Error while sending the POST request!");
      }
    });




    /*if (this.username.includes('owner')) {
      this.userService.setUserRole("host");
    } else if (this.username.includes('admin')) {
      this.userService.setUserRole("admin");
    } else if (this.username.includes('guest')) {
      this.userService.setUserRole("guest");
    }*/


    /*this.http.get(`http://localhost:8080/api//users/byUsername/${this.username}`).subscribe({
      next: (userData: any) => {

        if (userData.role=="GUEST") {
          this.userService.setUserRole("guest")
        } else if (userData.role=="OWNER") {
          this.userService.setUserRole("host")}
        else if (userData.role=="ADMIN") {
            this.userService.setUserRole("admin");
        }

        this.router.navigate([`/`]);
      },
      error: (err) => {
        console.error(err);
        alert("Error while fetching user data!");
      }
    });*/

    this.router.navigate([`/`]);
  }



}
