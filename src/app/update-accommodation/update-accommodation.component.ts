import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-accommodation',
  templateUrl: './update-accommodation.component.html',
  styleUrl: './update-accommodation.component.css'
})
export class UpdateAccommodationComponent {

  range: any = new FormGroup({
    start: new FormControl({ value: '', disabled: true }),
    end: new FormControl({ value: '', disabled: true }),
  });

  @ViewChild('startDateRef') startDateElement: ElementRef;
  @ViewChild('endDateRef') endDateElement: ElementRef;

  startDate: Date;
  endDate: Date;

  startDateChangeEvent(){
    this.startDate = this.startDateElement.nativeElement.value;
  }

  endDateChangeEvent(){
    this.endDate = this.endDateElement.nativeElement.value;
  }

  addRange() {
    throw new Error('Method not implemented.');
  }

  imagesAlreadyUploaded: { url: string, file: File }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    // TODO: get details from server

    // get images from server and add them to imagesAlreadyUploaded
    this.imagesAlreadyUploaded.push({ url: 'https://storage.pixteller.com/designs/designs-images/2019-05-15/11/hotel-room-banner-1-5cdbd406ccdb1.png', file: null });
    this.imagesAlreadyUploaded.push({ url: 'https://media.edinburgh.org/wp-content/uploads/2023/04/23154056/The-Balmoral-Executive-View-Room-e1682260891619-1920x1032.jpg', file: null });
    // get all accommodation details from server and set them to the form input fields
    // ...
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

  onSubmit() {
    // TODO: submit (change the accommodation details)
    throw new Error('Method not implemented.');
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

}
