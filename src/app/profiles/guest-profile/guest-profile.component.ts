import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrl: './guest-profile.component.css'
})
export class GuestProfileComponent {

  @Input()
  user: {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phone: string,
    avatarPath: string
  };

  range: any = new FormGroup({
    start: new FormControl({ value: '', disabled: true }),
    end: new FormControl({ value: '', disabled: true }),
  });

  @ViewChild('startDateRef') startDateElement: ElementRef;
  @ViewChild('endDateRef') endDateElement: ElementRef;

  startDate: Date;
  endDate: Date;

  startDateChangeEvent(){
    this.startDate = this.startDateElement.nativeElement.value;
  }

  endDateChangeEvent(){
    this.endDate = this.endDateElement.nativeElement.value;
  }

}
