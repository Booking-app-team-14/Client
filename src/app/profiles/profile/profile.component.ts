import { Component } from '@angular/core';
//import { userRole } from '../../app.component';
import {UserService} from "../../user-credentials/login/user.service";
import { HttpClient } from '@angular/common/http';

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
    avatarImageType: string,
    avatarBytes: string
  } = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    avatarImageType: '',
    avatarBytes: ''
  };

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.userService.userRole$.subscribe(role => {
      this.userRole = role;
    });

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe({
      next: (userId: any) => {
        this.http.get(`http://localhost:8080/api/users/${userId}`).subscribe({
          next: (userDTO: any) => {
            this.user.firstName = userDTO.firstName;
            this.user.lastName = userDTO.lastName;
            this.user.email = userDTO.username;
            this.user.address = userDTO.address;
            this.user.phone = userDTO.phoneNumber;
            this.user.avatarImageType = userDTO.profilePictureType;
            this.user.avatarBytes = userDTO.profilePictureBytes;
          },
          error: (err) => {
            console.error(err);
            alert("Error while fetching user data!");
          }
        });
      },
      error: (err) => {
        console.error(err);
        alert("Error while fetching user data from token!");
      }
    });

  }

}
