import {Component, AfterViewInit, Inject, PLATFORM_ID, Input} from '@angular/core';
import * as L from 'leaflet';
import { isPlatformBrowser } from "@angular/common";
import {LocationService} from "./location.service";

interface  Location{
  address:string,
  city:string,
  country:string
}
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit {
  @Input() location!: Location;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private locationService: LocationService) {}

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
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    const map = L.map('mapContainer').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);
    const searchAddress = (address: string) => {
      this.locationService.search(address).subscribe(
        (data: any) => {
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            map.setView([lat, lon], 13);
            L.marker([lat, lon]).addTo(map)
              .bindPopup('Searched location: ' + address)
              .openPopup();
          } else {
            console.error('Location not found');
          }
        },
        (error) => {
          console.error('Error occurred while searching:', error);
        }
      );
    };
    //this.location.address='Hilandarska 1';
    //this.location.city='Novi Sad'
    searchAddress(this.location.address+", "+this.location.city);
  }
}
