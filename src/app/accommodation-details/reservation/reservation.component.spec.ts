import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservationComponent } from './reservation.component';
import { RangeValidatorDirective } from './appRangeValue.directive';
import { ReservationService } from './reservation.service';
import { of, throwError } from 'rxjs';
import {UserService} from "../../user-credentials/login/user.service";


describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;
  let reservationService: ReservationService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationComponent, RangeValidatorDirective],
      imports: [FormsModule, HttpClientModule],
      providers: [ReservationService, UserService],
    });

    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    reservationService = TestBed.inject(ReservationService);
    userService = TestBed.inject(UserService);

    component.reservationRequirement = {
      accommodationId: 1,
      ownerId: 3,
      accommodationName: "dgsfhdgfj",
      accommodationType: "STUDIO",
      accommodationRating: 2,
      pricePerNight: 100,
      minGuests: 2,
      maxGuests: 6,
      pricePerGuest: true,
      cancellationDeadline: 7,
    };
  });

  it('should create the reservation component', () => {
    expect(component).toBeTruthy();
  });

  it('should update check-out min date when check-in date changes', () => {
    // Mock necessary data
    component.userRole = 'guest';
    component.defaultCheckInDate = '2024-02-21';

    // Trigger change detection
    fixture.detectChanges();

    // Manually call the updateCheckOutMinDate method
    component.updateCheckOutMinDate();

    // Assert that the check-out min date is updated as expected
    expect(component.defaultCheckOutDate).toBe(component.defaultCheckInDate);
  });

  it('should disable reserve button when date is not available', () => {
    // Mock necessary data
    component.userRole = 'guest';
    component.defaultCheckInDate = '2024-01-21';

    // Trigger change detection
    fixture.detectChanges();

    // Assert that the reserve button is disabled
    expect(fixture.nativeElement.querySelector('.reserve-button').disabled).toBeTruthy();
  });

  // You can add more test cases for other functionality as needed

  // Clean up after each test
  afterEach(() => {
    fixture.destroy();
  });

  it('should make a reservation successfully', fakeAsync(() => {
    spyOn(reservationService, 'getGuestId').and.returnValue(of(1));
    spyOn(userService, 'getUserRole').and.returnValue('guest');

    component.userRole = 'guest';
    component.defaultCheckInDate = '2024-01-21';

    fixture.detectChanges();
    component.updateCheckOutMinDate();

    spyOn(reservationService, 'sendReservation').and.returnValue(of("/* mock response data */"));

    component.makeReservation();

    tick();

    expect(reservationService.getGuestId).toHaveBeenCalled();
    expect(component.userService.getUserRole).toHaveBeenCalled();
    expect(reservationService.sendReservation).toHaveBeenCalled();
  }));

  it('should handle reservation error', fakeAsync(() => {
    spyOn(reservationService, 'getGuestId').and.returnValue(of(1));

    spyOn(userService, 'getUserRole').and.returnValue('guest');

    component.userRole = 'guest';
    component.defaultCheckInDate = '2024-01-21';




    fixture.detectChanges();
    component.updateCheckOutMinDate();

    spyOn(reservationService, 'sendReservation').and.returnValue(throwError('Error'));

    spyOn(window, 'alert'); // Spy on the window.alert method

    component.makeReservation();

    tick();

    expect(reservationService.getGuestId).toHaveBeenCalled();
    expect(component.userService.getUserRole).toHaveBeenCalled();
    expect(reservationService.sendReservation).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Reservation request failed. Please try again later.');
  }));

  // Clean up after each test
  afterEach(() => {
    fixture.destroy();
  });

});
