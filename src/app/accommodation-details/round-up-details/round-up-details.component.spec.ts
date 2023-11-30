import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundUpDetailsComponent } from './round-up-details.component';

describe('RoundUpDetailsComponent', () => {
  let component: RoundUpDetailsComponent;
  let fixture: ComponentFixture<RoundUpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoundUpDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoundUpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
