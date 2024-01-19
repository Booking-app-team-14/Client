import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRoleSubject = new BehaviorSubject<string>('');

  userRole$: Observable<string> = this.userRoleSubject.asObservable();

  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
    this.userRoleSubject.next(role);
  }

  getUserRole(): string {
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      this.userRoleSubject.next(storedUserRole);
    }
    return this.userRoleSubject.value;
  }

  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    this.userRoleSubject.next('');
  }

}
