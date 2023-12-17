import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import {AccommodationService} from "./createaccommodation.service";
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {RegisterService} from "../register/register.service";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent implements AfterViewInit{
  enteredAddress: string = '';
  map: any;
  marker: any;

  //constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  /*constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private accommodationService: AccommodationService
  ) {}*/
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _router: Router, private http: HttpClient, private accommodationService: AccommodationService) {}


  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.loadLeaflet();
      }, 0);
    }
  }

  private loadLeaflet() {
    import('leaflet').then((L) => {
      this.initializeMap(L);
    }).catch((err) => {
      console.error('Leaflet failed to load', err);
    });
  }

  private initializeMap(L: any) {
    const map = L.map('mapContainer').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('A sample location.')
      .openPopup();

    // Initialize marker without setting its location
    this.marker = L.marker([0, 0]).addTo(this.map);
  }

  locateOnMap() {
    // Geocode the entered address to get its coordinates
    // For simplicity, you can use a geocoding service/library like OpenCage Geocoding API
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = '7234404387b94ae4bdc2c7d6bb31bf58';
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(this.enteredAddress)}&key=${apiKey}`;

    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        // Check if the geocoding was successful and has results
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry;
          const { lat, lng } = location;

          // Update the marker's location and reposition the map
          this.marker.setLatLng([lat, lng]);
          this.map.setView([lat, lng], 13);
        } else {
          console.error('Geocoding failed. No results found.');
        }
      })
      .catch(error => {
        console.error('Error during geocoding', error);
      });
  }


  accommodationData: any = {};
  selectedImages: { url: string, file: File }[] = [];


  handleImageUpload(event: any) {
    this.selectedImages = []; // da li resetovati listu ili dodavati sliku po sliku?

    //onda mora i uklanjanje slike

    const files: FileList | null = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        this.selectedImages.push({ url, file });
      }
    }
  }

  // ...

  name: string = '';
  description: string = '';
  accommodationType: string = '';
  minGuests: string = '';

  accommodation = {
    name: '',
    description: '',
    type: '',
    minGuests: '',
    maxGuests: '',
    amenities: {
      airCondition: false,
      spa: false,
      beachFront: false,
      hotTub: false
    },
    location: {
      address: ''
    },
    priceType: '',
    price: 0,
    availability: {
      startDate: '',
      endDate: ''
    },
    specialPrice: {
      startDate: '',
      endDate: '',
      amount: 0
    },
    cancellationDeadline: 0
  };

  // ... ostatak postojećeg koda

  createAccommodation() {
    if (this.selectedImages && this.selectedImages.length > 0) {
      // Priprema podataka za slanje na backend
      const accommodationDTO = {
        name: this.accommodation.name,
        description: this.accommodation.description,
        type: this.accommodation.type,
        minGuests: this.accommodation.minGuests,
        maxGuests: this.accommodation.maxGuests,
        amenities: this.accommodation.amenities,
        location: this.accommodation.location,
        priceType: this.accommodation.priceType,
        price: this.accommodation.price,
        availability: this.accommodation.availability,
        specialPrice: this.accommodation.specialPrice,
        cancellationDeadline: this.accommodation.cancellationDeadline
        // Dodajte ostale potrebne podatke
      };

      // Pozivamo servis za slanje podataka na backend
      this.accommodationService.addAccommodation(accommodationDTO).subscribe(
        (accommodationId) => {
          console.log('Accommodation added successfully. ID:', accommodationId);
          // Dodajte dalje korake kao što su dodavanje slika, itd.
        },
        (error) => {
          console.error('Error adding accommodation:', error);
        }
      );
    }
  }






}


