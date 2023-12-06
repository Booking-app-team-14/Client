import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import * as L from 'leaflet';
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent implements AfterViewInit{
  enteredAddress: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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

  createAccommodation() {

    if (this.selectedImages && this.selectedImages.length > 0) {

      for (let i = 0; i < this.selectedImages.length; i++) {
        const image = this.selectedImages[i];

      }
    }
  }



}


