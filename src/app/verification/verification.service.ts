import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  activateAccount(userId: number): Observable<string> {
    const apiUrl = `${this.baseUrl}/verify/users/${userId}`;

    return this.http.put<string>(apiUrl, null);
  }
}
