import { Component } from '@angular/core';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent {
  accommodationData: any = {};
  selectedImages: { url: string, file: File }[] = [];

  handleImageUpload(event: any) {
    this.selectedImages = []; // Ovo će resetovati listu pri svakom novom odabiru

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
