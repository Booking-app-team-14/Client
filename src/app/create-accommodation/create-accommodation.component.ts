import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent {
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
    // Ovde možete koristiti this.selectedImages za dalje radnje
    // ...

    // Proverite da li postoji nešto odabrano pre nego što radite sa slikama
    if (this.selectedImages && this.selectedImages.length > 0) {
      // Iterirajte kroz listu slika
      for (let i = 0; i < this.selectedImages.length; i++) {
        const image = this.selectedImages[i];
        // Ovde možete raditi sa pojedinačnom slikom (na primer, slati na server)
      }
    }
  }


}


