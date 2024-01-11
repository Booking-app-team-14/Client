import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css'
})
export class UpdateAccountComponent {

  constructor(private _router: Router, private http: HttpClient) { }

  passwordVisibility : boolean = true;
  passwordConfirmVisibility : boolean = true;
  passwordType : string = "password";
  passwordConfirmType : string = "password";

  user: {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    role: string,
    isBlocked: false,
    numberOfReports: 0
  } = {
    username: '',
    password: null,
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    role: '',
    isBlocked: false,
    numberOfReports: 0
  };

  updatedUser: {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    role: string,
    isBlocked: false,
    numberOfReports: 0
  };

  avatarBytes: string;
  avatarImageType: string;

  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  address: string;

  userId: number;
  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe({
          next: (userId: any) => {
            this.userId = userId;
            this.http.get(`http://localhost:8080/api/users/${userId}`).subscribe({
              next: (userDTO: any) => {
                this.user.firstName = userDTO.firstName;
                this.user.lastName = userDTO.lastName;
                this.user.username = userDTO.username;
                this.user.address = userDTO.address;
                this.user.phoneNumber = userDTO.phoneNumber;
                this.user.role = userDTO.role;
                this.user.isBlocked = userDTO.isBlocked;
                this.user.numberOfReports = userDTO.numberOfReports;

                this.updatedUser = this.user;
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

  selectedImage: { url: string, file: File } = null;
  fileUploaded: boolean = false;
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    const url = URL.createObjectURL(file);
    this.selectedImage = { url, file };

    reader.onload = (event: any) => {
      this.avatarBytes = event.target.result.split(',')[1];
      this.avatarImageType = file.type.split('/')[1];
    };

    reader.readAsDataURL(file);
    this.fileUploaded = true;
  }

  updateDetails() {

    if (this.fileUploaded) {
      this.http.post(`http://localhost:8080/api/users/${this.userId}/image`, this.avatarBytes, { responseType: 'text' }).subscribe({
        next: (r: any) => { },
        error: (err) => {
          console.error(err);
          alert("Error while updating user avatar!");
        }
      });
    }

    if (this.password != null && this.password != "") {
      if (this.password != this.passwordConfirm) {
        alert("Passwords do not match!");
        return;
      }
      this.updatedUser.password = this.password;
    }
    if (this.phone != null && this.phone != "") {
      const phoneRegex = new RegExp('^\\+\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$');
      if (!phoneRegex.test(this.phone)) {
        alert("Phone number is not valid!");
        return;
      }
      this.updatedUser.phoneNumber = this.phone;
    } else {
      this.updatedUser.phoneNumber = this.user.phoneNumber;
    }
    if (this.email != null && this.email != "") {
      this.updatedUser.username = this.email;
    } else {
      this.updatedUser.username = this.user.username;
    }
    if (this.address != null && this.address != "") {
      this.updatedUser.address = this.address;
    } else {
      this.updatedUser.address = this.user.address;
    }

    console.log(this.updatedUser);
    this.http.put(`http://localhost:8080/api/users/${this.userId}`, this.updatedUser, { responseType: 'text' }).subscribe({
      next: (r: any) => {
        this._router.navigateByUrl("/profile");
      },
      error: (err) => {
        console.error(err);
        alert("Error while updating user data!");
      }
    });



  }

}
