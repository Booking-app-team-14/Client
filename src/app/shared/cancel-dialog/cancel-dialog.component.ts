import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-dialog',
  template: `
    <h2 mat-dialog-title>Confirmation</h2>
    <div mat-dialog-content>
      Are you sure you want to cancel?
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button color="warn" (click)="onYesClick()">Yes</button>
    </div>
  `,
})
export class CancelDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close('No');
  }

  onYesClick(): void {
    this.dialogRef.close('Yes');
  }
}
