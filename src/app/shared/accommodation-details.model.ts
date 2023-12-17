export interface AccommodationDTO {
  id: number;
  name: string;
  description: string;
  location: LocationDTO;
  type: AccommodationType;
  images: string[]; // Array of image URLs
  amenities: AmenityDTO[];
  rating: number;
  minNumberOfGuests: number;
  maxNumberOfGuests: number;
  availability: AvailabilityDTO[];
  pricePerNight: number;
  pricePerGuest: boolean;
  cancellationDeadline: number;
}

export interface LocationDTO {
  id: number;
  country: string;
  city: string;
  address: string;
}

export enum AccommodationType {
  // Define your accommodation types if available
  // For example:
  APARTMENT = 'Apartment',
  HOTEL = 'Hotel',
  // Add more types as needed
}

export interface AvailabilityDTO {
  id: number;
  startDate: string; // Change type to string if using ISO date string
  endDate: string; // Change type to string if using ISO date string
  specialPrice: number;
}

export interface AmenityDTO {
  id: number;
  name: string;
  description: string;
  icon: string;
}
