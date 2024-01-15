import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Accommodation} from "../../shared/accommodation.model";
import {SearchPageService} from "../search-page.service";
import {Observable, Subscription} from "rxjs";
import {FilterService} from "../../shared/filter.service";
import {UserService} from "../../login/user.service";
import {ReservationService} from "../../accommodation-details/reservation/reservation.service";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent implements AfterViewInit {
  apartmentsPerPage = 4;
  @Input() apartments: Accommodation[] = [];
  subscription: Subscription;
  originalApartments: Accommodation[] = []
  filteredAccommodations: Accommodation[] = [];
  currentPage = 1;
  isSortedByPrice = false;
  isSortedByRating = false;
  isFavorite: boolean = false;
  id:number;
  userRole: string = '';
  constructor(private router: Router, private service: SearchPageService, private filterService:FilterService,
              private userService: UserService, private reservationService: ReservationService) {
    this.userService.userRole$.subscribe(role => {
      this.userRole = role;
    });

  }


  toggleFavorite(apartment: any): void {
    apartment.isFavorite = !apartment.isFavorite;

    this.reservationService.getGuestId().subscribe(
      (userId: number) => {
        this.id = userId;
        console.log(apartment.id);
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
  ngAfterViewInit(): void {
    this.getAccommodations();
    this.listenToSearchQueryChanges();
    this.filterAccommodations();
  }

  getAccommodations(): void {
    // Fetch default accommodations
    this.service.getAllAccommodations().subscribe({
      next: (result: Accommodation[]) => {
        this.apartments = result;
      },
      error: (error: any) => {
        console.log('Error fetching default accommodations:', error);
      }
    });
  }

  listenToSearchQueryChanges(): void {
    this.service.getSearchQuery().subscribe(query => {
      if (query.trim().length === 0) {
        this.getAccommodations();
      } else {
        this.service.searchAccommodations(query).subscribe({
          next: (accommodations: Accommodation[]) => {
            this.apartments = accommodations;
            console.log('Filtered accommodations:', accommodations);
          },
          error: (error: any) => {
            console.log('Error fetching filtered accommodations:', error);
          }
        });
      }
    });
  }

  filterAccommodations(): void {
    this.filteredAccommodations = this.filterService.getSavedResults();
    console.log(this.filteredAccommodations);
    if (this.filteredAccommodations.length == 0) {
      this.getAccommodations();
      return;
    }

    this.subscription = this.filterService.filteredResults$.subscribe(
      (results: Accommodation[]) => {
        this.apartments = results;
        console.log('Filtered accommodations:', results);
      },
      (error: any) => {
        console.error('Error fetching filtered results:', error);
      }
    );
  }
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

  redirectToAccomodationDetailsPage(id:number) {
    this.router.navigate(['/search/details', id]);
  }



  onSortChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;


    if (
      (selectedValue === 'price' && this.isSortedByPrice) ||
      (selectedValue === 'rating' && this.isSortedByRating)
    ) {
      this.getAccommodations();
      return;
    }

    this.fetchSortedAccommodations(selectedValue);
  }

  fetchSortedAccommodations(sortBy: string): void {
    switch (sortBy) {
      case 'price':
        this.service.getAllAccommodationsByPriceASC().subscribe({
          next: (result: Accommodation[]) => {
            this.apartments = result;
            console.log('Sorted by price (ascending):', result);
            this.isSortedByPrice = true;
            this.isSortedByRating = false;
          },
          error: (error: any) => {
            console.log('Error sorting by price ASC:', error);
          }
        });
        break;

      case 'rating':
        this.service.getAllAccommodationsByRatingDESC().subscribe({
          next: (result: Accommodation[]) => {
            this.apartments = result;
            console.log('Sorted by rating (descending):', result);
            this.isSortedByRating = true; // Update sorting flag
            this.isSortedByPrice = false; // Reset other sorting flag
          },
          error: (error: any) => {
            console.log('Error sorting by rating DESC:', error);
          }
        });
        break;

      default:
        console.log('Invalid sorting option');
        break;
    }
  }

  isApartmentFavorite(apartment: any): boolean {
    this.service.getOwnerInfo().subscribe(
      (userInfo: any) => {
        if (userInfo.favouriteAccommodationsIds) {
          return userInfo.favouriteAccommodationsIds.includes(apartment.id);
        }
        return false;
      },
      (error) => {
        console.error('Error fetching user info:', error);
        return false;
      }
    );
    return false;
  }
}
