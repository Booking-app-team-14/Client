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

    // this.http.get('http://localhost:8080/api/accommodations/requests').subscribe({
    //   next: (accommodationsReviews: any[]) => {

    //     this.accommodationsReviews = accommodationsReviews;

    //     // for (let i = 0; i < this.accommodations.length; i++) {
    //     //   if(this.accommodations[i].requestType == "new") this.accommodations[i].requestType = "fiber_new";
    //     //   else if(this.accommodations[i].requestType == "updated") this.accommodations[i].requestType = "autorenew";
    //     //   const date = new Date(parseInt(this.accommodations[i].dateRequested) * 1000);
    //     //   const formatter = new Intl.DateTimeFormat('en-US', {
    //     //     day: '2-digit',
    //     //     month: 'long',
    //     //     year: 'numeric'
    //     //   });
    //     //   this.accommodations[i].dateRequested = formatter.format(date);
    //     //   this.accommodations[i].postedAgo = this.getPostedAgo(date);
    //     // }

    //   },
    //   error: (err) => {
    //     console.error(err);
    //     alert("Error while fetching accommodation reviews!");
    //   }
    // });

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

}
