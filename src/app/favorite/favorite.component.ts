import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../shared/accommodation.model";
import {Router} from "@angular/router";
import {SearchPageService} from "../search-page/search-page.service";
import {FilterService} from "../shared/filter.service";
import {UserService} from "../login/user.service";
import {ReservationService} from "../accommodation-details/reservation/reservation.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {

  favoriteApartments: any[] = [];
  id:number;

  constructor(private router: Router, private service: SearchPageService,  private reservationService: ReservationService) {

  }


  toggleFavorite(apartment: any): void {
    apartment.isFavorite = !apartment.isFavorite;

    this.reservationService.getGuestId().subscribe(
      (userId: number) => {
        this.id = userId;
        if (apartment.isFavorite) {
          this.service.addFavoriteAccommodation(this.id,apartment.id).subscribe(
            (response) => {
              console.log('Accommodation added to favourites', response);
            },
            (error) => {
              console.error('Error while adding:', error);

            }
          );
        } else {
          this.service.removeFavoriteAccommodation(this.id,apartment.id).subscribe(
            (response) => {
              console.log('Accommodation removed', response);

            },
            (error) => {
              console.error('Error while removing:', error);

            }
          );
        }
      },
      (error) => {
        console.error('Error fetching user ID:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getAccommodations();
  }

  getAccommodations(): void {
    // Fetch default accommodations

    this.reservationService.getGuestId().subscribe(
      (userId: number) => {
        this.id = userId;
        this.service.getFavouriteAccommodations(this.id).subscribe({
          next: (result: Accommodation[]) => {
            this.favoriteApartments = result;
            console.log('Fetched default accommodations:', result);
          },
          error: (error: any) => {
            console.log('Error fetching default accommodations:', error);
          }
        });
      },
      (error) => {
        console.error('Error fetching user ID:', error);
      }
    );

  }
  redirectToAccomodationDetailsPage(id:number) {
    this.router.navigate(['/search/details', id]);
  }

}
