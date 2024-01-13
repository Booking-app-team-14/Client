import { TestBed } from '@angular/core/testing';

import { EachAccommodationReportService } from './each-accommodation-report.service';

describe('EachAccommodationReportService', () => {
  let service: EachAccommodationReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EachAccommodationReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
