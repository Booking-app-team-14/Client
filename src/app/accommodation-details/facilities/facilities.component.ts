import { Component } from '@angular/core';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.css'
})
export class FacilitiesComponent {
  facilities: any[] = [
    { icon: 'assets/home-wifi 1.png', name: 'Wi-Fi' },
    { icon: 'assets/lifebuoy 1.png', name: 'Pool' },
    { icon: 'assets/car 1.png', name: 'Parking' },
    { icon: 'assets/home-wifi 1.png', name: 'Wi-Fi' },
    { icon: 'assets/lifebuoy 1.png', name: 'Pool' },
    { icon: 'assets/car 1.png', name: 'Parking' },
  ];
}
