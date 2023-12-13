import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PagedResult} from "../shared/paged-result.model";
import {Observable} from "rxjs";
import {Accommodation} from "../shared/accommodation.model";


@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  constructor(private http: HttpClient) { }

  getBestOffers(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>('http://localhost:8080/api/accommodations/sort/rating/desc');
  }
}
