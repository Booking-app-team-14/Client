import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EachAccommodationReportService } from "./each-accommodation-report.service";
import jsPDF from "jspdf";
import {ReservationService} from "../../accommodation-details/reservation/reservation.service";

@Component({
  selector: 'app-each-accommodation-report',
  templateUrl: './each-accommodation-report.component.html',
  styleUrls: ['./each-accommodation-report.component.css']
})
export class EachAccommodationReportComponent implements OnInit {
  reportForm: FormGroup;
  accommodationReports: any[];
  private guestId: number;

  constructor(private fb: FormBuilder, private reportService: EachAccommodationReportService, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
  }

  generateReport() {
    if (this.reportForm.valid) {
      const startDate = this.reportForm.get('startDate').value;
      const endDate = this.reportForm.get('endDate').value;
      this.reservationService.getGuestId().subscribe(
        (userId: number) => {
          this.guestId = userId;
          console.log(this.guestId);
          this.reportService.getAccommodationReports(startDate, endDate,this.guestId).subscribe(
            (data: any[]) => {
              this.accommodationReports = data;
            },
            (error) => {
              console.error('Error fetching reports', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching user ID:', error);

        }
      );

    }
  }

  generatePDF() {
    const pdf = new jsPDF();
    let yPosition = 10;
    const startDate = this.reportForm.get('startDate').value;
    const endDate = this.reportForm.get('endDate').value;
    pdf.setFontSize(10);

    this.accommodationReports.forEach((report, index) => {

      pdf.text(`Accommodation Report ${index + 1}`, 20, yPosition);
      pdf.text(`Accommodation Name: ${report.accommodationName}`, 20, yPosition + 10);
      pdf.text(`Type: ${report.type}`, 20, yPosition + 20);
      pdf.text(`Rating: ${report.rating}`, 20, yPosition + 30);
      pdf.text(`Min Guests: ${report.minNumberOfGuests}`, 20, yPosition + 40);
      pdf.text(`Max Guests: ${report.maxNumberOfGuests}`, 20, yPosition + 50);
      pdf.text(`Price Per Night: ${report.pricePerNight}`, 20, yPosition + 60);
      pdf.text(`Number of Reservations: ${report.numberOfReservations}`, 20, yPosition + 70);
      pdf.text(`Total Profit: ${report.totalProfit} $`, 20, yPosition + 80);
      pdf.text(`Period: ${startDate} to ${endDate}`, 20, yPosition + 90);
      pdf.text('----------------------------------------', 20, yPosition + 100); // Separator

      yPosition += 110;

      const pageHeight = pdf.internal.pageSize.height;

      if (yPosition + 110 > pageHeight) {
        pdf.addPage();
        yPosition = 10;
      }
    });

    pdf.save('accommodations_report.pdf');
  }
  }
