import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SearchPageComponent} from "./search-page/search-page.component";
import {MainPageComponent} from "./main-page/main-page.component";


const routes: Routes = [
  {component: HeaderComponent, path: 'header'},
  { component: MainPageComponent, path: 'main' },
  {component: SearchPageComponent, path: 'search' },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
