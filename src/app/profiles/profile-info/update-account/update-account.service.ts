import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateAccountService {

  constructor(private http: HttpClient) { }

  getUserIdFromToken(token: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/users/token/${token}`);
  }

  getUserFromId(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/users/${userId}`);
  }

  updateAccount(user: any, userId: number): Observable<string> {
    return this.http.put<string>(`http://localhost:8080/api/users/${userId}`, user, { responseType: 'text' as 'json' });
  }

  uploadImage(image: any, userId: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/users/${userId}/image`, image, { responseType: 'text' as 'json' });
  }

}
