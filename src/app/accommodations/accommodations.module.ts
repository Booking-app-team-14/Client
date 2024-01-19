import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateAccommodationComponent} from "./create-accommodation/create-accommodation.component";
import {UpdateAccommodationComponent} from "./update-accommodation/update-accommodation.component";
import {FavoriteComponent} from "./favorite/favorite.component";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    CreateAccommodationComponent,
    UpdateAccommodationComponent,
    FavoriteComponent
  ],
  exports: [
    CreateAccommodationComponent,
    UpdateAccommodationComponent,
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ]
})
export class AccommodationsModule { }
