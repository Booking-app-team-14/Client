import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private apiUrl = 'http://localhost:8080/api/accommodations';  // putanja

  constructor(private http: HttpClient) {}

  addAccommodation(accommodation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, accommodation);
  }
}

