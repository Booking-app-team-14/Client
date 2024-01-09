import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReservationService} from "../accommodation-details/reservation/reservation.service";

@Component({
  selector: 'app-owner-reservations',
  templateUrl: './owner-reservations.component.html',
  styleUrl: './owner-reservations.component.css'
})
export class OwnerReservationsComponent {

  type: string = "fiber_sent";

  reservations: any[];
  //private id: number;
  private username:string;
  accommodationNameFilter: string = '';
  startDateFilter: Date;
  endDateFilter: Date;
  minEndDate: string;

  getPostedAgo(date: Date) {
    const now = Date.now();
    const difference = now - date.getTime();
    const seconds = difference / 1000;
    if (seconds < 60) {
      return "just now";
    } else if (seconds < 60 * 60) {
      return Math.floor(seconds / 60) + " minutes ago";
    } else if (seconds < 24 * 60 * 60) {
      return Math.floor(seconds / (60 * 60)) + " hours ago";
    } else {
      return Math.floor(seconds / (24 * 60 * 60)) + " days ago";
    }
  }

  constructor(private http: HttpClient,private reservationService:ReservationService) {
  }

  ngOnInit(): void {
    this.reservationService.getOwnerInfo().subscribe(
      (userInfo: string) => {
        //this.id = userInfo.id;
        this.username = userInfo;
        this.fetchReservations();
      },
      (error) => {
        console.error('Error fetching user USERNAME:', error);
      }
    );
  }

  fetchReservations(): void {
    this.http.get(`http://localhost:8080/api/requests/owner/${this.username}`).subscribe({
      next: (reservations: any[]) => {
        this.reservations = reservations;
        for (let i = 0; i < this.reservations.length; i++) {
          if(this.reservations[i].requestStatus == "SENT") this.reservations[i].requestStatus = "fiber_sent";
          else if(this.reservations[i].requestStatus == "APPROVED") this.reservations[i].requestStatus = "fiber_approved";
          else if(this.reservations[i].requestStatus == "DECLINED") this.reservations[i].requestStatus = "fiber_declined";
          const date = new Date(parseInt(this.reservations[i].dateRequested) * 1000);
          const formatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });
          this.reservations[i].date = formatter.format(date);
          this.reservations[i].postedAgo = this.getPostedAgo(date);
          this.getDetailsForReservations();
        }

      },
      error: (err) => {
        console.error(err);
        alert("Error while fetching reservations requests!");
      }
    });
  }

  getDetailsForReservations(): void {
    for (let i = 0; i < this.reservations.length; i++) {
      this.http.get(`http://localhost:8080/api/accommodations/${this.reservations[i].accommodationId}`).subscribe({
        next: (accommodation: any) => {
          this.reservations[i].accommodation = accommodation;
          console.log( this.reservations[i].accommodation);
        },
        error: (err) => {
          console.error(err);
          alert("Error while fetching accommodation details!");
        }
      });

      this.http.get(`http://localhost:8080/api/users/${this.reservations[i].guestId}`).subscribe({
        next: (user: any) => {
          this.reservations[i].user = user;
        },
        error: (err) => {
          console.error(err);
          alert("Error while fetching user details!");
        }
      });
    }
  }


  applyAccommodationFilter(): void {
    if (this.accommodationNameFilter) {
      const filterValue = this.accommodationNameFilter.toLowerCase();
      this.reservations = this.reservations.filter(reservation =>
        reservation.accommodation.name.toLowerCase().includes(filterValue)
      );
    } else {
      this.fetchReservations();
    }
  }

  updateEndDateMin(): void {
    if (this.startDateFilter) {
      const minDate = new Date(this.startDateFilter);
      minDate.setDate(minDate.getDate() + 1);
      this.minEndDate = minDate.toISOString().split('T')[0];
      this.filterReservations();
    } else {
      this.minEndDate = null;
      this.filterReservations();
    }
  }
  filterReservations(): void {
    this.reservations = this.reservations.filter((reservation) => {
      // Provera za requestStatus
      if (this.type && reservation.requestStatus !== this.type) {
        return false;
      }

      // Provera za startDateFilter
      if (this.startDateFilter && new Date(reservation.startDate) < new Date(this.startDateFilter)) {
        return false;
      }

      // Provera za endDateFilter
      if (this.endDateFilter && new Date(reservation.endDate) > new Date(this.endDateFilter)) {
        return false;
      }

      // Provera za accommodationNameFilter
      if (this.accommodationNameFilter && !reservation.accommodation.name.toLowerCase().includes(this.accommodationNameFilter.toLowerCase())) {
        return false;
      }

      // Provera za opseg datuma
      if (this.startDateFilter && this.endDateFilter) {
        const resStartDate = new Date(reservation.startDate);
        const resEndDate = new Date(reservation.endDate);
        const startRange = new Date(this.startDateFilter);
        const endRange = new Date(this.endDateFilter);
        if (resStartDate < startRange || resEndDate > endRange) {
          return false;
        }
      }

      return true;
    });
  }
}
