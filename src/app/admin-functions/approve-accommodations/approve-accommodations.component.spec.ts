import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAccommodationsComponent } from './approve-accommodations.component';

describe('ApproveAccommodationsComponent', () => {
  let component: ApproveAccommodationsComponent;
  let fixture: ComponentFixture<ApproveAccommodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveAccommodationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
