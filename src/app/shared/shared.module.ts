import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    CancelDialogComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
  ]
})
export class SharedModule {}
