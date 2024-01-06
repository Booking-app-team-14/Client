import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReservationService} from "../accommodation-details/reservation/reservation.service";


@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrl: './guest-reservations.component.css'
})
export class GuestReservationsComponent implements OnInit{

  type: string = "fiber_sent";

  reservations: any[];
  private id: number;
  private userId:number;

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
    this.http.get(`http://localhost:8080/api/requests/${this.id}`).subscribe({
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
/*
  approve(id: number) {
    this.http.put('http://localhost:8080/api/accommodations/requests/' + id, {}).subscribe({
      next: (message: any) => {
        console.log(message);
      },
      error: (err) => {
        console.error(err);
        alert("Error while sending the PUT request!");
      }
    });
    this.addCardClass(id, "approved");
    this.animateCard(id);
    setTimeout(() => this.deleteCard(id), 1400);
  }

  reject(id: number) {
    this.http.delete('http://localhost:8080/api/accommodations/requests/' + id).subscribe({
      next: (message: any) => {
        console.log(message);
      },
      error: (err) => {
        console.error(err);
        alert("Error while sending the DELETE request!");
      }
    });
    this.addCardClass(id, "rejected");
    this.animateCard(id);
    setTimeout(() => this.deleteCard(id), 1400);
  }
*/
  addCardClass(id: number, className: string) {
    let card = document.getElementById(`card-${id}`);
    if(card) {
      card.classList.add(className);
    }
  }

  deleteCard(id: number) {
    let card = document.getElementById(`card-${id}`);
    if(card) {
      card.remove();
      let index = this.reservations.findIndex(obj => obj.id === id);
      if (index !== -1) {
        this.reservations.splice(index, 1);
      }
    }
  }

  animateCard(id: number) {
    let card = document.getElementById(`card-${id}`);
    if(card) {
      setTimeout(() => {
        card.style.height = `${card.offsetHeight}px`;
        window.getComputedStyle(card).height;
        card.style.height = '0';
        card.style.padding = '0';
        card.style.marginBottom = '0';
      }, 600);
    }
  }

  viewDetails(id: number) {
    // TODO: open accommodation details page
    alert("Accommodation " + id + " details!");
  }
}
