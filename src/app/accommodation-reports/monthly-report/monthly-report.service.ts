import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyReportService {
  private baseUrl = 'http://localhost:8080/api/accommodation-reports';

  constructor(private http: HttpClient) { }

  getMonthlyAccommodationReports(accommodationId: number, year: number): Observable<Map<string, any>> {
    const url = `${this.baseUrl}/${accommodationId}/monthly-report`;
    const params = new HttpParams().set('year', year.toString());

    return this.http.get<Map<string, any>>(url, { params });
  }
}
