export interface AccommodationDTO {
  id: number;
  name: string;
  description: string;
  location: LocationDTO;
  type: AccommodationType;
  images: string[];
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
  APARTMENT = 'Apartment',
  HOTEL = 'Hotel',
  ROOM = 'Room',
  VILLA = 'VILLA',
  STUDIO = 'StUDIO',

}

export interface AvailabilityDTO {
  id: number;
  startDate: string;
  endDate: string;
  specialPrice: number;
}

export interface AmenityDTO {
  id: number;
  name: string;
  description: string;
  icon: string;
}
