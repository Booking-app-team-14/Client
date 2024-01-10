import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approve-accommodations',
  templateUrl: './approve-accommodations.component.html',
  styleUrl: './approve-accommodations.component.css'
})
export class ApproveAccommodationsComponent {

  type: string = "fiber_new";

  accommodations: any[];

  getPostedAgo(date: Date) {
    const now = Date.now();
    const difference = now - date.getTime();
    const seconds = difference / 1000;
    if (seconds < 60) {
      return "just now";
    } else if (seconds < 60 * 60) {
      return Math.floor(seconds / 60) + " minutes ago";
    } else if (seconds < 24 * 60 * 60) {
      return Math.floor(seconds / (60 * 60)) + " hours ago";
    } else {
      return Math.floor(seconds / (24 * 60 * 60)) + " days ago";
    }
  }

  constructor(private http: HttpClient, private _router: Router) {

    this.http.get('http://localhost:8080/api/accommodations/requests').subscribe({
      next: (accommodations: any[]) => {

        this.accommodations = accommodations;
        for (let i = 0; i < this.accommodations.length; i++) {
          if(this.accommodations[i].requestType == "new") this.accommodations[i].requestType = "fiber_new";
          else if(this.accommodations[i].requestType == "updated") this.accommodations[i].requestType = "autorenew";
          const date = new Date(parseInt(this.accommodations[i].dateRequested) * 1000);
          const formatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });
          this.accommodations[i].dateRequested = formatter.format(date);
          this.accommodations[i].postedAgo = this.getPostedAgo(date);
        }

      },
      error: (err) => {
        console.error(err);
        alert("Error while fetching accommodation requests!");
      }
    });

  }

  approve(id: number) {
    this.http.put('http://localhost:8080/api/accommodations/requests/' + id, {}).subscribe({
      next: (message: any) => {
        console.log(message);
      },
      error: (err) => {
        console.error(err);
        alert("Error while sending the PUT request!");
      }
    });
    this.addCardClass(id, "approved");
    this.animateCard(id);
    setTimeout(() => this.deleteCard(id), 1400);
  }

  reject(id: number) {
    this.http.delete('http://localhost:8080/api/accommodations/requests/' + id).subscribe({
      next: (message: any) => {
        console.log(message);
      },
      error: (err) => {
        console.error(err);
        alert("Error while sending the DELETE request!");
      }
    });
    this.addCardClass(id, "rejected");
    this.animateCard(id);
    setTimeout(() => this.deleteCard(id), 1400);
  }

  addCardClass(id: number, className: string) {
    let card = document.getElementById(`card-${id}`);
    if(card) {
      card.classList.add(className);
    }
  }

  deleteCard(id: number) {
    let card = document.getElementById(`card-${id}`);
    if(card) {
      card.remove();
      let index = this.accommodations.findIndex(obj => obj.id === id);
      if (index !== -1) {
        this.accommodations.splice(index, 1);
      }
    }
  }

  animateCard(id: number) {
    let card = document.getElementById(`card-${id}`);
    if(card) {
      setTimeout(() => {
        card.style.height = `${card.offsetHeight}px`;
        window.getComputedStyle(card).height;
        card.style.height = '0';
        card.style.padding = '0';
        card.style.marginBottom = '0';
      }, 600);
    }
  }

  viewDetails(id: number) {
    this._router.navigateByUrl('search/details/' + id);
  }

}
