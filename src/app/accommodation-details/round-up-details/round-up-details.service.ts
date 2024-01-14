import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoundUpDetailsService {

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/users/owner/${userId}`).pipe(
      map((userData: any) => {
        return userData;
      })
    )
  }

}

