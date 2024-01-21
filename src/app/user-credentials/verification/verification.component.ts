import { Component, OnInit } from '@angular/core';
import {VerificationService} from "./verification.service";// Replace with the correct path
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})

export class VerificationComponent implements OnInit {
  userId: string | null;

  constructor(private verificationService: VerificationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  activateAccount(): void {
    if (this.userId) {
      // Assuming userId should be a number for the service
      const userIdNumber: number = Number(this.userId);

      // Call the service method
      this.verificationService.activateAccount(userIdNumber).subscribe(
        (response) => {
          console.log('Activation successful:', response);
          // Redirect the user to the login page or the main page
        },
        (error) => {
          console.error('Activation failed:', error);
          // Handle the error, show a message to the user, or redirect to an appropriate page
        }
      );
    }
  }
}
