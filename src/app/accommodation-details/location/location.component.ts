import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
    latitude: number = 44.813041;
    longitude: number = 20.505002;
    googleMapsApiKey: string = 'AIzaSyAcGyGB1JyRQt6fAVOe_Nv8OVE7qHT0cew';

  constructor(private sanitizer: DomSanitizer) {}

  getMapUrl(): SafeResourceUrl {
    const apiKey = this.googleMapsApiKey;
    const location = `${this.latitude},${this.longitude}`;
    const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${location}&zoom=15`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }
}
