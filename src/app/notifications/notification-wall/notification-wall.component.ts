import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { WebSocketService } from '../../shared/notifications/websocket.service';
import { AppComponent } from '../../app.component';
import { response } from 'express';

@Component({
  selector: 'app-notification-wall',
  templateUrl: './notification-wall.component.html',
  styleUrl: './notification-wall.component.css'
})
export class NotificationWallComponent implements OnInit, OnDestroy {

  socket: any;
  notifications: any[];
  role: string = localStorage.getItem('userRole');
  checkboxCreated: boolean = true;
  checkboxCancelled: boolean = true;
  checkboxResponse: boolean = true;
  checkboxOwnerReviewed: boolean = true;
  checkboxAccommodationReviewed: boolean = true;

  constructor(private http: HttpClient, private webSocketService: WebSocketService, private appComponent: AppComponent) {

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get<any>(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe(userId => {

      this.http.get<any>(`http://localhost:8080/api/notifications/` + userId + "/" + true).subscribe(notificationDTOs => {
        this.notifications = notificationDTOs;
      });

      this.http.get<any>(`http://localhost:8080/api/users/${userId}/not-wanted-notifications`).subscribe(notWantedNotifications => {
        notWantedNotifications.forEach(type => {
          console.log(type);
          switch (type) {
            case 'RESERVATION_REQUEST_CREATED':
              this.checkboxCreated = false;
              break;
            case 'RESERVATION_REQUEST_CANCELLED':
              this.checkboxCancelled = false;
              break;
            case 'RESERVATION_REQUEST_RESPONSE':
              this.checkboxResponse = false;
              break;
            case 'OWNER_REVIEWED':
              this.checkboxOwnerReviewed = false;
              break;
            case 'ACCOMMODATION_REVIEWED':
              this.checkboxAccommodationReviewed = false;
              break;
          }
        });
      });

    });
  }

  ngOnInit(): void {

    this.getUserInfo().subscribe(username => {
      /*
      this.socket = this.webSocketService.subscribeToSocket('/topic/notifications', username, () => {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.http.get<any>(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe(userId => {
          this.http.get<any>(`http://localhost:8080/api/notifications/` + userId + `/` + true).subscribe(notificationDTOs => {

            this.notifications = notificationDTOs;

          });
        });
      });
*/
    });


  }

  ngOnDestroy(): void {
    if (this.socket) this.socket.close();
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

  updatePrefrences(type: string) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get<any>(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe(userId => {
      this.http.put<any>(`http://localhost:8080/api/users/${userId}/not-wanted-notifications`, type).subscribe(response => {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.http.get<any>(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe(userId => {
          this.http.get<any>(`http://localhost:8080/api/notifications/` + userId + "/" + true).subscribe(notificationDTOs => {

            this.notifications = notificationDTOs;

          });
        });

      });
    });
  }

}
