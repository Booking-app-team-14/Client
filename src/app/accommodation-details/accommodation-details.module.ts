import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { RoundUpDetailsComponent } from './round-up-details/round-up-details.component';
import { LocationComponent } from './location/location.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RatingsComponent } from './ratings/ratings.component';
import { CommentsComponent } from './comments/comments.component';
import { FacilitiesComponent } from './facilities/facilities.component';


@NgModule({
  declarations: [
    ImageSliderComponent,
    RoundUpDetailsComponent,
    LocationComponent,
    ReservationComponent,
    RatingsComponent,
    CommentsComponent,
    FacilitiesComponent
  ],
  exports: [
    ImageSliderComponent,
    RoundUpDetailsComponent,
    LocationComponent,
    FacilitiesComponent,
    ReservationComponent,
    RatingsComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,

  ]
})
export class AccommodationDetailsModule { }
