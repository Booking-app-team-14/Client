import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  registerUser(userDTO: any, role: string): Observable<number> {
    const url = `${this.baseUrl}/register/users?type=${role}`;
    return this.http.post<number>(url, userDTO);
  }
}

