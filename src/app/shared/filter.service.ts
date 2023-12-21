import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterModel } from './Filter.model';
import { Accommodation } from './accommodation.model';
import { SearchPageService } from '../search-page/search-page.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filtersSubject: BehaviorSubject<FilterModel> = new BehaviorSubject<FilterModel>({});
  private filteredResults: Accommodation[] = [];
  public filters$: Observable<FilterModel> = this.filtersSubject.asObservable();

  constructor(private service: SearchPageService) {}

  updateFilters(filters: FilterModel) {
    const currentFilters = this.filtersSubject.getValue();
    const updatedFilters = { ...currentFilters, ...filters };
    this.filtersSubject.next(updatedFilters);
  }

  getAllFilters(): FilterModel {
    return this.filtersSubject.getValue();
  }

  filterAccommodations(allFilters: FilterModel): Observable<Accommodation[]> {
    console.log(allFilters);
    return this.service.filterAccommodations(allFilters);
  }

  private filteredResultsSubject = new BehaviorSubject<Accommodation[]>([]);
  filteredResults$ = this.filteredResultsSubject.asObservable();

  setFilteredResults(results: Accommodation[]): void {
    console.log(results);
    this.filteredResults = results;
    this.filteredResultsSubject.next(results);
  }

  getSavedResults(): Accommodation[] {
    return this.filteredResults;
  }
}
