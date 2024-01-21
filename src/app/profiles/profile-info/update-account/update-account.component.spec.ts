import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UpdateAccountComponent } from './update-account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UpdateAccountService } from './update-account.service';
import { By } from '@angular/platform-browser';

describe('UpdateAccountComponent', () => {
  let component: UpdateAccountComponent;
  let fixture: ComponentFixture<UpdateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAccountComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAccountComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the account, only details', () => {
    const service = fixture.debugElement.injector.get(UpdateAccountService);
    let mockUser: any;
    component.password = "password";
    component.passwordConfirm = "password";
    component.phone = "+381000000001";
    component.address = "123 Main St";
    component.firstName = "John";
    component.lastName = "Doe";
    component.userId = 1;
    mockUser = {
      password: component.password,
      firstName: component.firstName,
      lastName: component.lastName,
      address: component.address,
      phoneNumber: component.phone
    };

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(service.updateAccount(mockUser, 1)).toHaveBeenCalledTimes(1);
    expect(service.uploadImage(mockUser, 1)).toHaveBeenCalledTimes(0);
  });

  it('should update the account, specifically the profile image', () => {
    const service = fixture.debugElement.injector.get(UpdateAccountService);
    component.fileUploaded = true;
    component.avatarImageType = "jpeg";
    component.avatarBytes = "mockBytes";
    component.userId = 1;

    fixture.debugElement.query(By.css('#update-avatar-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(service.uploadImage(component.avatarBytes, component.userId)).toHaveBeenCalledTimes(1);
  });

  it('should update the account, with all details and profile image', () => {
    const service = fixture.debugElement.injector.get(UpdateAccountService);
    let mockUser: any;
    component.password = "password";
    component.passwordConfirm = "password";
    component.phone = "+381000000001";
    component.address = "123 Main St";
    component.firstName = "John";
    component.lastName = "Doe";
    component.userId = 1;
    component.avatarImageType = "jpeg";
    component.avatarBytes = "mockBytes";
    mockUser = {
      password: component.password,
      firstName: component.firstName,
      lastName: component.lastName,
      address: component.address,
      phoneNumber: component.phone
    };

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(service.updateAccount(mockUser, 1)).toHaveBeenCalledTimes(1);
    expect(service.uploadImage(component.avatarBytes, component.userId)).toHaveBeenCalledTimes(1);
  });

  it('should not update the account, error while updating user avatar', () => {
    const service = fixture.debugElement.injector.get(UpdateAccountService);
    component.avatarImageType = "jpeg";
    component.avatarBytes = "mockBytes";
    component.userId = 1;
    spyOn(service, 'uploadImage').and.throwError('Error while updating user avatar!');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(service.uploadImage(component.avatarBytes, component.userId)).toThrowError('Error while updating user avatar!');
  });

  it('should not update the account, password too short', () => {
    component.password = "short";
    component.passwordConfirm = "short";

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    let alertSpy = jasmine.createSpyObj('alert', ['show']);
    spyOn(window, 'alert').and.callThrough();
    expect(alertSpy.show).toHaveBeenCalledWith('Password must be at least 8 characters long!');
  });

  it('should not update the account, passwords do not match', () => {
    component.password = "password";
    component.passwordConfirm = "password1";

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    let alertSpy = jasmine.createSpyObj('alert', ['show']);
    spyOn(window, 'alert').and.callThrough();
    expect(alertSpy.show).toHaveBeenCalledWith('Passwords do not match!');
  });

  it('should not update the account, phone number not valid', () => {
    component.phone = "123456789";

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    let alertSpy = jasmine.createSpyObj('alert', ['show']);
    spyOn(window, 'alert').and.callThrough();
    expect(alertSpy.show).toHaveBeenCalledWith('Phone number is not valid!\nExample: +381012345678');
  });

  it('should not update the account, address too short', () => {
    component.address = "123";

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    let alertSpy = jasmine.createSpyObj('alert', ['show']);
    spyOn(window, 'alert').and.callThrough();
    expect(alertSpy.show).toHaveBeenCalledWith('Address must be at least 5 characters long!');
  });

  it('should not update the account, first name too short', () => {
    component.firstName = "J";

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    let alertSpy = jasmine.createSpyObj('alert', ['show']);
    spyOn(window, 'alert').and.callThrough();
    expect(alertSpy.show).toHaveBeenCalledWith('First name must be at least 2 characters long!');
  });

  it('should not update the account, last name too short', () => {
    component.lastName = "D";

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    let alertSpy = jasmine.createSpyObj('alert', ['show']);
    spyOn(window, 'alert').and.callThrough();
    expect(alertSpy.show).toHaveBeenCalledWith('Last name must be at least 2 characters long!');
  });

});
