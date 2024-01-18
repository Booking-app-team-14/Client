import { AfterViewInit, Component } from '@angular/core';
import { NotificationDTO, NotificationType } from '../../shared/notifications/notification';
import { NotificationsService } from '../notifications.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notification-wall',
  templateUrl: './notification-wall.component.html',
  styleUrl: './notification-wall.component.css'
})
export class NotificationWallComponent {

  // notifications: NotificationDTO[];
  notifications: any[];
  role: string = localStorage.getItem('userRole');
  checkboxCreated: boolean = true;
  checkboxCancelled: boolean = true;
  checkboxResponse: boolean = true;
  checkboxOwnerReviewed: boolean = true;
  checkboxAccommodationReviewed: boolean = true;

  constructor(private notificationService: NotificationsService, private http: HttpClient) {

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get<any>(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe(userId => {
      this.http.get<any>(`http://localhost:8080/api/notifications/` + userId).subscribe(notificationDTOs => {

        this.notifications = notificationDTOs;

      });
    });

    // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.http.get<any>(`http://localhost:8080/api/users/token/${currentUser.token}`).subscribe(userId => {
    //   this.http.get<any>(`http://localhost:8080/api/users/${userId}`).subscribe(user => {
    //     console.log(user);
    //     user.notWantedNotificationTypes.forEach(type => {
    //       console.log(type);
    //       switch (type) {
    //         case 'RESERVATION_REQUEST_CREATED':
    //           this.checkboxCreated = false;
    //           break;
    //         case 'RESERVATION_REQUEST_CANCELLED':
    //           this.checkboxCancelled = false;
    //           break;
    //         case 'RESERVATION_REQUEST_RESPONSE':
    //           this.checkboxResponse = false;
    //           break;
    //         case 'OWNER_REVIEWED':
    //           this.checkboxOwnerReviewed = false;
    //           break;
    //         case 'ACCOMMODATION_REVIEWED':
    //           this.checkboxAccommodationReviewed = false;
    //           break;
    //       }
    //     });
    //   });
    // });

  }

}
