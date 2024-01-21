import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationWallComponent } from './notification-wall.component';

describe('NotificationWallComponent', () => {
  let component: NotificationWallComponent;
  let fixture: ComponentFixture<NotificationWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationWallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
