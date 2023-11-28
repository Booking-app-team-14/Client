import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent} from "./search-page/layout/layout.component";

const routes: Routes = [
  {component: HeaderComponent, path: 'header'},
  {path:'search-page/layout', component:LayoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
