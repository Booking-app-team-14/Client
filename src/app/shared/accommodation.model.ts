export  interface Accommodation {
  id: number;
  name: string;
  description: string;
  accommodationType: string;
  imageType: string,
  imageBytes: string
  rating: number;
  maxNumberOfGuests: number;
  pricePerNight: number;
  approved:boolean;

}
