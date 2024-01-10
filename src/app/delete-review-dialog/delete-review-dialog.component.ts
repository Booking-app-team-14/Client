import {Component, Inject} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-review-dialog',
  templateUrl: './delete-review-dialog.component.html',
  styleUrl: './delete-review-dialog.component.css'
})
export class DeleteReviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reviewId: number }
  ) {}
}

