import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationDTO} from "../shared/accommodation-details.model";
import {Accommodation} from "../shared/accommodation.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationDetailsService {

  constructor(private http: HttpClient) { }

  getAccommodationById(id: number): Observable<AccommodationDTO>{
    return this.http.get<AccommodationDTO>(`http://localhost:8080/api/accommodations/${id}`);
  }
  getUserById(currentUser:any): Observable<number> {
    return this.http.get<number>(`https://localhost:8080/api/users/token/${currentUser.token}`);
  }
}
