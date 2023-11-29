import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component'
import { UpdateAccountComponent } from './profiles/profile-info/update-account/update-account.component';
import { ProfileComponent } from './profiles/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {SearchPageComponent} from "./search-page/search-page.component";

const routes: Routes = [
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
  {component:SearchPageComponent,path:'search'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
