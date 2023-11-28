import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { BestOffersComponent } from './main-page/best-offers/best-offers.component';
import { TestimonialsComponent } from './main-page/testimonials/testimonials.component';
import { SearchSectionComponent } from './main-page/search-section/search-section.component';
import { CardListComponent } from './search-page/card-list/card-list.component';
import { SidebarComponent } from './search-page/sidebar/sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    BestOffersComponent,
    TestimonialsComponent,
    SearchSectionComponent,
    CardListComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
