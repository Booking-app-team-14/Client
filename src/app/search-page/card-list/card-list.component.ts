import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  constructor(private router: Router,private http: HttpClient) {}
  apartmentsPerPage = 4;
  apartments = [
    {
      id: 1,
      name: 'Apartment 1',
      imageUrl: '/assets/mainPagePicture.jpg',
      rating: 4.5,
      reviews: 120,
      description: 'Description for Apartment 1',
      pricePerNight: 100,
    },
    {
      id: 2,
      name: 'Apartment 2',
      imageUrl: '/assets/mainPagePicture.jpg',
      rating: 4.6,
      reviews: 121,
      description: 'Description for Apartment 2',
      pricePerNight: 200,
    },
    {
      id: 1,
      name: 'Apartment 3',
      imageUrl: '/assets/mainPagePicture.jpg',
      rating: 4.9,
      reviews: 220,
      description: 'Description for Apartment 3',
      pricePerNight: 1000,
    },
    {
      id: 4,
      name: 'Apartment 4',
      imageUrl: '/assets/mainPagePicture.jpg',
      rating: 4.5,
      reviews: 120,
      description: 'Description for Apartment 4',
      pricePerNight: 100,
    },
    {
      id: 5,
      name: 'Apartment 5',
      imageUrl: '/assets/mainPagePicture.jpg',
      rating: 3.5,
      reviews: 220,
      description: 'Description for Apartment 5',
      pricePerNight: 100,
    },
    {
      id: 6,
      name: 'Apartment 6',
      imageUrl: '/assets/mainPagePicture.jpg',
      rating: 4.5,
      reviews: 120,
      description: 'Description for Apartment 6',
      pricePerNight: 100,
    }
  ];
  currentPage = 1;

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  get totalPages(): number[] {
    const pagesArray: number[] = [];
    const total = Math.ceil(this.apartments.length / this.apartmentsPerPage);
    for (let i = 1; i <= total; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

  redirectToAccomodationDetailsPage() {
    this.router.navigate(['/search/details']);
  }
}
