import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  passwordVisibility : boolean = true;
  passwordConfirmVisibility : boolean = true;
  passwordType : string = "password";
  passwordConfirmType : string = "password";

}
