import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-accommodation',
  templateUrl: './update-accommodation.component.html',
  styleUrl: './update-accommodation.component.css'
})
export class UpdateAccommodationComponent implements OnInit, AfterViewInit {

  imagesAlreadyUploaded: { url: string, file: File }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private activatedRoute: ActivatedRoute,) {
    // TODO: get details from server

    // get images from server and add them to imagesAlreadyUploaded
    this.imagesAlreadyUploaded.push({ url: 'https://storage.pixteller.com/designs/designs-images/2019-05-15/11/hotel-room-banner-1-5cdbd406ccdb1.png', file: null });
    this.imagesAlreadyUploaded.push({ url: 'https://media.edinburgh.org/wp-content/uploads/2023/04/23154056/The-Balmoral-Executive-View-Room-e1682260891619-1920x1032.jpg', file: null });
    // get all accommodation details from server and set them to the form input fields
    // ...
  }

  accommodationId: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.accommodationId = +params['id'];
    });
  }
  
  selectedImages: { url: string, file: File }[] = this.imagesAlreadyUploaded;

  handleImageUpload(event: any) {
    const files: FileList | null = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        this.selectedImages.push({ url, file });
      }
    }
  }

  removeImage(image: { url: string, file: File }) {
    const index = this.selectedImages.indexOf(image);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    }
  }

  enteredAddress: string = '';
  map: any;
  marker: any;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.loadLeaflet();
      }, 0);
    }
  }

  name: string = '';
  description: string = '';
  type: string = '';
  minNumberOfGuests: any;
  maxNumberOfGuests: any;
  cancellationDeadline: any;
  price:number;
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

  // TODO: get amenities from server
  amenities = {
    amenity1: false,
    wifi: false,
    jacuzzi: false,
    gymCenter: false,
    videoGames: false
  };


  onSubmit() {
    // TODO: submit (change the accommodation details)
    throw new Error('Method not implemented.');
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
    this.marker = L.marker([0, 0]).addTo(this.map);
  }

  locateOnMap() {

    const apiKey = '7234404387b94ae4bdc2c7d6bb31bf58';
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(this.enteredAddress)}&key=${apiKey}`;

    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry;
          const { lat, lng } = location;
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

}
