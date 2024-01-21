import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {MonthlyReportService} from "./monthly-report.service";
import {AccommodationDetailsService} from "../../accommodation-details/accommodation-details.service";
import jsPDF from 'jspdf';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {
  reportForm: FormGroup;
  accommodationReports: any[];
  accommodationDetails: any;
  accommodationId: number;

  constructor(private fb: FormBuilder, private reportService: MonthlyReportService,
              private accommodationService: AccommodationDetailsService, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      year: [null, Validators.required],
    });
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.accommodationId = id;

      this.loadAccommodationDetails(id);
    })
  }

  generateReport(accommodationId: number) {
    if (this.reportForm.valid) {
      const year = this.reportForm.get('year').value;

      this.reportService.getMonthlyAccommodationReports(accommodationId, year).subscribe(
        (data) => {
          this.accommodationReports = Object.values(data);
        },
        (error) => {
          console.error('Error fetching reports', error);
        }
      );
    }
  }

  loadAccommodationDetails(accommodationId: number) {
    this.accommodationService.getAccommodationById(accommodationId).subscribe(
      (data) => {
        this.accommodationDetails = data;
      },
      (error) => {
        console.error('Error fetching accommodation details', error);
      }
    );
  }

  downloadPDF() {
    const pdf = new jsPDF();
    const year = this.reportForm.get('year').value;

    pdf.text('Monthly Accommodation Report', 20, 10);
    pdf.text(`Accommodation Name: ${this.accommodationDetails.name}`, 20, 20);
    pdf.text(`YEAR: ${year}`, 20, 30);

    pdf.setFontSize(10);

    let yPosition = 40;

    this.accommodationReports.forEach((report, index) => {
      const line1 = `Month: ${report.month} | Number of Reservations: ${report.numberOfReservations} | Total Profit: ${report.totalProfit} $`;
      const contentHeight = pdf.getTextDimensions(line1).h ;
      if (yPosition + contentHeight > pdf.internal.pageSize.height) {

        pdf.addPage();
        yPosition = 10;
      }

      pdf.text(line1, 20, yPosition);

      yPosition += contentHeight + 10;
    });

    pdf.save('monthly_accommodation_report.pdf');
  }

}
