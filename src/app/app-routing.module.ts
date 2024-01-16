import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component'
import { UpdateAccountComponent } from './profiles/profile-info/update-account/update-account.component';
import { ProfileComponent } from './profiles/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {SearchPageComponent} from "./search-page/search-page.component";
import {AccommodationDetailsComponent} from "./accommodation-details/accommodation-details.component";
import {CreateAccommodationComponent} from "./create-accommodation/create-accommodation.component";
import { ApproveAccommodationsComponent } from './admin-functions/approve-accommodations/approve-accommodations.component';
import { VerificationComponent } from './verification/verification.component';
import { UpdateAccommodationComponent } from './update-accommodation/update-accommodation.component';
import {GuestReservationsComponent} from "./guest-reservations/guest-reservations.component";
import {OwnerReservationsComponent} from "./owner-reservations/owner-reservations.component";
import {FavoriteComponent} from "./favorite/favorite.component";
import {OwnerReviewComponent} from "./owner-review/owner-review.component";
import {ReportModalComponent} from "./report-modal/report-modal.component";
import {
  EachAccommodationReportComponent
} from "./accommodation-reports/each-accommodation/each-accommodation-report.component";
import {MonthlyReportComponent} from "./accommodation-reports/monthly-report/monthly-report.component";
import { ApproveReviewsComponent } from './admin-functions/approve-reviews/approve-reviews.component';
import {OwnerNotificationsComponent} from "./notifications/owner-notifications/owner-notifications.component";
import { ReportedReviewsComponent } from './admin-functions/reported-reviews/reported-reviews.component';
import { ReportedUsersComponent } from './admin-functions/reported-users/reported-users.component';
import {MyReviewsComponent} from "./my-reviews/my-reviews.component";

const routes: Routes = [
  {component: UpdateAccommodationComponent, path: 'update-accommodation/:id'},
  {component: HeaderComponent, path: 'header'},
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
  {component:OwnerNotificationsComponent, path:'owner_notifications'},
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
