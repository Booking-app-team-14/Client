import {AfterViewChecked, Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {UserService} from "../login/user.service";

@Component({
  selector: 'app-owner-review',
  templateUrl: './owner-review.component.html',
  styleUrl: './owner-review.component.css'
})
export class OwnerReviewComponent{
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
  userRating: any;
  commentDate1: any;
  commentDate2: any;
  comments = [
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'We are satisfied with the service of the host and the entire hotel. The whole staff is very friendly. We will be back again!\n' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' }
  ];

  displayedComments: any[];


  loadMoreComments() {
    const currentLength = this.displayedComments.length;
    const remainingComments = this.comments.slice(currentLength, currentLength + 4);
    this.displayedComments = [...this.displayedComments, ...remainingComments];
  }

  constructor(private userService: UserService, private http: HttpClient) {
    this.displayedComments = this.comments.slice(0, 4);
  }

  ngOnInit(): void {
    this.userService.userRole$.subscribe(role => {
      this.userRole = role;
    });

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe({
      next: (userId: any) => {
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

  }

  submitRating() {

  }

  cancel() {

  }
}
