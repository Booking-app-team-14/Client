import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import {AccommodationService} from "./createaccommodation.service";
import {HttpClient} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent implements AfterViewInit{
  enteredAddress: string = '';
  map: any;
  marker: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient, private accommodationService: AccommodationService, private router: Router) {}
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
  amenities = {
    amenity1: false,
    wifi: false,
    jacuzzi: false,
    gymCenter: false,
    videoGames: false
  };
  selectedImage: { url: string, file: File } = null;
  fileUploaded: boolean = false;
  avatarBytes: string;
  avatarImageType: string;

  selectedImages: { url: string, file: File }[] = [];

   onFileSelected(event: any): void {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      const formData: FormData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append('imageBytesList', files[i], files[i].name);

        const reader = new FileReader();
        const url = URL.createObjectURL(files[i]);
         this.selectedImages.push({ url, file: files[i] });
      }

      // Assuming you want to display the first selected image
       this.selectedImage = this.selectedImages[0];

      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.avatarBytes = event.target.result.split(',')[1];
        this.avatarImageType = files[0].type.split('/')[1];
      };

      reader.readAsDataURL(files[0]);
      this.fileUploaded = true;
    }
  }

  accommodationId: number;
  onSubmit() {
    let availabilityData = this.specialPrices.map(specialPrice => {
      return {
        start: specialPrice.startDate,
        end: specialPrice.endDate,
        specialPrice:  specialPrice.amount
      };
    });
    const selectedAmenities = [];
    if (this.amenities.amenity1) {
      selectedAmenities.push({ "id": 1 });
    }
    if (this.amenities.wifi) {
      selectedAmenities.push({ "id": 2 });
    }
    if (this.amenities.jacuzzi) {
      selectedAmenities.push({ "id": 3 });
    }
    if (this.amenities.gymCenter) {
      selectedAmenities.push({ "id": 4 });
    }
    if (this.amenities.videoGames) {
      selectedAmenities.push({ "id": 5 });
    }
    const accommodationData = {
      name: this.name,
      description: this.description,
      location: {
      country: this.enteredAddress.split(',')[2].trim(),
      city: this.enteredAddress.split(',')[1].trim(),
      address: this.enteredAddress.split(',')[0].trim()
    },
      type: this.type,
       //images: ["image1.jpg" ],
      amenities: selectedAmenities,
      rating: 5.0,
      minNumberOfGuests:this.minNumberOfGuests,
      maxNumberOfGuests: this.maxNumberOfGuests,
      availability: availabilityData,
      pricePerNight : this.price,
     pricePerGuest : true,
      cancellationDeadline:this.cancellationDeadline,
      automatic:true
    };

    this.accommodationService.addAccommodation(accommodationData).subscribe(
      (response) => {
        this.accommodationId = response;
        console.log('Accommodation added successfully', response );

        alert('Accommodation added successfully! Request sent to admin!');
        //this.currentStep = 'upload';
         if (this.fileUploaded) {
          this.accommodationService.uploadAccommodationImages(this.accommodationId, [this.avatarBytes])
              .subscribe({
                next: (r: any) => {
                  console.log('Images uploaded successfully', r);
                },
                error: (err) => {
                  console.error(err);
                  alert('Error while uploading accommodation images!');
                }
              });

        }

        this.router.navigate(['/']);

      });
  }
  private loadLeaflet() {
    import('leaflet').then((L) => {
      this.initializeMap(L);
    }).catch((err) => {
      console.error('Leaflet failed to load', err);
    });
  }
  /*private initializeMap(L: any) {
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
*/
  private initializeMap(L: any) {
    const map = L.map('mapContainer').setView([44.8178, 20.4568], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    this.map = map;

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
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getTodayDate(index: number): string {
    const date =  this.formatDate(new Date());
    if (this.specialPrices[index].startDate) this.getDateFromDatePicker(index);
    return date;
  }

  getDateFromDatePicker(index: number): string {
    const date = new Date(this.specialPrices[index].startDate);
    return this.formatDate(date);
  }

  isStartDateSelected(index: number): boolean {
    return this.specialPrices[index].startDate === '';
  }


}
