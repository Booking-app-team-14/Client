// user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$: Observable<string> = this.userRoleSubject.asObservable();

  setUserRole(role: string): void {
    this.userRoleSubject.next(role);
  }

  getUserRole(): string {
    return this.userRoleSubject.value;
  }
}
