import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {SearchSectionComponent} from "./search-section/search-section.component";

@NgModule({
  declarations: [
    CardListComponent,
    SidebarComponent,
    SearchSectionComponent
  ],
  exports: [
    SidebarComponent,
    CardListComponent,
    SearchSectionComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
  ]
})
export class SearchPageModule { }
