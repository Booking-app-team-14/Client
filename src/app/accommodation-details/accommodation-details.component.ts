import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationDetailsService } from './accommodation-details.service';
import { AccommodationDTO } from '../shared/accommodation-details.model';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {
  accommodation: AccommodationDTO | undefined;
  availableDates: string[] = [];
  images: { imageSrc: string, imageAlt: string }[] = [];
  places: any; // Update the type according to your structure
  owner: { name: string, picture: string } = { name: "Nick Jefferson", picture: 'assets/BG.png' };

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationDetailsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      this.accommodationService.getAccommodationById(id).subscribe(
        (data: AccommodationDTO) => {
          this.accommodation = data;
          this.availableDates = this.accommodation.availability.map(avail => avail.startDate);
          console.log(this.accommodation);

          // Generate images array based on accommodation images
          this.images = this.accommodation.images.map((imageSrc: string) => {
            return {
              imageSrc: imageSrc,
              imageAlt: 'IMAGE'
            };
          });

          // Set places object based on accommodation details
          this.places = {
            name: this.accommodation.name,
            address: this.accommodation.location.address,
            description: this.accommodation.description,
          };
        },
        (error) => {
          console.error('Error fetching accommodation details:', error);
        }
      );
    });
  }
}
