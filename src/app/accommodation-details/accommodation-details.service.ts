import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AccommodationDTO, OwnerDTO} from "../shared/models/accommodation-details.model";
import {Accommodation} from "../shared/models/accommodation.model";


@Injectable({
  providedIn: 'root'
})
export class AccommodationDetailsService {

  constructor(private http: HttpClient) { }

  getUserAccountById(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/users/${userId}`);
  }

  getAccommodationById(id: number): Observable<AccommodationDTO>{
    return this.http.get<AccommodationDTO>(`http://localhost:8080/api/accommodations/${id}`);
  }


  /*getOwnerByAccommodationId(accommodationId: number): Observable<any> {
    const url = `${this.baseUrl}/${accommodationId}/owner`;
    return this.http.get(url);
  }*/

  //getOwnerByAccommodationId(id: number):
  getOwnerByAccommodationId(accommodationId: number): Observable<OwnerDTO>{
    return this.http.get<OwnerDTO>(`http://localhost:8080/api/{accommodationId}/owner`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/users/owner/${userId}`).pipe(
      map((userData: any) => {
        return userData;
      })
    )
  }
}
