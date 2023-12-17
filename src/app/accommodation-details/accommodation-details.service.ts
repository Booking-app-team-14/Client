import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationDTO} from "../shared/accommodation-details.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationDetailsService {

  constructor(private http: HttpClient) { }

  getAccommodationById(id: number): Observable<AccommodationDTO>{
    return this.http.get<AccommodationDTO>(`http://localhost:8080/api/accommodations/${id}`);
  }
}
