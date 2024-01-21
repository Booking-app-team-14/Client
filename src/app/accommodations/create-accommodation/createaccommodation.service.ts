// accommodation.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  addAccommodation(accommodationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/accommodations/create`, accommodationData);
  }

   uploadAccommodationImages(accommodationId: number, imageBytesList: string[]) {
    const url = `${this.apiUrl}/accommodations/${accommodationId}/image`;
    return this.http.post(url, imageBytesList);
  }


}


