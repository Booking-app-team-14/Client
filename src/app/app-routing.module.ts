import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateAccountComponent } from './profiles/profile-info/update-account/update-account.component';
import { ProfileComponent } from './profiles/profile/profile.component';
import { LoginComponent } from './user-credentials/login/login.component';
import { RegisterComponent } from './user-credentials/register/register.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {SearchPageComponent} from "./search-page/search-page.component";
import {AccommodationDetailsComponent} from "./accommodation-details/accommodation-details.component";
import {CreateAccommodationComponent} from "./accommodations/create-accommodation/create-accommodation.component";
import { ApproveAccommodationsComponent } from './admin-functions/approve-accommodations/approve-accommodations.component';
import { VerificationComponent } from './user-credentials/verification/verification.component';
import { UpdateAccommodationComponent } from './accommodations/update-accommodation/update-accommodation.component';
import {GuestReservationsComponent} from "./reservations-requests/guest-reservations/guest-reservations.component";
import {OwnerReservationsComponent} from "./reservations-requests/owner-reservations/owner-reservations.component";
import {FavoriteComponent} from "./accommodations/favorite/favorite.component";
import {OwnerReviewComponent} from "./reviews/owner-review/owner-review.component";
import {ReportModalComponent} from "./report-modal/report-modal.component";
import {
  EachAccommodationReportComponent
} from "./accommodation-reports/each-accommodation/each-accommodation-report.component";
import {MonthlyReportComponent} from "./accommodation-reports/monthly-report/monthly-report.component";
import { ApproveReviewsComponent } from './admin-functions/approve-reviews/approve-reviews.component';
import { ReportedReviewsComponent } from './admin-functions/reported-reviews/reported-reviews.component';
import { ReportedUsersComponent } from './admin-functions/reported-users/reported-users.component';
import {MyReviewsComponent} from "./reviews/my-reviews/my-reviews.component";
import { NotificationWallComponent } from './notifications/notification-wall/notification-wall.component';

const routes: Routes = [
  {component: UpdateAccommodationComponent, path: 'update-accommodation/:id'},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {component: ProfileComponent, path: 'profile'},
  {component: UpdateAccountComponent, path: 'profile/update-account'},
  {component:MainPageComponent, path:''},
  {component:SearchPageComponent,path:'search'},
  {component:AccommodationDetailsComponent, path:'search/details/:id'},
  {component:CreateAccommodationComponent, path:'create-accommodation'},
  {component: ApproveAccommodationsComponent, path: 'approve-accommodations'},
  {component: ApproveReviewsComponent, path: 'approve-reviews'},
  {component: ReportedReviewsComponent, path: 'reported-reviews'},
  {component: ReportedUsersComponent, path: 'reported-users'},
  {component: GuestReservationsComponent, path:'guest-requests'},
  {component: OwnerReservationsComponent, path:'owner-requests'},
  {component: FavoriteComponent, path:'favorite'},
  {component: EachAccommodationReportComponent, path:'profile/accommodation/report'},
  {component:MonthlyReportComponent, path:'monthly_report/:id'},
  {component:NotificationWallComponent, path:'notifications'},
  { path: 'verify', component: VerificationComponent },
  {path:'search/details/:id/owner-review', component:OwnerReviewComponent},
  {path:'my-reviews', component:MyReviewsComponent},
  {path:'report-modal', component:ReportModalComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
