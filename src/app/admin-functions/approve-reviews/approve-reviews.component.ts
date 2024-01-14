import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approve-reviews',
  templateUrl: './approve-reviews.component.html',
  styleUrl: './approve-reviews.component.css'
})
export class ApproveReviewsComponent {

  type: string = "accommodation";
  accommodationsReviews: any[];
  ownerReviews: any[];

  constructor(private http: HttpClient, private _router: Router) {

    this.http.get('http://localhost:8080/api/reviews/accommodation/requests').subscribe({
      next: (accommodationsReviews: any[]) => {

        this.accommodationsReviews = accommodationsReviews;

        for (let i = 0; i < this.accommodationsReviews.length; i++) {
          const date = new Date(this.accommodationsReviews[i].sentAt);
          const formatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });
          this.accommodationsReviews[i].sentAt = formatter.format(date);
          if (this.accommodationsReviews[i].rating === -1) this.accommodationsReviews[i].rating = 0;
          if (this.accommodationsReviews[i].rating === 0) this.accommodationsReviews[i].reviewType = "Comment";
          else this.accommodationsReviews[i].reviewType = "Review";

          this.http.get('http://localhost:8080/api/users/' + this.accommodationsReviews[i].userId + '/image-type-username', {responseType: 'text'}).subscribe({
            next: (data: any) => {
              this.accommodationsReviews[i].guestUsername = data.split(' | ')[0];
              this.accommodationsReviews[i].guestProfilePictureType = data.split(' | ')[1];
              this.accommodationsReviews[i].guestProfilePictureBytes = data.split(' | ')[2];
            },
            error: (err) => {
              console.error(err);
            }
          });

          this.http.get('http://localhost:8080/api/accommodations/' + this.accommodationsReviews[i].accommodationId).subscribe({
            next: (data: any) => {
              this.accommodationsReviews[i].accommodationName = data.name;
              this.accommodationsReviews[i].accommodationPictureType = data.imageTypes[0];
              this.accommodationsReviews[i].accommodationPictureBytes = data.imageBytes[0];
              if (data.type === "STUDIO") this.accommodationsReviews[i].accommodationType = "Studio";
              else if (data.type === "ROOM") this.accommodationsReviews[i].accommodationType = "Room";
              else if (data.type === "APARTMENT") this.accommodationsReviews[i].accommodationType = "Apartment";
              else if (data.type === "VILLA") this.accommodationsReviews[i].accommodationType = "Villa";
              else if (data.type === "HOTEL") this.accommodationsReviews[i].accommodationType = "Hotel";
            },
            error: (err) => {
              console.error(err);
            }
          });

          this.http.get('http://localhost:8080/api/accommodations/' + this.accommodationsReviews[i].accommodationId + '/rating').subscribe({
            next: (rating: number) => {
              this.accommodationsReviews[i].accommodationRating = Math.round(rating);
            },
            error: (err) => {
              console.error(err);
            }
          });

        }

      },
      error: (err) => {
        console.error(err);
        alert("Error while fetching accommodation reviews!");
      }
    });

    this.http.get('http://localhost:8080/api/reviews/owner/requests').subscribe({
      next: (ownerReviews: any[]) => {

        this.ownerReviews = ownerReviews;

        for (let i = 0; i < this.ownerReviews.length; i++) {
          const date = new Date(this.ownerReviews[i].timestamp);
          const formatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });
          this.ownerReviews[i].timestamp = formatter.format(date);

          this.http.get('http://localhost:8080/api/users/' + this.ownerReviews[i].senderId + '/image-type-username', {responseType: 'text'}).subscribe({
            next: (data: any) => {
              this.ownerReviews[i].guestUsername = data.split(' | ')[0];
              this.ownerReviews[i].guestProfilePictureType = data.split(' | ')[1];
              this.ownerReviews[i].guestProfilePictureBytes = data.split(' | ')[2];
            },
            error: (err) => {
              console.error(err);
            }
          });

          this.http.get('http://localhost:8080/api/users/' + this.ownerReviews[i].recipientId + '/image-type-username', {responseType: 'text'}).subscribe({
            next: (data: any) => {
              this.ownerReviews[i].ownerUsername = data.split(' | ')[0];
              this.ownerReviews[i].ownerProfilePictureType = data.split(' | ')[1];
              this.ownerReviews[i].ownerProfilePictureBytes = data.split(' | ')[2];
            },
            error: (err) => {
              console.error(err);
            }
          });

          this.http.get('http://localhost:8080/api/owners/' + this.ownerReviews[i].recipientId + '/rating').subscribe({
            next: (rating: number) => {
              this.ownerReviews[i].ratingBefore = Math.round(rating);
            },
            error: (err) => {
              console.error(err);
            }
          });

        }

      },
      error: (err ) => {
        console.error(err);
        alert("Error while fetching owner reviews!");
      }
    });

  }

  viewDetails(accommodationId: number) {
    this._router.navigate(['/search/details', accommodationId]);
  }

  binOwnerReview(reviewId: number) {
    this.http.delete('http://localhost:8080/api/reviews/admin/' + reviewId).subscribe({
      next: (data: any) => {
        alert("Owner review binned!");
      },
      error: (err) => {
        console.error(err);
        alert("Error while deleting owner review!");
      }
    });
    this.deleteOwnerReviewWithAnimation(reviewId);
  }

  acceptOwnerReview(reviewId: number) {
    this.http.put('http://localhost:8080/api/reviews/admin/' + reviewId, {}).subscribe({
      next: (data: any) => {
        alert("Owner review accepted!");
      },
      error: (err) => {
        console.error(err);
        alert("Owner review accepted!");
      }
    });
    this.deleteOwnerReviewWithAnimation(reviewId);
  }

  binAccommodationReview(reviewId: number) {
    this.http.delete('http://localhost:8080/api/reviews/admin/accommodation/' + reviewId).subscribe({
      next: (data: any) => {
        alert("Accommodation review binned!");
      },
      error: (err) => {
        console.error(err);
        alert("Error while deleting accommodation review!");
      }
    });
    this.deleteAccommodationReviewWithAnimation(reviewId);
  }

  acceptAccommodationReview(reviewId: number) {
    this.http.put('http://localhost:8080/api/reviews/admin/accommodation/' + reviewId, {}).subscribe({
      next: (data: any) => {
        alert("Accommodation review accepted!");
      },
      error: (err) => {
        console.error(err);
        alert("Error while accepting accommodation review!");
      }
    });
    this.deleteAccommodationReviewWithAnimation(reviewId);
  }

  deleteOwnerReviewWithAnimation(reviewId: number) {
    const review = document.getElementById("owner-card-" + reviewId);
    review.classList.add("fade-out");
    setTimeout(() => {
      for (let i = 0; i < this.ownerReviews.length; i++) {
        if(this.ownerReviews[i].id == reviewId) {
          this.ownerReviews.splice(i, 1);
          break;
        }
      }
    }, 700);
  }

  deleteAccommodationReviewWithAnimation(reviewId: number) {
    const review = document.getElementById("accommodation-card-" + reviewId);
    review.classList.add("fade-out");
    setTimeout(() => {
      for (let i = 0; i < this.accommodationsReviews.length; i++) {
        if(this.accommodationsReviews[i].id == reviewId) {
          this.accommodationsReviews.splice(i, 1);
          break;
        }
      }
    }, 700);
  }

}
