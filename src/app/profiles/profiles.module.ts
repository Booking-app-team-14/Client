import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminProfileComponent} from "./admin-profile/admin-profile.component";
import {GuestProfileComponent} from "./guest-profile/guest-profile.component";
import {HostProfileComponent} from "./host-profile/host-profile.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileInfoComponent} from "./profile-info/profile-info.component";
import {UpdateAccountComponent} from "./profile-info/update-account/update-account.component";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    AdminProfileComponent,
    GuestProfileComponent,
    HostProfileComponent,
    ProfileComponent,
    ProfileInfoComponent,
    UpdateAccountComponent
  ],
  exports: [
    AdminProfileComponent,
    GuestProfileComponent,
    HostProfileComponent,
    ProfileComponent,
    ProfileInfoComponent,
    UpdateAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterLink
  ]
})
export class ProfilesModule { }
