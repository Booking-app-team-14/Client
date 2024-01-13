import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
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

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.displayedComments = this.comments.slice(0, 10); //
  }

  loadMoreComments() {
    const currentLength = this.displayedComments.length;
    const remainingComments = this.comments.slice(currentLength, currentLength + 5);
    this.displayedComments = [...this.displayedComments, ...remainingComments];
  }
  private reviewId: number;
  /*selectReview(comment: any): void {
    this.reviewId = comment.id;
  }*/
  /*isCurrentUser(commentUser: any):  boolean  {
    return true;

  }*/

  openDeleteReviewDialog(comment: any) {

  }



  userRating: number = 0;

  accommodationId: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.accommodationId = params['id'];
      //const id=2;
      /*this.fetchOwnerDetails(id);
      this.fetchCommentsByOwnerId(this.ownerId);*/
      this.fetchCommentsByAccommodationId(this.accommodationId);
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
          id: review.id

        }));
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
          //this.fetchAverageRatingByOwnerId(this.ownerId);
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


  isCurrentUserResult: boolean = false;

  isCurrentUser(commentUser: any): boolean {
    return true
  }

}
