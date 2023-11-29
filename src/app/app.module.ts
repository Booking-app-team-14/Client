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
import { GuestProfileComponent } from './profiles/guest-profile/guest-profile.component';
import { HostProfileComponent } from './profiles/host-profile/host-profile.component';
import { AdminProfileComponent } from './profiles/admin-profile/admin-profile.component';
import { ProfileInfoComponent } from './profiles/profile-info/profile-info.component';
import { UpdateAccountComponent } from './profiles/profile-info/update-account/update-account.component';
import { ProfileComponent } from './profiles/profile/profile.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BestOffersComponent } from './main-page/best-offers/best-offers.component';
import { TestimonialsComponent } from './main-page/testimonials/testimonials.component';
import { SearchSectionComponent } from './main-page/search-section/search-section.component';
import { CardListComponent } from './search-page/card-list/card-list.component';
import { SidebarComponent } from './search-page/sidebar/sidebar.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    GuestProfileComponent,
    HostProfileComponent,
    AdminProfileComponent,
    ProfileInfoComponent,
    UpdateAccountComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    BestOffersComponent,
    SearchSectionComponent,
    TestimonialsComponent,
    SidebarComponent,
    CardListComponent,
    MainPageComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
