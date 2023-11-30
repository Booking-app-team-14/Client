import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrl: './accommodation-details.component.css'
})
export class AccommodationDetailsComponent {
  images = [
    {imageSrc: 'assets/details1.jpg', imageAlt: "accommodation"},
    {imageSrc: 'assets/details4.jpg', imageAlt: "accommodation"},
    {imageSrc: 'assets/details1.jpg', imageAlt: "accommodation"},
    {imageSrc: 'assets/mainPagePicture.jpg', imageAlt: "accommodation"},
    {imageSrc: 'assets/details3.avif', imageAlt: "accommodation"}
  ];

  places =
    {
      name: "Apartment1",
      address: "Street Ww.",
      owner: {name: "Nick Jefferson", picture: 'assets/BG.png'},
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
      "eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"+
      "quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat."+
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        "eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"+
        "quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat."
    };
}
