import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationDetailsService } from './accommodation-details.service';
import {AccommodationDTO, AmenityDTO, AvailabilityDTO} from '../shared/accommodation-details.model';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {
  accommodation: AccommodationDTO | undefined;
  availableDates: AvailabilityDTO[] = [];
  images: { imageSrc: string, imageAlt: string }[] = [];
  places: any;
  location: any;
  reservationRequirements: any;
  amenitiesList: AmenityDTO[] = [];
  owner: { name: string, picture: string } = { name: "Nick Jefferson", picture: 'assets/BG.png' };
  //owner: { name: any, picture: string };
  //ownerId: { ownerId: number };
  currentUser: any;
  //owner: OwnerDTO | undefined;



  userAccount: any;


  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationDetailsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.accommodationService.getAccommodationById(id).subscribe(
        (data: AccommodationDTO) => {
          this.accommodation = data;
          console.log(this.accommodation);
          /*this.accommodationService.getOwnerByOwnerId(this.accommodation.owner_Id).subscribe(
              (ownerData: OwnerDTO) => {
                this.owner = ownerData;
                console.log('Owner details:', this.owner);
              },
              (ownerError) => {
                console.error('Error fetching owner details:', ownerError);
              }
          );*/
          this.images = this.accommodation.images.map((imageSrc: string) => {
            return {
              imageSrc: imageSrc,
              imageAlt: 'IMAGE'
            };
          });

          this.amenitiesList = this.accommodation.amenities.map((amenity: any) => {
            return {
              id: amenity.id,
              name: amenity.name,
              description: amenity.description,
              icon: amenity.icon,
              iconType:amenity.iconType,
              iconBytes: amenity.iconBytes
            };
          });

          this.availableDates = this.accommodation.availability.map((availability:AvailabilityDTO)=>{
            return{
              id: availability.id,
              startDate: availability.startDate,
              endDate: availability.endDate,
              specialPrice: availability.specialPrice,
            }
          });

          this.reservationRequirements = {
            accommodationId:this.accommodation.id,
            ownerId:this.accommodation.owner_Id,
            accommodationName:this.accommodation.name,
            accommodationType:this.accommodation.type,
            accommodationRating:this.accommodation.rating,
            pricePerNight:this.accommodation.pricePerNight,
            minGuests:this.accommodation.minNumberOfGuests,
            maxGuests:this.accommodation.maxNumberOfGuests,
            pricePerGuest:this.accommodation.pricePerGuest,
            cancellationDeadline:this.accommodation.cancellationDeadline,
          };
          console.log(this.reservationRequirements);

          this.places = {
            ownerId:this.accommodation.owner_Id,
            name: this.accommodation.name,
            address: this.accommodation.location.address,
            description: this.accommodation.description,
            id: this.accommodation.id,
          };


          this.availableDates=[
            { id: 1, startDate: '2024-01-01', endDate: '2024-01-10', specialPrice: 120 },
            { id: 2, startDate: '2024-01-11', endDate: '2024-01-20', specialPrice: 140 },
            { id: 3, startDate: '2024-01-21', endDate: '2024-01-31', specialPrice: null},
            { id: 4, startDate: '2024-02-01', endDate: '2024-02-10', specialPrice: 130 },
            { id: 5, startDate: '2024-02-11', endDate: '2024-02-20', specialPrice: 135 },
            { id: 6, startDate: '2024-02-21', endDate: '2024-02-28', specialPrice: null },
            { id: 7, startDate: '2024-03-01', endDate: '2024-03-15', specialPrice: 150 },
            { id: 8, startDate: '2024-03-16', endDate: '2024-03-31', specialPrice: null },
            { id: 9, startDate: '2024-04-01', endDate: '2024-04-10', specialPrice: null },
            { id: 10, startDate: '2024-04-11', endDate: '2024-04-20', specialPrice: 145 },
            { id: 11, startDate: '2024-04-21', endDate: '2024-04-30', specialPrice: 150 },
            { id: 12, startDate: '2024-12-20', endDate: '2024-12-31', specialPrice: 180 }
          ];

          this.location = {
            address: this.accommodation.location.address,
            city: this.accommodation.location.city,
            country: this.accommodation.location.country
          };
        },
        (error) => {
          console.error('Error fetching accommodation details:', error);
        }
      );
    });
  }
}
