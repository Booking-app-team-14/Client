import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateAccountComponent } from './update-account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UpdateAccountService } from './update-account.service';
import { By } from '@angular/platform-browser';
import { mapTo, of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('UpdateAccountComponent', () => {
  let component: UpdateAccountComponent;
  let fixture: ComponentFixture<UpdateAccountComponent>;

  const updateAccountServiceSpy = jasmine.createSpyObj('UpdateAccountService', ['updateAccount', 'uploadImage', 'getUserFromId', 'getUserIdFromToken']);

  updateAccountServiceSpy.getUserIdFromToken.and.returnValue(of({ token: 'mockToken' }));
  updateAccountServiceSpy.getUserFromId.and.returnValue(of({ id: 1 }));
  updateAccountServiceSpy.updateAccount.and.returnValue(of({}));
  updateAccountServiceSpy.uploadImage.and.returnValue(of({}));

  beforeEach(async () => {

    updateAccountServiceSpy.updateAccount.calls.reset();
    updateAccountServiceSpy.uploadImage.calls.reset();
    updateAccountServiceSpy.getUserFromId.calls.reset();
    updateAccountServiceSpy.getUserIdFromToken.calls.reset();
  
    await TestBed.configureTestingModule({
      declarations: [UpdateAccountComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule,
        CommonModule, MatIconModule, RouterLink],
      providers: [
        { provide: UpdateAccountService, useValue: updateAccountServiceSpy }
      ]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(UpdateAccountComponent);
    component = fixture.componentInstance;

    component.currentUser = {
      token: "mockToken",
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the account, with only details', () => {
    component.password = "password";
    component.passwordConfirm = "password";
    component.phone = "+381000000001";
    component.address = "123 Main St";
    component.firstName = "John";
    component.lastName = "Doe";
    component.userId = 1;

    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(updateAccountServiceSpy.uploadImage).toHaveBeenCalledTimes(0);
    expect(updateAccountServiceSpy.updateAccount).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('User data updated successfully!');
  });

  it('should update the account, with only the profile image', () => {
    component.fileUploaded = true;
    component.avatarImageType = "jpeg";
    component.avatarBytes = "mockBytes";
    component.userId = 1;

    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(updateAccountServiceSpy.uploadImage).toHaveBeenCalledTimes(1);
    expect(updateAccountServiceSpy.updateAccount).toHaveBeenCalledTimes(0);
    expect(window.alert).toHaveBeenCalledWith('Avatar updated successfully!');
  });

  it('should update the account, with all details and profile image', () => {
    component.password = "password";
    component.passwordConfirm = "password";
    component.phone = "+381000000001";
    component.address = "123 Main St";
    component.firstName = "John";
    component.lastName = "Doe";
    component.userId = 1;

    component.fileUploaded = true;
    component.avatarImageType = "jpeg";
    component.avatarBytes = "mockBytes";

    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(updateAccountServiceSpy.uploadImage).toHaveBeenCalledTimes(1);
    expect(updateAccountServiceSpy.updateAccount).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('User data updated successfully!');
  });

  it('should update the account, with some details and profile image', () => {
    component.password = "password";
    component.passwordConfirm = "password";
    component.phone = "+381000000001";
    component.address = "123 Main St";
    component.userId = 1;

    component.fileUploaded = true;
    component.avatarImageType = "jpeg";
    component.avatarBytes = "mockBytes";

    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(updateAccountServiceSpy.uploadImage).toHaveBeenCalledTimes(1);
    expect(updateAccountServiceSpy.updateAccount).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('User data updated successfully!');
  });

  it('should update the account, with some details and no profile image', () => {
    component.password = "password";
    component.passwordConfirm = "password";
    component.phone = "+381000000001";
    component.address = "123 Main St";
    component.userId = 1;

    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(updateAccountServiceSpy.uploadImage).toHaveBeenCalledTimes(0);
    expect(updateAccountServiceSpy.updateAccount).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('User data updated successfully!');
  });

  it('should not update the account, error while updating user avatar', () => {
    component.fileUploaded = true;
    component.avatarImageType = "gif";
    component.avatarBytes = "mockBytes";
    component.userId = 1;
  
    updateAccountServiceSpy.uploadImage.and.returnValue(
      throwError('Error while updating user avatar!')
    );
    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(updateAccountServiceSpy.uploadImage).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('Error while updating user avatar!');

    updateAccountServiceSpy.uploadImage.and.returnValue(of({}));
  });

  it('should not update the account, password too short', () => {
    component.password = "short";
    component.passwordConfirm = "short";

    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Password must be at least 8 characters long!');
  });

  it('should not update the account, passwords do not match', () => {
    component.password = "password";
    component.passwordConfirm = "password1";

    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
  });

  it('should not update the account, phone number not valid', () => {
    component.phone = "123456789";
    
    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Phone number is not valid!\nExample: +381012345678');
  });

  it('should not update the account, address too short', () => {
    component.address = "123";

    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Address must be at least 5 characters long!');
  });

  it('should not update the account, first name too short', () => {
    component.firstName = "J";

    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('First name must be at least 2 characters long!');
  });

  it('should not update the account, last name too short', () => {
    component.lastName = "D";

    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Last name must be at least 2 characters long!');
  });

  it('should not update the account, no details changed', () => {
    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('No changes made!');
  });

  it('should not update the account, with all details incorrect', () => {
    component.password = "password";
    component.passwordConfirm = "password1";
    component.phone = "123456789";
    component.address = "123";
    component.firstName = "J";
    component.lastName = "D";

    spyOn(window, 'alert');

    fixture.debugElement.query(By.css('#update-details-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
  });

});
