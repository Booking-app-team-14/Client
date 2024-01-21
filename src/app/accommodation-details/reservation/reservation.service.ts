import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable, switchMap, throwError} from 'rxjs';
import {UserService} from "../../user-credentials/login/user.service";

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



  getOwnerInfo(): Observable<string> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<any>(`http://localhost:8080/api/users/token/${currentUser.token}`).pipe(
      switchMap((info: any) => {
        return this.getUserAccount(info).pipe(
          map((userData: any) => userData.username)
        );
      })
    );
  }

  getAvailabilityForAccommodation(id:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/availabilities/accommodations/${id}`);
  }
  getUserAccount(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  sendReservation(reservationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/requests`, reservationData) .pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
}
