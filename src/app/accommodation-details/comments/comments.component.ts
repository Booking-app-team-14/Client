import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {catchError, Observable, of} from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import {ReservationService} from "../reservation/reservation.service";
import {AccommodationDetailsService} from "../accommodation-details.service";
import {UserService} from "../../login/user.service";
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  comments = [

  ];
  displayedComments: any[];
  averageRating: any;
  userComment: any;
  userRole: string ='';



  constructor(private http: HttpClient, private route: ActivatedRoute, private reservationService: ReservationService, private userService: UserService) {
    this.userService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  loadMoreComments() {
    const currentLength = this.displayedComments.length;
    const remainingComments = this.comments.slice(currentLength, currentLength + 5);
    this.displayedComments = [...this.displayedComments, ...remainingComments];
  }
  private reviewId: number;

  openDeleteReviewDialog(comment: any) {

  }



  userRating: number = 0;

  accommodationId: number = 0;

  //private accommodationId: number;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.accommodationId = params['id'];
      //const id=2;
      /*this.fetchOwnerDetails(id);
      this.fetchCommentsByOwnerId(this.ownerId);*/
      this.fetchAverageRatingByAccommodationId(this.accommodationId);
      this.fetchCommentsByAccommodationId(this.accommodationId);

        //this.isCurrentUser(this.review.user.id);
    });
  }

  onStarClick(rating: number) {
    this.userRating = rating;
  }
  /*"accommodationId":1,
  "rating":4,
  "comment": "jrfker sd nj s!"*/
  submitRating() {
    const reviewDTO = {
      accommodationId:this.accommodationId,
      rating: this.userRating,
      comment: this.userComment
    };

    this.http.post('http://localhost:8080/api/accommodations/accommodationReviews', reviewDTO).subscribe({
      next: (response: any) => {
        console.log('Review submitted successfully!', response);
        alert('Review submitted successfully:')
        this.fetchCommentsByAccommodationId(this.accommodationId);
        //this.fetchCommentsByOwnerId(this.ownerId);
        //this.fetchAverageRatingByOwnerId(this.ownerId);
      },
      error: (err) => {
        console.error('Error while submitting review:', err);
        alert('Error while submitting review!')
      }
    });
  }
  fetchCommentsByAccommodationId(accommodationId: number): void {

    this.http.get(`http://localhost:8080/api/accommodations/${this.accommodationId}/accommodationReviews/pending`).subscribe(
      (reviews: any[]) => {
        this.comments = reviews.map(review => ({
          name: review.user.firstName + " " + review.user.lastName,
          sentAt: review.sentAt,
          image: 'assets/BG.jpg',
          commentText: review.comment,
          rating:review.rating,
          id: review.id,

        }));

        //this.hasSentReview = this.comments.some(comment => comment.user.id === 2);

        this.displayedComments = this.comments.slice(0, 4);
        /*if (this.comments.length > 0) {
          this.updateFilledStars(this.comments[0].rating);
        }*/

      },
      (error) => {
        console.error(error);
        //alert("Error while fetching review data!");
      }
    );
  }

  selectReview(comment: any): void {
    this.reviewId = comment.id;
  }

  deleteComment(): void {
    if (this.reviewId) {
      this.http.delete(`http://localhost:8080/api/accommodationReviews/${this.reviewId}`).subscribe({
        next: () => {
          console.log('Review deleted successfully!');
          alert('Review deleted successfully!')
          this.fetchCommentsByAccommodationId(this.accommodationId);
          this.fetchAverageRatingByAccommodationId(this.accommodationId);
        },
        error: (err) => {
          console.error('Error deleting review:', err);
          alert('Error deleting review!');
        }
      });
    } else {
      console.error('Invalid reviewId.');
    }
  }

    /*isCurrentUser(commentUser: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));

      this.http.get(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe({
        next: (userId: any) => {
          if (userId === commentUser.id) {
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        },
        error: (error) => {
          console.error('Error fetching user data', error);
          observer.error(error);
        }
      });
    });
  }*/
  isCurrentUser(commentUser: any): Observable<boolean> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get(`http://localhost:8080/api/users/token/${currentUser.token}`).pipe(
      map((userId: any) => userId === commentUser.id),
      catchError(error => {
        console.error('Error fetching user data', error);
        return of(false);
      })
    );
  }

  fetchAverageRatingByAccommodationId(accommodationId: number): void {
    this.http.get<number>(`http://localhost:8080/api/accommodation/${accommodationId}/average-rating`).subscribe(
      (averageRating) => {
        this.averageRating = averageRating;
      },
      (error) => {
        console.error('Error fetching average rating for owner', error);
      }
    );
  }
  selectedReview: any = null;
  showButton: boolean=true;
  showReportInput(review: any) {
    this.comments.forEach(comment => {
      comment.showReport = false;
    });

    review.showReport = true;
    this.selectedReview = review;
  }

  submitReport() {
    const reportDTO = {
      accommodationReviewId: this.selectedReview.id,
      reason: this.selectedReview.reportReason
    };

    this.http.post('http://localhost:8080/api/reviewReports/accommodationReviews/report', reportDTO)
        .subscribe(
            (response: any) => {
              // Handle successful response
              this.selectedReview.showReport = false;
              this.selectedReview.showButton=true;
              this.selectedReview.reportReason = '';
              //this.selectedReview = null;
              alert("Successfully reported review!");
            },
            (error) => {
              // Handle error
              console.error(error);
            }
        );
  }

}
