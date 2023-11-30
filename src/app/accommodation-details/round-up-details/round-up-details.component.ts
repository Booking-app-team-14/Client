import { Component, Input } from '@angular/core';

interface Owner {
  name: string;
  picture: string;
}

interface place {
  name: string;
  address: string;
  owner: Owner;
  description: string;

}

@Component({
  selector: 'app-round-up-details',
  templateUrl: './round-up-details.component.html',
  styleUrls: ['./round-up-details.component.css']
})
export class RoundUpDetailsComponent {
  @Input() place: place;

  constructor() {}
}
