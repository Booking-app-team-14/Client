import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyReviewsComponent} from "./my-reviews/my-reviews.component";
import {OwnerReviewComponent} from "./owner-review/owner-review.component";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [MyReviewsComponent, OwnerReviewComponent],
  exports: [MyReviewsComponent, OwnerReviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ]
})
export class ReviewsModule { }
