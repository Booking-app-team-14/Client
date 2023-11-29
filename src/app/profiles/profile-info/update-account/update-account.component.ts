import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css'
})
export class UpdateAccountComponent {

  constructor(private _router: Router) { }

  passwordVisibility : boolean = true;
  passwordConfirmVisibility : boolean = true;
  passwordType : string = "password";
  passwordConfirmType : string = "password";

  user: {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string,
    avatarPath: string
  } = { // get logged user from service
    firstName: 'Sava',
    lastName: 'Savić',
    email: 'test@example.com',
    address: '1234 Main St, Anytown, USA',
    phone: '+381 66 0123456',
    avatarPath: 'assets/user-avatar.png'
  };

  currentEmail : string;
  currentPhoneNumber : string;
  currentAddress : string;

  updateDetails() {

    // update user details in database
    this._router.navigateByUrl("/profile");
  }

}
