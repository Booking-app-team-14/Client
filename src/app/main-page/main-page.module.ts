import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { BestOffersComponent } from './best-offers/best-offers.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { WelcomeSectionComponent } from './welcome-section/welcome-section.component';
import {MainPageComponent} from "./main-page.component";

@NgModule({
  declarations: [
    BestOffersComponent,
    TestimonialsComponent,
    WelcomeSectionComponent,
    MainPageComponent

  ],
  exports: [
    BestOffersComponent,
    TestimonialsComponent,
   WelcomeSectionComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,

  ]
})
export class MainPageModule { }
