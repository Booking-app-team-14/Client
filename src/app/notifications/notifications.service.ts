import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Observable, of} from 'rxjs';
import { NotificationDTO } from '../shared/notifications/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private stompClient: Stomp.Client;

  constructor() {
    // this.initializeWebSocketConnection();
  }

  // initializeWebSocketConnection() {
  //   const socket = new SockJS('http://localhost:8080/socket');
  //   this.stompClient = Stomp.over(socket);
  //   this.stompClient.connect({}, () => {
  //     console.log('WebSocket Connected');
  //   });
  // }

  // subscribeToNotifications(userId: number): Observable<NotificationDTO> {
  //   return new Observable<any>(observer => {
  //     this.stompClient.subscribe(`/notifications/${userId}`, (message) => {
  //       // observer.next(message.body);
  //       observer.next(message);
  //     });
  //   });
  // }


}
