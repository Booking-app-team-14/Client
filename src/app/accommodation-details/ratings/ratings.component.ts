import { Component } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.css'
})
export class RatingsComponent {
  averageRating: number = 4.2;
  numberOfReviews: number = 35;

  ratings: any[] = [
    { aspect: 'Location', value: 4.5 },
    { aspect: 'Cleanliness', value: 4.2 },
    { aspect: 'Check-in', value: 4.8 },
    { aspect: 'Value', value: 4.3 },
    { aspect: 'Accuracy', value: 4.1 }
  ];
}
