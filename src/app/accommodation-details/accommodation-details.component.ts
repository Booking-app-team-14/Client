import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrl: './accommodation-details.component.css'
})
export class AccommodationDetailsComponent {
  images=[
    {imageSrc:'assets/details1.jpg', imageAlt:"accommodation"},
    {imageSrc:'assets/details4.jpg', imageAlt:"accommodation"},
    {imageSrc:'assets/details1.jpg', imageAlt:"accommodation"},
    {imageSrc:'assets/mainPagePicture.jpg', imageAlt:"accommodation"},
    {imageSrc:'assets/details3.avif', imageAlt:"accommodation"}
  ];

}
