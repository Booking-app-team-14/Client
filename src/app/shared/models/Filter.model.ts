export interface FilterModel {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minGuests?: number;
  maxGuests?: number;
  amenityIds?: number[];
  accommodationType?: string;
  startDate?: string;
  endDate?: string;
}
