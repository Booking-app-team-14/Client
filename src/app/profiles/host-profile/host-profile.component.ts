import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrl: './host-profile.component.css'
})
export class HostProfileComponent {

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
