import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Accommodation} from "../shared/accommodation.model";
import {FilterModel} from "../shared/Filter.model";

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {

  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();


  constructor(private http: HttpClient) { }

  getAllAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>('http://localhost:8080/api/accommodations/get');
  }
  getAllAccommodationsByPriceASC(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>('http://localhost:8080/api/accommodations/sort/price/asc');
  }
  getAllAccommodationsByPriceDESC(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>('http://localhost:8080/api/accommodations/sort/price/desc');
  }
  getAllAccommodationsByRatingASC(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>('http://localhost:8080/api/accommodations/sort/rating/asc');
  }
  getAllAccommodationsByRatingDESC(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>('http://localhost:8080/api/accommodations/sort/rating/desc');
  }
  getAccommodationById(id: number): Observable<Accommodation>{
    return this.http.get<Accommodation>(`http://localhost:8080/api/accommodations/${id}`);
  }

  searchAccommodations(searchTerm: string): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(`http://localhost:8080/api/accommodations/search?searchTerm=${searchTerm}`);
  }

  filterAccommodations(filters: FilterModel): Observable<Accommodation[]> {
    // Convert FilterModel to HttpParams
    let params = new HttpParams();

    // Append filters to HttpParams if they are provided
    if (filters.minPrice !== undefined) {
      params = params.append('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice !== undefined) {
      params = params.append('maxPrice', filters.maxPrice.toString());
    }
    if (filters.accommodationType) {
      params = params.append('accommodationType', filters.accommodationType.toUpperCase());
    }
    if (filters.minGuests !== undefined) {
      params = params.append('minGuests', filters.minGuests.toString());
    }
    if (filters.maxGuests !== undefined) {
      params = params.append('maxGuests', filters.maxGuests.toString());
    }
    if (filters.minRating !== undefined) {
      params = params.append('minRating', filters.minRating.toString());
    }
    if (filters.startDate) {
      params = params.append('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params = params.append('endDate', filters.endDate);
    }
    if (filters.amenityIds && filters.amenityIds.length > 0) {
      filters.amenityIds.forEach(id => {
        params = params.append('amenityIds', id.toString());
      });
    }
    console.log(filters);
    return this.http.get<Accommodation[]>('http://localhost:8080/api/accommodations/filter', { params });
  }

  private searchQuery = new BehaviorSubject<string>('');


  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuerySubject.asObservable();
  }




}
