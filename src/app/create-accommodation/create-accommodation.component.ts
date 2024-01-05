import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import {AccommodationService} from "./createaccommodation.service";
import {HttpClient} from "@angular/common/http";
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent implements AfterViewInit{
  enteredAddress: string = '';
  map: any;
  marker: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient, private accommodationService: AccommodationService) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.loadLeaflet();
      }, 0);
    }
  }

  //dto
  name: string = '';
  description: string = '';
  type: string = '';
  minNumberOfGuests: any;
  //amenities: [ ] ;
  maxNumberOfGuests: any;
  cancellationDeadline: any;
  //enteredAddress: string='';

  specialPrices: { startDate: any, endDate: any, amount: number }[] = [];

    addSpecialPrice() {
    this.specialPrices.push({
      startDate: '',
      endDate: '',
      amount: null
    });
  }

  removeSpecialPrice(index: number) {
    this.specialPrices.splice(index, 1);
  }
  onSubmit() {

    const availabilityData = this.specialPrices.map(specialPrice => {
      return {
        start: specialPrice.startDate,
        end: specialPrice.endDate,
        specialPrice: specialPrice.amount
      };
    });

    const accommodationData = {
      // prikupite podatke iz forme
      name: this.name,
      description: this.description,
      location: {
      country: this.enteredAddress.split(',')[2].trim(),
      city: this.enteredAddress.split(',')[1].trim(),
      address: this.enteredAddress.split(',')[0].trim()
    },
      type: this.type,
      images: ["image4.jpg", "image5.jpg"],
      amenities: [
        {
          "name": "Amenity 1 Name",
          "description": "Description for Amenity 1",
          "icon": "icon1.jpg"
        }
      ],
      rating: 5.0,
      minNumberOfGuests:this.minNumberOfGuests,
      maxNumberOfGuests: this.maxNumberOfGuests,
      availability: availabilityData,
      pricePerNight : 1200.0,
     pricePerGuest : true,
      cancellationDeadline:this.cancellationDeadline
    };

    this.accommodationService.addAccommodation(accommodationData).subscribe(
      (response) => {
        console.log('Accommodation added successfully', response);

        alert('Accommodation added successfully! Request sent to admin!');
      },
      (error) => {
        console.error('Error adding accommodation', error);
      }
    );
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
    this.selectedImages = [];


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

  createAccommodation() {

    if (this.selectedImages && this.selectedImages.length > 0) {

      for (let i = 0; i < this.selectedImages.length; i++) {
        const image = this.selectedImages[i];

      }
    }
  }



}
