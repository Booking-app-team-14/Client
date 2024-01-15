import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reported-reviews',
  templateUrl: './reported-reviews.component.html',
  styleUrl: './reported-reviews.component.css'
})
export class ReportedReviewsComponent {

  accommodationReviewReports: any[];
  ownerReviewReports: any[];
  type: string = "accommodation";

  constructor(private http: HttpClient, private _router: Router) {
    
    this.accommodationReviewReports = [
      {
        id: 1,
        accommodationId: 1,
        accommodationName: "Accommodation 1",
        reviewId: 1,
        reviewContent: "Review 1",
        reportId: 1,
        reportContent: "Report 1"
      },
      {
        id: 2,
        accommodationId: 2,
        accommodationName: "Accommodation 2",
        reviewId: 2,
        reviewContent: "Review 2",
        reportId: 2,
        reportContent: "Report 2"
      }
    ];

    this.ownerReviewReports = [
      {
        id: 1,
        ownerId: 1,
        ownerName: "Owner 1",
        reviewId: 1,
        reviewContent: "Review 1",
        reportId: 1,
        reportContent: "Report 1"
      },
      {
        id: 2,
        ownerId: 2,
        ownerName: "Owner 2",
        reviewId: 2,
        reviewContent: "Review 2",
        reportId: 2,
        reportContent: "Report 2"
      }
    ];
  
  }






  viewDetails(accommodationId: number) {
    this._router.navigate(['/search/details', accommodationId]);
  }

  removeOwnerReview(reviewId: number) {
    // TODO: remove review from database
    this.deleteOwnerReviewReportWithAnimation(reviewId);
  }

  acceptOwnerReview(reviewId: number) {
    // TODO: remove report from database
    this.deleteOwnerReviewReportWithAnimation(reviewId);
  }

  removeAccommodationReview(reviewId: number) {
    // TODO: remove review from database
    this.deleteAccommodationReviewReportWithAnimation(reviewId);
  }

  acceptAccommodationReview(reviewId: number) {
    // TODO: remove report from database
    this.deleteAccommodationReviewReportWithAnimation(reviewId);
  }

  deleteOwnerReviewReportWithAnimation(reviewId: number) {
    const review = document.getElementById("owner-card-" + reviewId);
    review.classList.add("fade-out");
    setTimeout(() => {
      for (let i = 0; i < this.ownerReviewReports.length; i++) {
        if(this.ownerReviewReports[i].id == reviewId) {
          this.ownerReviewReports.splice(i, 1);
          break;
        }
      }
    }, 700);
  }

  deleteAccommodationReviewReportWithAnimation(reviewId: number) {
    const review = document.getElementById("accommodation-card-" + reviewId);
    review.classList.add("fade-out");
    setTimeout(() => {
      for (let i = 0; i < this.accommodationReviewReports.length; i++) {
        if(this.accommodationReviewReports[i].id == reviewId) {
          this.accommodationReviewReports.splice(i, 1);
          break;
        }
      }
    }, 700);
  }

}
