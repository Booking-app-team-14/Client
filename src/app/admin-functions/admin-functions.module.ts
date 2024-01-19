import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApproveAccommodationsComponent} from "./approve-accommodations/approve-accommodations.component";
import {ApproveReviewsComponent} from "./approve-reviews/approve-reviews.component";
import {ReportedReviewsComponent} from "./reported-reviews/reported-reviews.component";
import {ReportedUsersComponent} from "./reported-users/reported-users.component";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    ApproveAccommodationsComponent,
    ApproveReviewsComponent,
    ReportedReviewsComponent,
    ReportedUsersComponent
  ],
  exports: [
    ApproveAccommodationsComponent,
    ApproveReviewsComponent,
    ReportedReviewsComponent,
    ReportedUsersComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    FormsModule,
    MatIconModule
  ]
})
export class AdminFunctionsModule { }
