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
  filteredReservations: any[];
  //private id: number;
  private username:string;
  accommodationNameFilter: string = '';
  startDateFilter: Date;
  endDateFilter: Date;
  minEndDate: string;

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
          else if(this.reservations[i].requestStatus == "ACCEPTED") this.reservations[i].requestStatus = "fiber_approved";
          else if(this.reservations[i].requestStatus == "DECLINED") this.reservations[i].requestStatus = "fiber_declined";
          const date = new Date(parseInt(this.reservations[i].dateRequested) * 1000);
          const formatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });
          this.reservations[i].date = formatter.format(date);
          this.getDetailsForReservations();
          this.filteredReservations = this.reservations;
          this.applyFilters();
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

  applyAccommodationNameFilter(): void {
    if (this.accommodationNameFilter) {
      const filterValue = this.accommodationNameFilter.toLowerCase();
      this.filteredReservations = this.reservations.filter(reservation =>
        reservation.accommodation.name.toLowerCase().includes(filterValue)
      );
    } else {
      this.filteredReservations = this.reservations;
    }
  }

  updateEndDateMin(): void {
    if (this.startDateFilter) {
      const minDate = new Date(this.startDateFilter);
      minDate.setDate(minDate.getDate() + 1);
      this.minEndDate = minDate.toISOString().split('T')[0];
    } else {
      this.minEndDate = null;
    }
  }

  filterReservations(): void {
    this.applyAccommodationNameFilter();
    this.filteredReservations = this.filteredReservations.filter((reservation) => {
      // Provera za requestStatus
      // if (this.type && reservation.requestStatus !== this.type) {
      //   return false;
      // }
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

  applyFilters(): void {
    this.filterReservations();
  }

  approve(reservationId: number) {
    this.http.put(`http://localhost:8080/api/requests/approve/${reservationId}`,{}).subscribe({
      next: () => {
        alert("Request approved!");
        this.fetchReservations();
      },
      error: (err) => {
        alert("Request approved!");
        this.fetchReservations();
        console.error(err);
      }
    });
  }

  reject(reservationId: number) {  
    this.http.put(`http://localhost:8080/api/requests/reject/${reservationId}`, {}).subscribe({
      next: () => {
        alert("Request rejected!");
        this.fetchReservations();
      },
      error: (err) => {
        alert("Request rejected!");
        this.fetchReservations();
        console.error(err);
      }
    });
  }

}
