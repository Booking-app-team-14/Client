import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private stompClient: Stomp.Client;

  constructor() {
    this.initializeWebSocketConnection();
  }
  private notifications = [
    { from: 1, to: 2, sentBefore: new Date().toISOString(), description: 'You have a new booking request.', seen: false },
    { from: 3, to: 1, sentBefore: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), description: 'A reservation has been canceled.', seen: true },];

  initializeWebSocketConnection() {
/*
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log('WebSocket Connected');
    });
    */

  }

  subscribeToNotifications(userId: number): Observable<any> {
    return of(this.notifications);
    /*
    return new Observable<any>(observer => {
      this.stompClient.subscribe(`/user/${userId}/topic/notifications`, (message) => {
        observer.next(message.body);


      });
    });
    */
  }


}
