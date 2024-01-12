import {Component, ElementRef, Input, OnInit, signal, ViewChild} from '@angular/core';
import {ReservationService} from "./reservation.service";

import {AccommodationDetailsService} from "../accommodation-details.service";
import {UserService} from "../../login/user.service";

/*
interface Availability{
  id: number;
  startDate: string;
  endDate: string;
  specialPrice: number;
}

interface Reservation{
  accommodationId:number;
  ownerId:number;
  accommodationName:string,
  accommodationType:string,
  accommodationRating:number,
  pricePerNight:number;
  minGuests:number;
  maxGuests:number;
  cancellationDeadline:number;
  pricePerGuest:boolean;
}
*/
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit {
  @ViewChild('guestsInput') guestsInput!: ElementRef;
  @Input() availabilities: any[];
  private userAccount:any
  avail:any[]=[
    { id: 1, startDate: '2024-01-01', endDate: '2024-01-10', specialPrice: 120 },
    { id: 2, startDate: '2024-01-11', endDate: '2024-01-20', specialPrice: 140 },
    { id: 3, startDate: '2024-01-21', endDate: '2024-01-31', specialPrice: 125},
    { id: 4, startDate: '2024-02-01', endDate: '2024-02-10', specialPrice: 130 },
    { id: 5, startDate: '2024-02-11', endDate: '2024-02-20', specialPrice: 135 },
    { id: 6, startDate: '2024-02-21', endDate: '2024-02-29', specialPrice: 150 },
    { id: 7, startDate: '2024-03-01', endDate: '2024-03-15', specialPrice: 150 },
    { id: 8, startDate: '2024-03-16', endDate: '2024-03-31', specialPrice: 160 },
    { id: 9, startDate: '2024-04-01', endDate: '2024-04-10', specialPrice: 165 },
    { id: 10, startDate: '2024-04-11', endDate: '2024-04-20', specialPrice: 145 },
    { id: 11, startDate: '2024-04-21', endDate: '2024-04-30', specialPrice: 150 },
    { id: 12, startDate: '2024-12-20', endDate: '2024-12-31', specialPrice: 180 }]
  @Input() reservationRequirement: any;
  defaultCheckInDate: string;
  defaultCheckOutDate: string;
  totalPrice: number = this.avail[0].specialPrice;
  private guestId: number;
  availableDates: any[] = [];
  userRole: string ='';


  constructor( private reservationService: ReservationService,private accService: AccommodationDetailsService,  private userService: UserService) {
    this.userService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  ngOnInit(): void {
    console.log(this.reservationRequirement);

    //console.log('Availabilities received in ReservationComponent:', this.availabilities);
    const today = new Date();
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + 1);
    const twoDaysAfter = new Date();
    twoDaysAfter.setDate(today.getDate() + 2);
    this.reservationService.getGuestId().subscribe(
      (userId: number) => {

        this.guestId = userId;
        console.log(this.guestId);
      },
      (error) => {
        console.error('Error fetching user ID:', error);

      }
    );

    this.defaultCheckInDate = this.formatDate(nextDay);
    this.defaultCheckOutDate = this.formatDate(twoDaysAfter);
    this.avail.forEach((availability: any) => {
      const startDate = new Date(availability.startDate);
      const endDate = new Date(availability.endDate);

      while (startDate <= endDate) {
        this.availableDates.push({
          id: availability.id,
          startDate: this.formatDate(startDate),
          endDate: this.formatDate(endDate),
          specialPrice: availability.specialPrice
        });
        startDate.setDate(startDate.getDate() + 1);
      }
    });
    this.calculateTotalPrice();
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
    const checkIn = new Date(this.defaultCheckInDate);
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


    if (!this.isDateRangeAvailable(this.defaultCheckInDate, this.defaultCheckOutDate)) {
      alert('Selected date range is not available');

      this.defaultCheckOutDate = this.defaultCheckInDate;
    }

      this.calculateTotalPrice();
    }


  isDateRangeAvailable(startDate: string, endDate: string): boolean {
    const checkIn = new Date(startDate);
    const checkOut = new Date(endDate);

    while (checkIn <= checkOut) {
      if (!this.isDateAvailable(this.formatDate(checkIn))) {
        return false;
      }
      checkIn.setDate(checkIn.getDate() + 1);
    }

    return true;
  }

  isDateAvailable(dateToCheck: string): boolean {
    const checkDate = new Date(dateToCheck);

    return this.availableDates.some(dateRange => {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      return startDate <= checkDate && checkDate <= endDate;
    });
  }


  calculateTotalPrice(): void {
    const checkIn = new Date(this.defaultCheckInDate);
    const checkOut = new Date(this.defaultCheckOutDate);

    let totalPrice = 0;
    const oneDayInMillis = 24 * 60 * 60 * 1000;

    while (checkIn < checkOut) {
      const formattedDate = this.formatDate(checkIn);
      const foundAvailability = this.availableDates.find(date => date.startDate === formattedDate);

      if (foundAvailability) {
        if (foundAvailability.specialPrice !== null) {
          totalPrice += foundAvailability.specialPrice;
        } else {
          totalPrice += this.reservationRequirement.pricePerNight;
        }
      } else {
        totalPrice += this.reservationRequirement.pricePerNight; // Use default price if date not found
      }

      checkIn.setDate(checkIn.getDate() + 1);
    }

    if (this.reservationRequirement.pricePerGuest) {
      this.totalPrice = totalPrice;
    } else {
      this.totalPrice = totalPrice * this.guestsInput.nativeElement.value;
    }
  }



  onGuestsChange(): void {
    this.calculateTotalPrice();
  }

  makeReservation(): void {

    this.reservationService.getUserAccount(this.reservationRequirement.ownerId).subscribe(
      (userAccount: any) => {
        this.userAccount=userAccount;

        const reservationData = {
          startDate: this.defaultCheckInDate,
          endDate: this.defaultCheckOutDate,
          numberOfGuests: +this.guestsInput.nativeElement.value,
          requestStatus: 'SENT',
          totalPrice: this.totalPrice,
          accommodationId:this.reservationRequirement.accommodationId ,
          guestId: this.guestId,
          name: this.reservationRequirement.accommodationName,
          type: this.reservationRequirement.accommodationType,
          stars: this.reservationRequirement.accommodationRating,
          dateRequested: new Date().toLocaleDateString(),
          userUsername:this.userAccount.username,
          userImageType:/*this.userAccount.userImageType*/"png",
          userProfilePictureBytes:/*this.userAccount.userProfilePictureBytes*/"tdfhgjgh",
          imageType:/*this.userAccount.userImageType*/"png",
          mainPictureBytes:/*this.userAccount.userProfilePictureBytes*/"tdfhgjgh"};

        this.reservationService.sendReservation(reservationData).subscribe(
          (response) => {
            alert('Reservation request successful sent!');
          },
          (error) => {
            console.error('Reservation failed:', error);
            alert('Reservation request failed to send. The accommodation is taken in chosen date range!');
          }
        );
      },
      (error) => {
        console.error('Error fetching user account:', error);
        alert('Error fetching user account!');
      }
    );
  }
}
