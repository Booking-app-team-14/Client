import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-approve-accommodations',
  templateUrl: './approve-accommodations.component.html',
  styleUrl: './approve-accommodations.component.css'
})
export class ApproveAccommodationsComponent {

  type: string = "fiber_new";

  accommodations: any[];

  constructor(private http: HttpClient) {

    this.http.get('http://localhost:8080/api/accommodations/requests').subscribe({
      next: (accommodations: any[]) => {

        this.accommodations = accommodations;

        for (let i = 0; i < this.accommodations.length; i++) {
          if(this.accommodations[i].requestType == "new") this.accommodations[i].requestType = "fiber_new";
          else if(this.accommodations[i].requestType == "updated") this.accommodations[i].requestType = "autorenew";
        }

      },
      error: (err) => {
        console.error(err);
        alert("Error while fetching accommodations!");
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
    //
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
    //
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
    // TODO: open accommodation details page
    alert("Accommodation " + id + " details!");
  }

}
