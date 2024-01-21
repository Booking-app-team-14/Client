import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateAccountService } from './update-account.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css'
})
export class UpdateAccountComponent {

  constructor(private _router: Router, private http: HttpClient, private accountService: UpdateAccountService) { }

  passwordVisibility : boolean = true;
  passwordConfirmVisibility : boolean = true;
  passwordType : string = "password";
  passwordConfirmType : string = "password";
  firstName : string = "";
  lastName : string = "";

  user: {
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    role: string,
    isBlocked: false,
    numberOfReports: 0
  } = {
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
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string
  };

  avatarBytes: string;
  avatarImageType: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  address: string;
  userId: number;

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.accountService.getUserIdFromToken(currentUser.token).subscribe({
      next: (userId: any) => {
        this.userId = userId;
        this.accountService.getUserFromId(userId).subscribe({
          next: (userDTO: any) => {
            this.user.firstName = userDTO.firstName;
            this.user.lastName = userDTO.lastName;
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

    if (file && !(file.type === "image/jpeg" || file.type === "image/png")) {
      alert("File must be PNG or JPEG!");
      return;
    }

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
      this.accountService.uploadImage(this.avatarBytes, this.userId).subscribe({
        next: (r: any) => { },
        error: (err) => {
          console.error(err);
          alert("Error while updating user avatar!");
        }
      });
    }

    if (this.password != null && this.password != "") {
      if (this.password.length < 8) {
        alert("Password must be at least 8 characters long!");
        return;
      }
      if (this.password != this.passwordConfirm) {
        alert("Passwords do not match!");
        return;
      }
      this.updatedUser.password = this.password;
    }
    if (this.phone != null && this.phone != "") {
      const phoneRegex = new RegExp('^\\+\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$');
      if (!phoneRegex.test(this.phone)) {
        alert("Phone number is not valid!\nExample: +381012345678");
        return;
      }
      this.updatedUser.phoneNumber = this.phone;
    } else {
      this.updatedUser.phoneNumber = this.user.phoneNumber;
    }
    if (this.address != null && this.address != "") {
      if (this.address.length < 5) {
        alert("Address must be at least 5 characters long!");
        return;
      }
      this.updatedUser.address = this.address;
    } else {
      this.updatedUser.address = this.user.address;
    }
    if (this.firstName != null && this.firstName != "") {
      if (this.firstName.length < 2) {
        alert("First name must be at least 2 characters long!");
        return;
      }
      this.updatedUser.firstName = this.firstName;
    } else {
      this.updatedUser.firstName = this.user.firstName;
    }
    if (this.lastName != null && this.lastName != "") {
      if (this.lastName.length < 2) {
        alert("Last name must be at least 2 characters long!");
        return;
      }
      this.updatedUser.lastName = this.lastName;
    } else {
      this.updatedUser.lastName = this.user.lastName;
    }

    console.log(this.updatedUser);
    this.accountService.updateAccount(this.updatedUser, this.userId).subscribe({
      next: (r: any) => {
        alert("User data updated successfully!");
        this._router.navigate(['/profile'], { skipLocationChange: true }).then(() => {
          this._router.navigate(['/profile']);
        });
      },
      error: (err) => {
        console.error(err);
        alert("Error while updating user data!");
      }
    });

  }

}
