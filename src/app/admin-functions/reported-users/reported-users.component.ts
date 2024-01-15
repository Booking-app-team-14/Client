import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reported-users',
  templateUrl: './reported-users.component.html',
  styleUrl: './reported-users.component.css'
})
export class ReportedUsersComponent {

  userReports: any[];

  constructor(private http: HttpClient, private _router: Router) {
    this.userReports = [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@gmail.com",
        reason: "Spam",
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "2021-03-01",
        ownerUsername: "janedoe",
        timestamp: "2021-03-01",
        guestUsername: "johndoe"
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "janedoe@gmail.com",
        reason: "Spamsdfsdfds sfdsdfdsfdsfsdfsdfdsfssdfsdfdsfsdfdfdsfsdfdsfsdfdsfsdfdsfsdfdsfsdfdsfsdfdsfsdfdsfsdfdsfsdfdsfsdfsdfdsfsdfsdfsd\ndsfsdfdsfsdfsddfssdf\nsdfsdfsdfdsfsdfdsfsdfsddfssdf\nsdfsdfsdfdsfsdfdsfsdfsddfssdf\nsdfsdfsdfdsfsdfdsfsdfsddfssdf\nsdfsdfsdfdsfsdfdsfsdfsddfssdf\nsdfsdfsdfdsfsdfdsfsdfsddfssdf\nsdfsdfsdfdsfsdfdsfsdfsddfssdf\nsdfsdfsdfdsfsdfdsfsdfsddfssdf\nsdfsdfsdfdsfsdfdsfsdfsddfssdf\nsdfsdfsdf",
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "2021-03-01",
        ownerUsername: "janedoe",
        timestamp: "2021-03-01",
        guestUsername: "johndoe"
      }
    ];
  }

  blockReportedUser(reportId: number) {
    // TODO: Block user
    this.deleteUserReportWithAnimation(reportId);
  }

  removeReport(reportId: number) {
    this.deleteUserReportWithAnimation(reportId);
  }

  deleteUserReportWithAnimation(reportId: number) {
    const review = document.getElementById("card-" + reportId);
    review.classList.add("fade-out");
    setTimeout(() => {
      for (let i = 0; i < this.userReports.length; i++) {
        if(this.userReports[i].id == reportId) {
          this.userReports.splice(i, 1);
          break;
        }
      }
    }, 700);
  }

}
