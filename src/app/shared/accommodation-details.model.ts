export interface AccommodationDTO {
  id: number;
  name: string;
  description: string;
  location: LocationDTO;
  type: AccommodationType;
  images: string[];
  imagesType: string[],
  imagesBytes: string[]
  amenities: AmenityDTO[];
  rating: number;
  minNumberOfGuests: number;
  maxNumberOfGuests: number;
  availability: AvailabilityDTO[];
  pricePerNight: number;
  pricePerGuest: boolean;
  cancellationDeadline: number;
  owner_Id:number;
}
export interface OwnerDTO {
  role:"OWNER";
  imagesRepository:{};
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  verified: true;
  numberOfReports: number;
  profilePictureType: "png";
  profilePictureBytes: "";
  reservationsIds: [];
  accommodationsIds: [];
  blocked: boolean;

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
