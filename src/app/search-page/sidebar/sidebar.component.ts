import {Component, signal} from '@angular/core';
import {SearchPageService} from "../search-page.service";
import {Accommodation} from "../../shared/models/accommodation.model";
import {FilterService} from "../../shared/services/filter.service";
import {FilterModel} from "../../shared/models/Filter.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  propertyName: string = '';
  accommodation: Accommodation[]=[];
  selectedPriceRanges: string[] = [];
  selectedMinRating: number = 1;
  selectedAmenities: number[] = [];

  amenityMap: { [key: string]: number } = {
    FreeParking: 1,
    WiFi: 2,
    Jacuzzi: 3,
    GymCenter:4,
    VideoGames:5,

  };

  constructor(private searchPageService: SearchPageService, private filterService: FilterService) {
  }

  performSearch(searchTerm: string): void {

  }
  onPriceRangeChange(event: any) {
    const priceRangeValue = event.target.value;
    if (event.target.checked) {
      this.selectedPriceRanges.push(priceRangeValue);
    } else {
      const index = this.selectedPriceRanges.indexOf(priceRangeValue);
      if (index >= 0) {
        this.selectedPriceRanges.splice(index, 1);
      }
    }
    this.updateFilters();
  }

  onMinRatingChange(event: any) {
    this.selectedMinRating = event.target.value;
    this.updateFilters();
  }

  onAmenityChange(event: any) {
    const amenityValue = event.target.value;
    const amenityId = this.amenityMap[amenityValue]; // Get the corresponding ID from the map

    if (event.target.checked) {
      this.selectedAmenities.push(amenityId);
    } else {
      const index = this.selectedAmenities.indexOf(amenityId);
      if (index >= 0) {
        this.selectedAmenities.splice(index, 1);
      }
    }
    this.updateFilters();
  }

  updateFilters() {
    const filters: FilterModel = {
      minRating: this.selectedMinRating ? parseInt(String(this.selectedMinRating), 10) : undefined,
      amenityIds: this.selectedAmenities.length > 0 ? this.selectedAmenities : undefined,
      minPrice: this.getMinPriceFromSelectedRanges(),
      maxPrice: this.getMaxPriceFromSelectedRanges()
    };
    this.filterService.updateFilters(filters);
  }

  onSearch(): void {
    const enteredPropertyName = this.propertyName;
    this.searchPageService.setSearchQuery(enteredPropertyName);
  }

  getMinPriceFromSelectedRanges(): number | undefined {
    const selectedPrices: number[] = this.selectedPriceRanges.map(range => {
      const [min, max] = range.split('-').map(Number);
      return min;
    });
    return selectedPrices.length > 0 ? Math.min(...selectedPrices) : undefined;
  }

  getMaxPriceFromSelectedRanges(): number | undefined {
    const selectedPrices: number[] = this.selectedPriceRanges.map(range => {
      const [min, max] = range.split('-').map(Number);
      return max;
    });
    return selectedPrices.length > 0 ? Math.max(...selectedPrices) : undefined;
  }

}
