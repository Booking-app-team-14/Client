import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from "./register/register.component";
import {VerificationComponent} from "./verification/verification.component";
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterOutlet} from "@angular/router";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerificationComponent
  ],
  exports: [LoginComponent, RegisterComponent, VerificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterLink,
    RouterOutlet
  ]
})
export class UserCredentialsModule { }
