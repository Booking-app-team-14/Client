import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterModel } from './Filter.model';
import {Accommodation} from "./accommodation.model";
import {SearchPageService} from "../search-page/search-page.service"; // Your filter parameters model

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filtersSubject: BehaviorSubject<FilterModel> = new BehaviorSubject<FilterModel>({});
  public filters$: Observable<FilterModel> = this.filtersSubject.asObservable();
  private filteredResults: Accommodation[] = [];

  constructor(private service: SearchPageService) {}

  updateFilters(filters: FilterModel) {
    const currentFilters = this.filtersSubject.getValue();
    const updatedFilters = { ...currentFilters, ...filters };
    this.filtersSubject.next(updatedFilters);
  }

  getAllFilters(): FilterModel{
    return this.filtersSubject.getValue();
  }

  getFilteredResults(): Accommodation[] {
    return this.filteredResults;
  }
  filterAccommodations(filters: any): Observable<Accommodation[]> {

    return this.service.filterAccommodations(filters);
  }

  setFilteredResults(results: Accommodation[]): void {
    this.filteredResults = results;
  }
}
