import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestOffersComponent } from './best-offers.component';

describe('BestOffersComponent', () => {
  let component: BestOffersComponent;
  let fixture: ComponentFixture<BestOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
