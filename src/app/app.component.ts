import { Component } from '@angular/core';
import {UserService} from "./login/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BAT14';

  constructor(private userService: UserService) {}

  get userRole(): string {
    return this.userService.getUserRole();
  }
}

//export const userRole: string = "";
