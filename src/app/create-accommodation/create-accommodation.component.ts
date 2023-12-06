import {Component} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent{
  enteredAddress: string = '';

  locateOnMap() {
    // Implementirajte geokodiranje i postavljanje mape ovde
    // Možete koristiti neki geokodirajući servis, kao što je Google Maps Geocoding API
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


