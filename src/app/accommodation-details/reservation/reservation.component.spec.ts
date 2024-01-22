import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ReservationComponent } from './reservation.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import {UserService} from "../../user-credentials/login/user.service";
import {ReservationService} from "./reservation.service";
import {RangeValidatorDirective} from "./appRangeValue.directive";

describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;
  let reservationService: jasmine.SpyObj<ReservationService>;
  let userService: UserService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {

    reservationService = jasmine.createSpyObj('ReservationService', ['postReservation']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [ReservationComponent, RangeValidatorDirective],
      imports: [FormsModule],
      providers: [
        { provide: ReservationService, useValue: reservationService },
        { provide: UserService, useClass: MockUserService }, // Provide a mock user service
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    });

    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  describe('when making a reservation', () => {
    it('should make a reservation successfully', fakeAsync(() => {
      // Mock necessary services and data
      //dateServiceSpy.getAvailableDates.and.returnValue(of(/* mock available dates */));
      userService.setUserRole('guest');
      spyOn(component, 'isDateAvailable').and.returnValue(true);

      // Set initial values
      component.defaultCheckInDate = '2024-01-23';
      component.defaultCheckOutDate = '2024-01-25';
      component.reservationRequirement = /* mock reservation requirement */;
      component.guestsInput.nativeElement.value = '3';

      // Trigger change detection
      fixture.detectChanges();

      // Call the makeReservation method
      component.makeReservation();

      // Expectations for a successful reservation
      expect(httpServiceSpy.postReservation).toHaveBeenCalled();
      expect(snackBarSpy.open).toHaveBeenCalledWith('Reservation request successful sent!', 'OK', { duration: 2000 });

      // Additional expectations as needed

      // Advance the fakeAsync clock to ensure any asynchronous code within fakeAsync completes
      tick();
    }));

    it('should handle reservation failure', fakeAsync(() => {
      // Mock necessary services and data
      dateServiceSpy.getAvailableDates.and.returnValue(of(/* mock available dates */));
      userService.setUserRole('guest');
      spyOn(component, 'isDateAvailable').and.returnValue(true);

      // Set initial values
      component.defaultCheckInDate = '2024-01-23';
      component.defaultCheckOutDate = '2024-01-25';
      component.reservationRequirement = /* mock reservation requirement */;
      component.guestsInput.nativeElement.value = '3';

      // Trigger change detection
      fixture.detectChanges();

      // Mock reservation failure
      httpServiceSpy.postReservation.and.returnValue(throwError({ status: 400 }));

      // Call the makeReservation method
      component.makeReservation();

      // Expectations for a failed reservation
      expect(httpServiceSpy.postReservation).toHaveBeenCalled();
      expect(snackBarSpy.open).not.toHaveBeenCalledWith('Reservation request successful sent!', 'OK', { duration: 2000 });

      // Additional expectations as needed

      // Advance the fakeAsync clock to ensure any asynchronous code within fakeAsync completes
      tick();
    }));
  });

  // Additional tests as needed
  // ...
});

class MockUserService {
  // Implement methods needed for testing without making actual HTTP requests
}
