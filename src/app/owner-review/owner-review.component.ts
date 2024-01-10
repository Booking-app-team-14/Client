import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {UserService} from "../login/user.service";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ReportModalComponent} from "../report-modal/report-modal.component";
import {Dialog} from "@angular/cdk/dialog";
import { ActivatedRoute } from '@angular/router';
import {filter, map, Observable, of, switchMap} from "rxjs";
import {DeleteReviewDialogComponent} from "../delete-review-dialog/delete-review-dialog.component";

@Component({
  selector: 'app-owner-review',
  templateUrl: './owner-review.component.html',
  styleUrl: './owner-review.component.css'
})
export class OwnerReviewComponent implements OnInit{
  userRole: string = '';

  user: {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string,
    avatarImageType: string,
    avatarBytes: string
  } = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    avatarImageType: '',
    avatarBytes: ''
  };
  userComment: any;
  averageRating: any;


  //userRating: any;
  commentDate1: any;
  commentDate2: any;

  comments = [

  ];

  displayedComments: any[];
  //private id: number;


  loadMoreComments() {
    const currentLength = this.displayedComments.length;
    const remainingComments = this.comments.slice(currentLength, currentLength + 4);
    this.displayedComments = [...this.displayedComments, ...remainingComments];
  }

  constructor(public dialog: MatDialog,private userService: UserService, private http: HttpClient, private route: ActivatedRoute) {
    this.displayedComments = this.comments.slice(0, 4);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ReportModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      //const id=2;
      this.fetchOwnerDetails(id);
      this.fetchCommentsByOwnerId(this.ownerId);
      this.fetchAverageRatingByOwnerId(this.ownerId);
    });
    }

  private ownerId: number;

  fetchOwnerDetails(id: number): void {
    this.http.get(`http://localhost:8080/api/accommodations/${id}`).subscribe({
      next: (accommodation: any) => {
        this.ownerId = accommodation.owner_Id;
        this.http.get(`http://localhost:8080/api/owners/${this.ownerId}`).subscribe({
          next: (userDTO: any) => {
            this.user.firstName = userDTO.firstName;
            this.user.lastName = userDTO.lastName;
            this.user.email = userDTO.username;
            this.user.address = userDTO.address;
            this.user.phone = userDTO.phoneNumber;
            this.user.avatarImageType = userDTO.profilePictureType;
            this.user.avatarBytes = userDTO.profilePictureBytes;
          },
          error: (err) => {
            console.error(err);
            //alert("Error while fetching user data!");
          }
        });
      },
      error: (err) => {
        console.error(err);
        //alert("Error while fetching accommodation data!");
      }
    });
  }

  fetchCommentsByOwnerId(ownerId: number): void {

    this.http.get(`http://localhost:8080/api/reviews/owner/${ownerId}`).subscribe(
      (reviews: any[]) => {
        this.comments = reviews.map(review => ({
          name: review.sender.firstName + " " + review.sender.lastName,
          sentAt: review.timestamp,
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


  /*filledStars: number = 0;
  updateFilledStars(rating: number): void {
    this.filledStars = rating;
  }*/
  private reviewId: number;

  selectReview(comment: any): void {
    this.reviewId = comment.id;
  }


  userRating: number = 0;

  onStarClick(rating: number) {
    this.userRating = rating;
  }

  submitRating() {
    const reviewDTO = {
      comment: this.userComment,
      rating: this.userRating,
      recipientId: this.ownerId
    };

    this.http.post('http://localhost:8080/api/reviews', reviewDTO).subscribe({
      next: (response: any) => {
        console.log('Review submitted successfully!', response);
        alert('Review submitted successfully:')
        this.fetchCommentsByOwnerId(this.ownerId);
        this.fetchAverageRatingByOwnerId(this.ownerId);
      },
      error: (err) => {
        console.error('Error while submitting review:', err);
        alert('Error while submitting review!')
      }
    });
  }

  openDeleteReviewDialog(comment: any): void {
    const dialogRef = this.dialog.open(DeleteReviewDialogComponent, {
      data: { commentId: comment.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteReview(comment.id);
      }
    });
  }

  deleteReview(reviewId: number): void {
    this.http.delete(`http://localhost:8080/api/reviews/${reviewId}`).subscribe({
      next: () => {
        console.log('Review deleted successfully!');
        alert('Review deleted successfully!')
        this.fetchCommentsByOwnerId(this.ownerId);
        this.fetchAverageRatingByOwnerId(this.ownerId);

      },
      error: (err) => {
        console.error('Error deleting review:', err);
        alert('Error deleting review!');
      }
    });
  }
  fetchAverageRatingByOwnerId(ownerId: number): void {
    this.http.get<number>(`http://localhost:8080/api/reviews/owner/${ownerId}/average-rating`).subscribe(
      (averageRating) => {
        this.averageRating = averageRating;
      },
      (error) => {
        console.error('Error fetching average rating for owner', error);
      }
    );
  }

}
