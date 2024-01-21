import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EachAccommodationReportComponent} from "./each-accommodation/each-accommodation-report.component";
import {MonthlyReportComponent} from "./monthly-report/monthly-report.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    EachAccommodationReportComponent,
    MonthlyReportComponent
  ],
  exports:[EachAccommodationReportComponent, MonthlyReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class AccommodationReportsModule { }
