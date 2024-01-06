import {Component, Input, OnInit} from '@angular/core';
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
  @Input() owner!: owner;
  userAccount:any;
  owner1:Owner;

  constructor(private accommodationService:RoundUpDetailsService) {}

  ngOnInit(): void {
    this.getUserAccount();
    this.owner1.name= this.userAccount.firstName+" " +this.userAccount.lastName;
    this.owner1.picture = this.userAccount.imageType;
    this.owner1.pictureBytes=this.userAccount.imageBytes;
  }

  getUserAccount(): void {
    this.accommodationService.getUserAccountById(this.place.ownerId).subscribe(
      (response) => {
        this.userAccount = response;
        console.log('User Account:', this.userAccount);

      },
      (error) => {
        console.error('Error fetching user account:', error);
        // Handle error appropriately
      }
    );
  }
}
