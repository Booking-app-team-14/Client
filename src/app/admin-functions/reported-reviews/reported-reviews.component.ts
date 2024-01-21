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
    
    http.get('http://localhost:8080/api/reviewReports').subscribe({
      next: (data: any[]) => {
        this.accommodationReviewReports = data;

        for (let i = 0; i < this.accommodationReviewReports.length; i++) {

          const formatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });
          this.accommodationReviewReports[i].sentAt = formatter.format(new Date(this.accommodationReviewReports[i].sentAt));

          http.get('http://localhost:8080/api/accommodationReviews/' + this.accommodationReviewReports[i].accommodationReviewId).subscribe({
            next: (data: any) => {
              this.accommodationReviewReports[i].review = data;


              if (this.accommodationReviewReports[i].review.rating == -1) this.accommodationReviewReports[i].review.rating = 0;

              http.get('http://localhost:8080/api/users/' + this.accommodationReviewReports[i].review.userId + '/image-type-username', {responseType: 'text'}).subscribe({
                next: (data: any) => {
                  this.accommodationReviewReports[i].review.guestUsername = data.split(' | ')[0];
                  this.accommodationReviewReports[i].review.guestProfilePictureType = data.split(' | ')[1];
                  this.accommodationReviewReports[i].review.guestProfilePictureBytes = data.split(' | ')[2];
                },
                error: (err) => {
                  console.error(err);
                }
              });

              http.get('http://localhost:8080/api/accommodations/' + this.accommodationReviewReports[i].review.accommodationId).subscribe({
                next: (data: any) => {
                  this.accommodationReviewReports[i].review.accommodationName = data.name;
                  this.accommodationReviewReports[i].review.accommodationPictureType = data.imageTypes[0];
                  this.accommodationReviewReports[i].review.accommodationPictureBytes = data.imageBytes[0];
                  if (data.type === "STUDIO") this.accommodationReviewReports[i].review.accommodationType = "Studio";
                  else if (data.type === "ROOM") this.accommodationReviewReports[i].review.accommodationType = "Room";
                  else if (data.type === "APARTMENT") this.accommodationReviewReports[i].review.accommodationType = "Apartment";
                  else if (data.type === "VILLA") this.accommodationReviewReports[i].review.accommodationType = "Villa";
                  else if (data.type === "HOTEL") this.accommodationReviewReports[i].review.accommodationType = "Hotel";
                  this.accommodationReviewReports[i].review.accommodationRating = data.rating;
                },
                error: (err) => {
                  console.error(err);
                }
              });


            },
            error: error => console.error('There was an error fetching accommodation reviews!', error)
          });

        }

      },
      error: error => console.error('There was an error fetching accommodation review reports!', error)
    });

    http.get('http://localhost:8080/api/ownerReviewReports').subscribe({
      next: (data: any[]) => {
        this.ownerReviewReports = data;

        for (let i = 0; i < this.ownerReviewReports.length; i++) {

          const formatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });
          this.ownerReviewReports[i].sentAt = formatter.format(new Date(this.ownerReviewReports[i].sentAt));

          http.get('http://localhost:8080/api/reviews/' + this.ownerReviewReports[i].reviewId).subscribe({
            next: (data: any) => {
              this.ownerReviewReports[i].review = data;

              if (this.ownerReviewReports[i].review.rating == -1) this.ownerReviewReports[i].review.rating = 0;

              http.get('http://localhost:8080/api/users/' + this.ownerReviewReports[i].review.senderId + '/image-type-username', {responseType: 'text'}).subscribe({
                next: (data: any) => {
                  this.ownerReviewReports[i].review.senderUsername = data.split(' | ')[0];
                  this.ownerReviewReports[i].review.senderProfilePictureType = data.split(' | ')[1];
                  this.ownerReviewReports[i].review.senderProfilePictureBytes = data.split(' | ')[2];
                },
                error: (err) => {
                  console.error(err);
                }
              });

              http.get('http://localhost:8080/api/users/' + this.ownerReviewReports[i].review.recipientId + '/image-type-username', {responseType: 'text'}).subscribe({
                next: (data: any) => {
                  this.ownerReviewReports[i].review.recipientUsername = data.split(' | ')[0];
                  this.ownerReviewReports[i].review.recipientProfilePictureType = data.split(' | ')[1];
                  this.ownerReviewReports[i].review.recipientProfilePictureBytes = data.split(' | ')[2];
                },
                error: (err) => {
                  console.error(err);
                }
              });

              this.http.get('http://localhost:8080/api/owners/' + this.ownerReviewReports[i].recipientId + '/rating').subscribe({
                next: (rating: number) => {
                  this.ownerReviewReports[i].ratingBefore = Math.round(rating);
                },
                error: (err) => {
                  console.error(err);
                }
              });

            },
            error: error => console.error('There was an error fetching owner reviews!', error)
          });

        }

      },
      error: error => console.error('There was an error fetching owner review reports!', error)
    });

  }

  viewDetails(accommodationId: number) {
    this._router.navigate(['/search/details', accommodationId]);
  }

  removeOwnerReview(reviewReportId: number) {
    this.http.delete('http://localhost:8080/api/ownerReviewReports/ownerReviews/' + reviewReportId).subscribe({
      next: (data: any) => {
        alert("Review removed!");
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.deleteOwnerReviewReportWithAnimation(reviewReportId);
  }

  ignoreOwnerReviewReport(reviewReportId: number) {
    this.http.delete('http://localhost:8080/api/ownerReviewReports/' + reviewReportId).subscribe({
      next: (data: any) => {
        alert("Review accepted!");
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.deleteOwnerReviewReportWithAnimation(reviewReportId);
  }

  removeAccommodationReview(reviewReportId: number) {
    this.http.delete('http://localhost:8080/api/reviewReports/accommodationReviews/' + reviewReportId).subscribe({
      next: (data: any) => {
        alert("Review removed!");
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.deleteAccommodationReviewReportWithAnimation(reviewReportId);
  }

  ignoreAccommodationReviewReport(reviewReportId: number) {
    this.http.delete('http://localhost:8080/api/reviewReports/' + reviewReportId).subscribe({
      next: (data: any) => {
        alert("Review accepted!");
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.deleteAccommodationReviewReportWithAnimation(reviewReportId);
  }

  deleteOwnerReviewReportWithAnimation(reviewReportId: number) {
    const review = document.getElementById("owner-card-" + reviewReportId);
    review.classList.add("fade-out");
    setTimeout(() => {
      for (let i = 0; i < this.ownerReviewReports.length; i++) {
        if(this.ownerReviewReports[i].id == reviewReportId) {
          this.ownerReviewReports.splice(i, 1);
          break;
        }
      }
    }, 700);
  }

  deleteAccommodationReviewReportWithAnimation(reviewReportId: number) {
    const review = document.getElementById("accommodation-card-" + reviewReportId);
    review.classList.add("fade-out");
    setTimeout(() => {
      for (let i = 0; i < this.accommodationReviewReports.length; i++) {
        if(this.accommodationReviewReports[i].id == reviewReportId) {
          this.accommodationReviewReports.splice(i, 1);
          break;
        }
      }
    }, 700);
  }

}
