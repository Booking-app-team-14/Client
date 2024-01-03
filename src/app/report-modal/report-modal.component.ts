import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent {
  @Input() showModal: boolean;
  @Output() closeModalEvent = new EventEmitter();
  @Output() submitReportEvent = new EventEmitter<string>();

  reportReason: string = '';

  closeModal() {
    this.closeModalEvent.emit();
  }

  submitReport() {
    this.submitReportEvent.emit(this.reportReason);
    this.closeModal();
  }
}

