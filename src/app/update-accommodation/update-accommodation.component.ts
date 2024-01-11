import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-accommodation',
  templateUrl: './update-accommodation.component.html',
  styleUrl: './update-accommodation.component.css'
})
export class UpdateAccommodationComponent implements OnInit, AfterViewInit {

  amenities: any = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private activatedRoute: ActivatedRoute, private _router: Router) {
  
    this.http.get(`http://localhost:8080/api/amenities`).subscribe(
      (res) => {
        this.amenities = res;
      },
      (err) => {
        alert('An error occurred while getting the amenities.');
      }
    );
  
  }

  accommodationId: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.accommodationId = +params['id'];
    });

    this.http.get(`http://localhost:8080/api/accommodations/update/` + this.accommodationId).subscribe(
      (res) => {
        this.name = res['name'];
        this.description = res['description'];
        this.type = res['type'];
        this.minNumberOfGuests = res['minNumberOfGuests'];
        this.maxNumberOfGuests = res['maxNumberOfGuests'];
        this.cancellationDeadline = res['cancellationDeadline'];
        this.price = res['defaultPrice'];
        this.enteredAddress = res['location']['address'] + ', ' + res['location']['city'] + ', ' + res['location']['country'];
        this.message = res['message'];
        this.selectedPriceType = res['pricePerGuest'] ? 'PerGuest' : 'PerNight';
        this.specialPrices = res['availability'].map(availability => {
          return {
            startDate: availability['startDate'],
            endDate: availability['endDate'],
            amount: availability['specialPrice']
          };
        });
        this.selectedImages = res['images'].map(image => {
          return {
            url: 'data:image/' + image['imageType'] + ';base64,' + image['imageBytes'],
            image: image
          };
        });
        this.amenities.forEach(amenity => {
          if (res['amenities'].includes(amenity.id)) {
            amenity.checked = true;
          }
        });
        this.locateOnMap();
      },
      (err) => {
        alert('An error occurred while getting the accommodation details.');
      }
    );

  }
  
  selectedImages: { url: string, image: { imageType: string, imageBytes: string } }[];

  handleImageUpload(event: any) {
    const files: FileList | null = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        const reader = new FileReader();

        let image: { imageType: string, imageBytes: string } = { imageType: null, imageBytes: null };

        reader.onload = (event: any) => {
          image.imageBytes = event.target.result.split(',')[1];
          image.imageType = file.type.split('/')[1];
          this.selectedImages.push({ url, image });
        };
    
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(image: { url: string, image: { imageType: string, imageBytes: string } }) {
    if (this.selectedImages.length === 1) {
      alert('You must have at least one image.');
      return;
    }
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
      this.loadLeaflet();
    }
  }

  name: string = '';
  description: string = '';
  type: string = '';
  minNumberOfGuests: any;
  maxNumberOfGuests: any;
  cancellationDeadline: any;
  price: number;
  specialPrices: { startDate: any, endDate: any, amount: number }[] = [];
  message: string = '';

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

  selectedPriceType: string;

  @ViewChild('amenitiesFieldset') amenitiesFieldset: ElementRef;

  getCheckedAmenitiesIds() : number[] {
    const checkedNames = [];
    const checkboxes = this.amenitiesFieldset.nativeElement.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => checkedNames.push(checkbox.name));
    return checkedNames;
  }

  onSubmit() {
    const availabilityData = this.specialPrices.map(specialPrice => {
      return {
        startDate: specialPrice.startDate,
        endDate: specialPrice.endDate,
        specialPrice: specialPrice.amount
      };
    });
    for (let availability of availabilityData) {
      if (!availability.startDate || !availability.endDate) {
        alert('Please fill in the dates for the accommodation availability.');
        return;
      }
      if (availability.startDate > availability.endDate) {
        alert('The start date cannot be after the end date.');
        return;
      }
      if (availability.specialPrice && availability.specialPrice < 1) {
        alert('The special price must be greater than 0.');
        return;
      }
    }

    const amenityIds: number[] = this.getCheckedAmenitiesIds();

    let perGuest = true;
    if (this.selectedPriceType === 'PerNight') perGuest = false;

    if (!this.name || !this.description || !this.type || !this.minNumberOfGuests || !this.maxNumberOfGuests || !this.cancellationDeadline || !this.price || !this.enteredAddress || !this.message) {
      alert('Please fill in all the fields.');
      return;
    }

    if (this.minNumberOfGuests < 1) {
      alert('The minimum number of guests must be greater than 0.');
      return;
    }

    if (this.maxNumberOfGuests < 1) {
      alert('The maximum number of guests must be greater than 0.');
      return;
    }

    if (this.minNumberOfGuests > this.maxNumberOfGuests) {
      alert('The minimum number of guests cannot be greater than the maximum number of guests.');
      return;
    }

    if (this.cancellationDeadline < 1) {
      alert('The cancellation deadline must be greater than 0.');
      return;
    }

    if (this.price < 1) {
      alert('The price must be greater than 0.');
      return;
    }

    if (this.enteredAddress.split(',').length !== 3) {
      alert('Please enter the address in the following format: address, city, country.');
      return;
    }

    const accommodationData = {
      id: this.accommodationId,
      images: this.selectedImages.map(i => i.image),
      name: this.name,
      description: this.description,
      type: this.type,
      minNumberOfGuests: this.minNumberOfGuests,
      maxNumberOfGuests: this.maxNumberOfGuests,
      amenities: amenityIds,
      location: {
        country: this.enteredAddress.split(',')[2].trim(),
        city: this.enteredAddress.split(',')[1].trim(),
        address: this.enteredAddress.split(',')[0].trim()
      },
      pricePerGuest: perGuest,
      defaultPrice: this.price,
      availability: availabilityData,
      cancellationDeadline: this.cancellationDeadline,
      message: this.message
    };

    console.log(availabilityData);

    this.http.put(`http://localhost:8080/api/accommodations/update`, accommodationData).subscribe(
      (res) => {
      },
      (err) => {
        alert('An error occurred while updating the accommodation.');
      }
    );

    this._router.navigate(['/profile'], { skipLocationChange: true }).then(() => {
      this._router.navigate(['/profile']);
    });

  }

  private loadLeaflet() {
    import('leaflet').then((L) => {
      this.initializeMap(L);
    }).catch((err) => {
      console.error('Leaflet failed to load', err);
    });
  }

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

}
