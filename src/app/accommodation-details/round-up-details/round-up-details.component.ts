import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {AccommodationDetailsService} from "../accommodation-details.service";
import {RoundUpDetailsService} from "./round-up-details.service";

interface Owner {
  name: string;
  picture: string;
  pictureBytes:string;
}

interface place {
  ownerId:number
  name: string;
  address: string;
  description: string;
  id:number;
}
interface owner1 {
  name: string,
  picture: string
}

interface owner{
  name: string;
  picture: string;
  pictureBytes:string;
}

@Component({
  selector: 'app-round-up-details',
  templateUrl: './round-up-details.component.html',
  styleUrls: ['./round-up-details.component.css']
})
export class RoundUpDetailsComponent implements OnInit {
  @Input() place: place;
  @Input() owner: Owner;
  userAccount:any;
  owner1:Owner;

  constructor(private accommodationService:RoundUpDetailsService) {}

  ngOnInit(): void {

    this.accommodationService.getUserById(this.place.ownerId).subscribe(
      (response) => {
        this.userAccount = response;
        console.log('User Account:', this.userAccount);
        this.owner1.name= this.userAccount.firstName+" " +this.userAccount.lastName;

      },
      (error) => {
        console.error('Error fetching user account:', error);
        // Handle error appropriately
      }
    );

  }
}
