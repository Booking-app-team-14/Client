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
  accommodation: any | undefined;
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
        (data: any) => {
          this.accommodation = data;
          console.log(this.accommodation.imageTypes);
          this.images = this.accommodation.imageTypes.map((imageType: string, index: number) => {
            return {
              imageSrc: imageType,
              imageAlt: this.accommodation.imageBytes[index]
            };
          });
          console.log(this.images);

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
              accommodationId: availability.accommodationId
            }
          });

            console.log(this.availableDates);

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
