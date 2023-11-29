import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { UpdateAccountComponent } from './profiles/profile-info/update-account/update-account.component';
import { ProfileComponent } from './profiles/profile/profile.component';

const routes: Routes = [
  {component: HeaderComponent, path: 'header'},
  {component: ProfileComponent, path: 'profile'},
  {component: UpdateAccountComponent, path: 'profile/update-account'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
