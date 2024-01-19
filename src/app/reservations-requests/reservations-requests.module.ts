import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GuestReservationsComponent} from "./guest-reservations/guest-reservations.component";
import {OwnerReservationsComponent} from "./owner-reservations/owner-reservations.component";
import {FormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    GuestReservationsComponent,
    OwnerReservationsComponent
  ],
  exports: [GuestReservationsComponent, OwnerReservationsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatIconModule
  ]
})
export class ReservationsRequestsModule { }
