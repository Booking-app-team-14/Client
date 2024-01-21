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
    
    this.http.get('http://localhost:8080/api/userReports').subscribe({
      next: (data: any) => {
        this.userReports = data;

        for (let i = 0; i < this.userReports.length; i++) {
          const formatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });
          this.userReports[i].date = formatter.format(this.userReports[i].date);

          this.http.get('http://localhost:8080/api/users/' + this.userReports[i].reportingUserId + '/image-type-username', {responseType: 'text'}).subscribe({
            next: (data: any) => {
              this.userReports[i].reportingUserUsername = data.split(' | ')[0];
              this.userReports[i].reportingUserProfilePictureType = data.split(' | ')[1];
              this.userReports[i].reportingUserProfilePictureBytes = data.split(' | ')[2];
            },
            error: (err) => {
              console.error(err);
            }
          });

          this.http.get('http://localhost:8080/api/users/' + this.userReports[i].reportedUserId + '/image-type-username', {responseType: 'text'}).subscribe({
            next: (data: any) => {
              this.userReports[i].reportedUserUsername = data.split(' | ')[0];
              this.userReports[i].reportedUserProfilePictureType = data.split(' | ')[1];
              this.userReports[i].reportedUserProfilePictureBytes = data.split(' | ')[2];
            },
            error: (err) => {
              console.error(err);
            }
          });

        }

      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  blockReportedUser(reportId: number) {
    this.http.put('http://localhost:8080/api/userReports/block-user/' + reportId, {}).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
    alert("User successfully blocked!");
    this.deleteUserReportWithAnimation(reportId);
  }

  removeReport(reportId: number) {
    this.http.delete('http://localhost:8080/api/userReports/' + reportId).subscribe({
      next: (data: any) => {
        alert("Report ignored.");
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
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
