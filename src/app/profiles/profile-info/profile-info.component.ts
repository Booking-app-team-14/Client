import { AfterViewChecked, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent implements AfterViewChecked {

  constructor(private _router: Router) { }

  @Input()
  user: {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string,
    avatarPath: string
  };

  ngAfterViewChecked(){
    // here, user has been passed in
    
  }

  closeAccount() {
    if(!confirm("Are you sure you want to close your account?")) return;

    // delete user from database
    this._router.navigateByUrl("");
  }

  signOut() {
    
    // sign out user
    this._router.navigateByUrl("");
  }

}
