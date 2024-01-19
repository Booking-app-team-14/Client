import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SlickCarouselModule} from "ngx-slick-carousel";
import {NgOptimizedImage} from "@angular/common";
import {UserService} from "./user-credentials/login/user.service";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from '@angular/common/http';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {AccommodationDetailsModule} from "./accommodation-details/accommodation-details.module";
import {SearchPageModule} from "./search-page/search-page.module";
import {MainPageModule} from "./main-page/main-page.module";
import {SharedModule} from "./shared/shared.module";
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from "@angular/material/radio";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {JwtInterceptor} from "./jwt.interceptor";
import { ReportModalComponent } from './report-modal/report-modal.component';
import { DeleteReviewDialogComponent } from './delete-review-dialog/delete-review-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { NotificationWallComponent } from './notifications/notification-wall/notification-wall.component';
import {AccommodationReportsModule} from "./accommodation-reports/accommodation-reports.module";
import {AccommodationsModule} from "./accommodations/accommodations.module";
import {AdminFunctionsModule} from "./admin-functions/admin-functions.module";
import {ProfilesModule} from "./profiles/profiles.module";
import {ReservationsRequestsModule} from "./reservations-requests/reservations-requests.module";
import {ReviewsModule} from "./reviews/reviews.module";
import {UserCredentialsModule} from "./user-credentials/user-credentials.module";
import {LayoutModule} from "./layout/layout.module";

@NgModule({
  declarations: [
    AppComponent,
    ReportModalComponent,
    DeleteReviewDialogComponent,
    NotificationWallComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ProfilesModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AccommodationReportsModule,
    SlickCarouselModule,
    NgOptimizedImage,
    FormsModule,
    MatRadioModule,
    ReservationsRequestsModule,
    HttpClientModule,
    MatSnackBarModule,
    ReviewsModule,
    MainPageModule,
    SearchPageModule,
    AccommodationDetailsModule,
    AccommodationsModule,
    AdminFunctionsModule,
    SharedModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    UserCredentialsModule,
    SharedModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogTitle,
    LayoutModule
  ],
  providers: [
    provideClientHydration(),

    [UserService],
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' }
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
