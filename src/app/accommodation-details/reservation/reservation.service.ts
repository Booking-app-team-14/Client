import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}


  getGuestId(): Observable<number> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<any>(`http://localhost:8080/api/users/token/${currentUser.token}`).pipe(
      map((userId: any) => {
        return userId;
      })
    );
  }
  sendReservation(reservationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/requests`, reservationData);
  }
}
