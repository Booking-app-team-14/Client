import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {SearchSectionComponent} from "./search-section/search-section.component";
import {SearchPageComponent} from "./search-page.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CardListComponent,
    SidebarComponent,
    SearchSectionComponent,
    SearchPageComponent
  ],
  exports: [
    SidebarComponent,
    CardListComponent,
    SearchSectionComponent,
    SearchPageComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        FormsModule,
    ]
})
export class SearchPageModule { }
