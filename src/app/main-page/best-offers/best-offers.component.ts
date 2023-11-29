import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-best-offers',
  templateUrl: './best-offers.component.html',
  styleUrl: './best-offers.component.css'
})
export class BestOffersComponent {
  offers = [
    {
      image: '/assets/mainPagePicture.jpg',
      type: 'Apartment',
      location: 'Novi Sad',
      guests: 5,
      description: 'Lorem ipsum',
      price: 20
    },
    {
      image: '/assets/mainPagePicture.jpg',
      type: 'Apartment',
      location: 'Novi Sad',
      guests: 4,
      description: 'Lorem ipsum',
      price: 300
    },
    {
      image: '/assets/mainPagePicture.jpg',
      type: 'Apartment',
      location: 'Novi Sad',
      guests: 2,
      description: 'Lorem ipsum',
      price: 10
    },
    {
      image: '/assets/mainPagePicture.jpg',
      type: 'Apartment',
      location: 'Novi Sad',
      guests: 10,
      description: 'Lorem ipsum',
      price: 2000
    },
    {
      image: '/assets/mainPagePicture.jpg',
      type: 'Apartment',
      location: 'Novi Sad',
      guests: 6,
      description: 'Lorem ipsum',
      price: 200
    },
    {
      image: '/assets/mainPagePicture.jpg',
      type: 'Apartment',
      location: 'Novi Sad',
      guests: 17,
      description: 'Lorem ipsum',
      price: 2500
    },
  ];
}
