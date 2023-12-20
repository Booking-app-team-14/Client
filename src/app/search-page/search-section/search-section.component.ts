import { Component } from '@angular/core';

import {FilterModel} from "../../shared/Filter.model";
import {FilterService} from "../../shared/filter.service";
import {Accommodation} from "../../shared/accommodation.model";

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent {
  filters: FilterModel = {
  };

  constructor(private filterService: FilterService) {}

  onFilterChange() {
    this.filterService.updateFilters(this.filters);
  }

  onFilterClick() {
    /*
    this.filterService.filterAccommodations(this.filterService.getAllFilters()).subscribe({
      next: (results: Accommodation[]) => {
        this.filterService.setFilteredResults(results);
        console.log(results);
      },
      error: (error: any) => {
        console.error('Error filtering accommodations:', error);
      }
    });
*/
  }

}
