import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachAccommodationReportComponent } from './each-accommodation-report.component';

describe('EachAccommodationReportComponent', () => {
  let component: EachAccommodationReportComponent;
  let fixture: ComponentFixture<EachAccommodationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EachAccommodationReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EachAccommodationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
