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
  apartments: any[] = [];


  constructor(private filterService: FilterService, private accommodationService: SearchPageService) {}

  ngOnInit() {
    this.getAccommodations();
    this.filterService.filters$.subscribe(filters => {
      this.filters = filters;
      this.applyFiltersAndFetchData();
    });
  }



  getAccommodations(): void {
    // Fetch default accommodations
    this.accommodationService.getAllAccommodations().subscribe({
      next: (result: Accommodation[]) => {
        this.apartments = result;
        console.log('Fetched default accommodations:', result);
      },
      error: (error: any) => {
        console.log('Error fetching default accommodations:', error);
      }
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
