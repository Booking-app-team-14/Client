import {Component, OnInit, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReservationService} from "../accommodation-details/reservation/reservation.service";
import { MatDialog } from '@angular/material/dialog';
import {CancelDialogComponent} from "../shared/cancel-dialog/cancel-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrl: './guest-reservations.component.css'
})
export class GuestReservationsComponent implements OnInit{

  type: string = "sent";
  ownerId:number;
  ownerIds: number[] = [];
  reservations: any[];
  filteredReservations: any[];
  private id: number;
  accommodationNameFilter: string = '';
  startDateFilter: Date;
  endDateFilter: Date;
  minEndDate: string;
  isUserReported: boolean


  constructor(private http: HttpClient,private router: Router,private reservationService:ReservationService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }
  openCancelDialog(reservationId:number, guestId:number): void {
    if(confirm("Are you sure you want to cancel this reservation?")) {
      this.sendCancelRequest(reservationId, guestId);
    }
  }

  sendCancelRequest(reservationId: number, guestId: number): void {
    const deleteUrl = `http://localhost:8080/api/requests/${reservationId}`;

    this.http.delete(deleteUrl).subscribe(
      () => {
        this.fetchReservations();
      },
      (deleteError) => {
        alert('Successfully canceled!');
        this.fetchReservations();
      }
    );
  }

  ngOnInit(): void {
    this.reservationService.getGuestId().subscribe(
        (userId: number) => {
          this.id = userId;
           //this.checkIfUserReported(this.ownerId);
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
          else if(this.reservations[i].requestStatus == "ACCEPTED") this.reservations[i].requestStatus = "approved";
          else if(this.reservations[i].requestStatus == "DECLINED") this.reservations[i].requestStatus = "declined";
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
      }
    });
  }

  getDetailsForReservations(): void {
    for (let i = 0; i < this.reservations.length; i++) {
      this.http.get(`http://localhost:8080/api/accommodations/${this.reservations[i].accommodationId}`).subscribe({
        next: (accommodation: any) => {
          this.reservations[i].accommodation = accommodation;
          this.ownerId=this.reservations[i].accommodation.owner_Id;
          //this.reservations[i].isUserReported=this.checkIfUserReported(this.reservations[i].accommodation.owner_Id);

          this.checkIfUserReported(this.reservations[i].accommodation.owner_Id).subscribe(
            (isReported) => {
              this.reservations[i].isUserReported = isReported;
            },
            (error) => {
              console.error('Error checking if user reported:', error);
            }
          );
          if (!this.ownerIds.includes(this.ownerId)) this.ownerIds.push(this.ownerId);
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


  checkIfUserReported(userId: number): Observable<boolean> {

    return this.http.get<boolean>(`http://localhost:8080/api/userReports/isReported/${userId}`);
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

  isCancellationDisabled(startDate: string, cancellationDeadline: number): boolean {
    const today = new Date();
    const reservationStartDate = new Date(startDate);
    const deadlineDate = new Date(reservationStartDate.getTime() - cancellationDeadline * 24 * 60 * 60 * 1000);
    return today > deadlineDate;
  }

  selectedReview: any = null;
  showButton: boolean=true;
  showReportInput(reservation: any) {
    this.reservations.forEach(reservation => {
      reservation.showReport = false;
    });

    reservation.showReport = true;
    this.selectedReview = reservation;
  }

  submitReport() {
    console.log("OWNE IDS:", this.ownerIds);
    const reportDTO = {
      // reportedUserId: this.ownerId,
      reportedUserId: this.ownerIds[this.reservations.indexOf(this.selectedReview)],
      description: this.selectedReview.reportReason
    };
    this.http.post('http://localhost:8080/api/userReports/report', reportDTO)
        .subscribe(
            (response: any) => {
              //console.log(this.reservations[this.selectedReview.id].accommodation.id);
              this.getDetailsForReservations();
              //this.isUserReported=true;
              this.selectedReview.showReport = false;
              this.selectedReview.showButton=true;
              this.selectedReview.reportReason = '';

            },
            (error) => {
              //console.log(this.reservations[this.selectedReview.id] );
               this.getDetailsForReservations();
              this.selectedReview.showReport = false;
              this.selectedReview.showButton=true;
              this.selectedReview.reportReason = '';
               alert("Successfully reported review! "  );

            }
        );
  }


  isReservationPasted(endDate: string ): boolean {
    const today = new Date();
    const reservationEndDate = new Date(endDate);
    const deadlineDate = new Date(reservationEndDate.getTime() );
    return today >= deadlineDate;
  }

}
