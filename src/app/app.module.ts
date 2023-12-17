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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {SlickCarouselModule} from "ngx-slick-carousel";
import {NgOptimizedImage} from "@angular/common";
import {UserService} from "./login/user.service";
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import {AccommodationDetailsModule} from "./accommodation-details/accommodation-details.module";
import {SearchPageModule} from "./search-page/search-page.module";
import {MainPageModule} from "./main-page/main-page.module";
import {SharedModule} from "./shared/shared.module";
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import {HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch} from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import {
  ApproveAccommodationsComponent
} from "./admin-functions/approve-accommodations/approve-accommodations.component";



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
    MainPageComponent,
    SearchPageComponent,
    AccommodationDetailsComponent,
    CreateAccommodationComponent,
    ApproveAccommodationsComponent,

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
    ReactiveFormsModule,
    SlickCarouselModule,
    NgOptimizedImage,
    FormsModule,
    HttpClientModule,
    AccommodationDetailsModule,
    SearchPageModule,
    MainPageModule,
    SharedModule,
    MatRadioModule,

  ],
  providers: [
    provideClientHydration(),
    [UserService],
    provideHttpClient(withFetch()),
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' }
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
