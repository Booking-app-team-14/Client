import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {UserService} from "../login/user.service";

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {
  userRole: string = '';
  ownerId: number;
  //showReport: boolean = false;
  reportReason: string = '';
isReported: boolean;
  user = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    avatarImageType: '',
    avatarBytes: ''
  };

  comments: any[] = [];

  displayedComments: any[] = [];

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.userService.userRole$.subscribe(role => {
      this.userRole = role;

      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.http.get(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe({
        next: (userId: any) => {
          this.ownerId = userId;
          this.fetchCommentsByOwnerId(this.ownerId);
          this.http.get(`http://localhost:8080/api/users/${userId}`).subscribe({
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
              alert("Error while fetching user data!");
            }
          });
        },
        error: (err) => {
          console.error(err);
          alert("Error while fetching user data from token!");
        }
      });
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
          rating: review.rating,
          id: review.id,
            isReported: review.reported
        }));

        this.displayedComments = this.comments.slice(0, 4);
      },
      (error) => {
        console.error(error);
        alert("Error while fetching review data!");
      }
    );
  }

  loadMoreComments() {
    const currentLength = this.displayedComments.length;
    const remainingComments = this.comments.slice(currentLength, currentLength + 4);
    this.displayedComments = [...this.displayedComments, ...remainingComments];
  }

  selectReview(comment: any) {

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
      reviewId: this.selectedReview.id,
      reason: this.selectedReview.reportReason
    };

    this.http.post('http://localhost:8080/api/ownerReviewReports/reviews/report', reportDTO)
      .subscribe(
        (response: any) => {
          // Handle successful response
          this.isReviewReported=true;
          this.selectedReview.showReport = false;
          this.selectedReview.showButton=true;
          this.selectedReview.reportReason = '';
          this.selectedReview = null;
          alert("Successfully reported review!");
        },
        (error) => {
          // Handle error
          console.error(error);
        }
      );
  }

  isReviewReported: boolean = false ;

    checkIfReviewReported(reviewId: number) {
        this.http.get<boolean>(`http://localhost:8080/api/ownerReviewReports/reviews/isReported/${reviewId}`).subscribe(
            (isReported) => {
                this.isReviewReported = isReported;
            },
            (error) => {
                console.error('Error checking if review reported:', error);
            }
        );
    }

}
