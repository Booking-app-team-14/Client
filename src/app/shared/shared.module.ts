import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';


@NgModule({
  declarations: [
    SharedComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule {}
