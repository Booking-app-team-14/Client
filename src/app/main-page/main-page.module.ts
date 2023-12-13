import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { BestOffersComponent } from './best-offers/best-offers.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import {SearchSectionComponent} from "../search-page/search-section/search-section.component";
import { WelcomeSectionComponent } from './welcome-section/welcome-section.component';

@NgModule({
  declarations: [
    BestOffersComponent,
    TestimonialsComponent,
    WelcomeSectionComponent

  ],
  exports: [
    BestOffersComponent,
    TestimonialsComponent,
   WelcomeSectionComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,

  ]
})
export class MainPageModule { }
