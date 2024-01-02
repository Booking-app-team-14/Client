import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {UserService} from "../login/user.service";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ReportModalComponent} from "../report-modal/report-modal.component";
import {Dialog} from "@angular/cdk/dialog";
import { ActivatedRoute } from '@angular/router';

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
    });


    // Uzmi trenutne parametre iz URL-a
    //const accommodationId = +this.route.snapshot.paramMap.get('id');

     /* this.route.params.subscribe(params => {
        const accommodationId = +params['id'];  // '+' pretvara string u broj
        this.fetchOwnerDetails(accommodationId);
      });*/
      //this.fetchOwnerDetails(accommodationId);
    }

  fetchOwnerDetails(id: number): void {
    this.http.get(`http://localhost:8080/api/accommodations/${id}`).subscribe({
      next: (accommodation: any) => {
        const ownerId = accommodation.owner_Id;
        this.http.get(`http://localhost:8080/api/accommodations/owners/${ownerId}`).subscribe({
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
        alert("Error while fetching accommodation data!");
      }
    });
  }

  submitRating() {

  }
}
