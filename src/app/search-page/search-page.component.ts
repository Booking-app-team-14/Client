import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FilterModel} from "../shared/Filter.model";
import {SearchPageService} from "./search-page.service";
import {FilterService} from "../shared/filter.service";
import {Accommodation} from "../shared/accommodation.model";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  filters: FilterModel = {}; // Shared filter object

  constructor(private filterService: FilterService, private accommodationService: SearchPageService) {}

  ngOnInit() {
    // Subscribe to filter changes from the shared service
    this.filterService.filters$.subscribe(filters => {
      this.filters = filters;
      this.applyFiltersAndFetchData();
    });
  }

  applyFiltersAndFetchData() {
    this.accommodationService.filterAccommodations(this.filters)
      .subscribe({
        next: (results: Accommodation[]) => {
      this.filterService.setFilteredResults(results);
      console.log(results);
    },
      error: (error: any) => {
      console.error('Error filtering accommodations:', error);
    }
  });
}
 }
