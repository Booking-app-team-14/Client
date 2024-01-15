import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerNotificationsComponent } from './owner-notifications.component';

describe('OwnerNotificationsComponent', () => {
  let component: OwnerNotificationsComponent;
  let fixture: ComponentFixture<OwnerNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
