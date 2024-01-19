import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {UserService} from "../../login/user.service";
import { Router } from '@angular/router';
import { WebSocketService } from '../../shared/notifications/websocket.service';
import { Observable, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import SockJS from 'sockjs-client/dist/sockjs.js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnDestroy, OnInit {

  userRole: string = '';
  socket: any;
  notificationsNumber: string = "0";

  constructor(private userService: UserService, private webSocketService: WebSocketService, private http: HttpClient) {
    this.userService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  ngOnInit(): void {
    this.getUserInfo().subscribe(username => {
      this.socket = this.webSocketService.subscribeToSocket('/topic/notifications', username, () => {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.http.get<any>(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe(userId => {
          this.http.get<any>(`http://localhost:8080/api/notifications/` + userId).subscribe(notificationDTOs => {

            for (let notification of notificationDTOs) {
              if (notification.seen == false) {
                if (this.notificationsNumber == "9+") return;
                if (Number(this.notificationsNumber) == 9) {
                  this.notificationsNumber = "9+";
                }
                this.notificationsNumber = String(Number(this.notificationsNumber) + 1);
              }
            }
    
          });
        });
      });

    });
  }

  ngAfterViewInit(): void {
    try {
      this.userRole = this.userService.getUserRole();
    } catch (error) { }
  }

  ngOnDestroy(): void {
    if (this.socket) this.socket.close();
    this.notificationsNumber = "0";
  }

  getUserInfo(): Observable<string> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<any>(`http://localhost:8080/api/users/token/${currentUser.token}`).pipe(
      switchMap((info: any) => {
        return this.getUserAccount(info).pipe(
          map((userData: any) => userData.username)
        );
      })
    );
  }

  getUserAccount(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/users/${userId}`);
  }

  numberOfNotifications(): Number {
    return Number(this.notificationsNumber);
  }

  resetNotificationNumber(): void {
    this.notificationsNumber = "0";
  }

}