import { Component } from '@angular/core';

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

}
