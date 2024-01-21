import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EachAccommodationReportService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAccommodationReports(startDate: string, endDate: string, ownerId:number): Observable<any> {
    const url = `${this.apiUrl}/api/accommodation-reports/${ownerId}?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get(url);
  }
}
