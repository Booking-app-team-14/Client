import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "../shared/accommodation.model";

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {

  constructor(private http: HttpClient) { }

  getAllAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>('http://localhost:8080/api/accommodations');
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




}
