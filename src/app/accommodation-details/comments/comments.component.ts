import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  comments = [
   { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
    { name: 'John Doe', sentAt: new Date(), image: 'assets/BG.jpg', commentText: 'This is a comment.' },
  ];

  displayedComments: any[];

  constructor() {
    this.displayedComments = this.comments.slice(0, 10); //
  }

  loadMoreComments() {
    const currentLength = this.displayedComments.length;
    const remainingComments = this.comments.slice(currentLength, currentLength + 5);
    this.displayedComments = [...this.displayedComments, ...remainingComments];
  }
}
