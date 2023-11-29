import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrl: './guest-profile.component.css'
})
export class GuestProfileComponent {

  @Input()
  user: {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string,
    avatarPath: string
  };

}
