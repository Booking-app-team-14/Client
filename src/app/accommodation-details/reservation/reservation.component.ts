import {Component, ElementRef, Input, signal, ViewChild} from '@angular/core';
import {ReservationService} from "./reservation.service";
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {AccommodationDetailsService} from "../accommodation-details.service";

interface Availability{
  id: number;
  startDate: string;
  endDate: string;
  specialPrice: number;
}
interface Reservation{
  accommodationId:number;
  pricePerNight:number;
  minGuests:number;
  maxGuests:number;
  cancellationDeadline:number;
  pricePerGuest:boolean;
}
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  @ViewChild('guestsInput') guestsInput!: ElementRef;
  @Input() availabilities: Availability[];
  @Input() reservationRequirements: Reservation;
  defaultCheckInDate: string;
  defaultCheckOutDate: string;
  totalPrice: number = 0;
  private userId: number;


  constructor( private reservationService: ReservationService,private accService: AccommodationDetailsService) {
    const today = new Date();
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + 1);
    const twoDaysAfter = new Date();
    twoDaysAfter.setDate(today.getDate() + 2);


    this.defaultCheckInDate = this.formatDate(nextDay);
    this.defaultCheckOutDate = this.formatDate(twoDaysAfter);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  getTodayDate(): string {
    return this.formatDate(new Date());
  }

  updateCheckOutMinDate(): void {
    this.defaultCheckOutDate = this.defaultCheckInDate;

  }

  validateDates(): void {
    const checkIn = new Date(this.defaultCheckInDate);
    const checkOut = new Date(this.defaultCheckOutDate);
    //console.log(this.availabilities);
    if (checkOut < checkIn || checkOut.getTime() === checkIn.getTime()) {
      alert('Check-out date should be after the check-in date');
      this.defaultCheckOutDate = this.defaultCheckInDate;
    }

    const oneDayInMillis = 24 * 60 * 60 * 1000;
    if ((checkOut.getTime() - checkIn.getTime()) < oneDayInMillis) {
      alert('Minimum reservation duration is one night');
      this.defaultCheckOutDate = this.defaultCheckInDate;
    }

      this.calculateTotalPrice();
    }

  calculateTotalPrice(): void {
    const checkIn = new Date(this.defaultCheckInDate);
    const checkOut = new Date(this.defaultCheckOutDate);

    const oneDayInMillis = 24 * 60 * 60 * 1000;
    const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / oneDayInMillis);

    if (this.reservationRequirements.pricePerGuest)
    this.totalPrice = nights * this.reservationRequirements.pricePerNight;
    else
      this.totalPrice = nights * this.reservationRequirements.pricePerNight * this.guestsInput.nativeElement.value;
  }

  onGuestsChange(): void {
    this.calculateTotalPrice();
  }

  makeReservation(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.accService.getUserById(currentUser).subscribe(
      (userData: any) => {
        this.userId = userData;
        console.log('User ID:', this.userId);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
    console.log(this.reservationRequirements);
    const reservationData = {
      startDate: this.defaultCheckInDate,
      endDate: this.defaultCheckOutDate,
      numberOfGuests: +this.guestsInput.nativeElement.value,
      requestStatus: 'SENT',
      totalPrice: this.totalPrice,
      accommodationId:this.reservationRequirements.accommodationId ,
      guestId: 17
    };

    this.reservationService.sendReservation(reservationData).subscribe(
      (response) => {
        alert('Reservation successful!');
      },
      (error) => {
        error('Reservation failed:', error);
      }
    );
  }
}
