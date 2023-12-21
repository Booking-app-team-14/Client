import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MainPageService} from "../main-page.service";
import {PagedResult} from "../../shared/paged-result.model";
import {Accommodation} from "../../shared/accommodation.model";


@Component({
  selector: 'app-best-offers',
  templateUrl: './best-offers.component.html',
  styleUrl: './best-offers.component.css'
})
export class BestOffersComponent implements OnInit{
  constructor(private router: Router, private  service:MainPageService) {}

  offers: Accommodation[] = []

  ngOnInit(): void{
  this.service.getBestOffers().subscribe({
    next: (result: Accommodation[]) => {
    this.offers = result;
    console.log(result);
    },
    error: (error:any) => {
      console.log(error);
    }
  })
  }
  redirectToSearchPage() {
    this.router.navigate(['/search']);
  }


}
