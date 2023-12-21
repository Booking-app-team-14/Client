import { Component, Input } from '@angular/core';

interface Owner {
  name: string;
  picture: string;
}

interface place {
  name: string;
  address: string;
  description: string;
}

interface owner{
  name: string;
  picture: string;
}

@Component({
  selector: 'app-round-up-details',
  templateUrl: './round-up-details.component.html',
  styleUrls: ['./round-up-details.component.css']
})
export class RoundUpDetailsComponent {
  @Input() place: place;
  @Input() owner!: owner;

  constructor() {}
}
