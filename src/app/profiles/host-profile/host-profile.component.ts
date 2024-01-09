import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.component.html',
  styleUrl: './host-profile.component.css'
})
export class HostProfileComponent {

  @Input()
  user: {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string,
    avatarImageType: string,
    avatarBytes: string
  };

  myAccommodations: any[];

  constructor(private http: HttpClient, private _router: Router) {

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe({
          next: (userId: any) => {
            this.http.get('http://localhost:8080/api/accommodations/owners/'+ userId).subscribe({
              next: (accommodations: any[]) => {
                this.myAccommodations = accommodations;
              },
              error: (err) => {
                console.error(err);
                alert("Error while fetching owner accommodations!");
              }
            });
          },
          error: (err) => {
            console.error(err);
            alert("Error while fetching user data from token!");
          }
    });

  }

  goToAccommodationPage(id: number) {
    this._router.navigateByUrl('search/details/' + id);
  }

  editAccommodationDetails(id: number) {
    this._router.navigateByUrl('update-accommodation/' + id);
  }

}
