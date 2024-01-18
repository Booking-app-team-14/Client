import { AfterViewChecked, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../login/user.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {

  constructor(private userService: UserService, private _router: Router, private http: HttpClient) {}

  @Input()
  user: {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string,
    avatarImageType: string,
    avatarBytes: string
  };

  signOut() {
    this.userService.logout();
    this._router.navigateByUrl("");
  }

  closeAccount() {
    if(!confirm("Are you sure you want to close your account?")) return;

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe({
      next: (userId: any) => {
        this.http.delete("http://localhost:8080/api/users/" + userId).subscribe({
          next: (r: any) => {
            alert("Account closed!");
            this.userService.logout();
            this._router.navigateByUrl("");
          },
          error: (err) => {
            if (err.error.message.split(", \"")[1][0] === "O") {
              alert("You have active requests! Account cannot be closed.");
            }
            else if (err.error.message.split(", \"")[1][0] === "G") {
              alert("You have active requests! Account cannot be closed.");
            } else {
              alert("Account closed!");
              this.userService.logout();
              this._router.navigateByUrl("");
            }
          }
        });
      }
    });
  }

}
