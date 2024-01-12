import {Component, OnInit, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReservationService} from "../accommodation-details/reservation/reservation.service";
import { MatDialog } from '@angular/material/dialog';
import {CancelDialogComponent} from "../shared/cancel-dialog/cancel-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrl: './guest-reservations.component.css'
})
export class GuestReservationsComponent implements OnInit{

  type: string = "sent";
  ownerId:number;
  reservations: any[];
  private id: number;
  accommodationNameFilter: string = '';
  startDateFilter: Date;
  endDateFilter: Date;
  minEndDate: string;


  constructor(private http: HttpClient,private router: Router,private reservationService:ReservationService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }
  openCancelDialog(reservationId:number): void {
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      width: '400px',
      data: { reservationId: reservationId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {

        console.log(reservationId);
        this.sendCancelRequest(reservationId);
      }


      dialogRef.close();
    });
  }

  sendCancelRequest(reservationId: number): void {
    const apiUrl = `http://localhost:8080/api/requests/${reservationId}`;

    this.http.delete(apiUrl).subscribe(
      () => {
        this.snackBar.open('Request successfully canceled!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
        });
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }


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



  ngOnInit(): void {
    this.reservationService.getGuestId().subscribe(
      (userId: number) => {
        this.id = userId;
        this.fetchReservations();
      },
      (error) => {
        console.error('Error fetching user ID:', error);
      }
    );
  }

  fetchReservations(): void {
    this.http.get(`http://localhost:8080/api/requests/guest/${this.id}`).subscribe({
      next: (reservations: any[]) => {
        this.reservations = reservations;

        for (let i = 0; i < this.reservations.length; i++) {
          console.log(this.reservations[i].id);
          if(this.reservations[i].requestStatus == "SENT") this.reservations[i].requestStatus = "sent";
          else if(this.reservations[i].requestStatus == "APPROVED") this.reservations[i].requestStatus = "approved";
          else if(this.reservations[i].requestStatus == "DECLINED") this.reservations[i].requestStatus = "declined";
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
      }
    });
  }

  getDetailsForReservations(): void {
    for (let i = 0; i < this.reservations.length; i++) {
      this.http.get(`http://localhost:8080/api/accommodations/${this.reservations[i].accommodationId}`).subscribe({
        next: (accommodation: any) => {
          this.reservations[i].accommodation = accommodation;
          this.ownerId=this.reservations[i].accommodation.owner_Id;
          console.log(this.ownerId);
          this.http.get(`http://localhost:8080/api/users/${this.ownerId}`).subscribe({

            next: (user: any) => {
              this.reservations[i].user = user;
            },
            error: (err) => {
              console.error(err);
              alert("Error while fetching user details!");
            }
          });
        },
        error: (err) => {
          console.error(err);
          alert("Error while fetching accommodation details!");
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
      this.filterReservations();
    } else {
      this.filterReservations();
    }
  }

  clearFilters(): void {
    this.accommodationNameFilter = '';
    this.startDateFilter = null;
    this.fetchReservations();
  }

  filterReservations(): void {
    this.reservations = this.reservations.filter((reservation) => {

      if (this.type && reservation.requestStatus !== this.type) {
        return false;
      }


      if (this.startDateFilter && new Date(reservation.startDate) < new Date(this.startDateFilter)) {
        return false;
      }

      return !(this.accommodationNameFilter && !reservation.accommodation.name.toLowerCase().includes(this.accommodationNameFilter.toLowerCase()));

    });
  }

}
