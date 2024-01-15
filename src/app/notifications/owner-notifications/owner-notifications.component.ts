import { Component, OnInit } from '@angular/core';
import { NotificationsService } from "../notifications.service";

@Component({
  selector: 'app-owner-notifications',
  templateUrl: './owner-notifications.component.html',
  styleUrls: ['./owner-notifications.component.css']
})
export class OwnerNotificationsComponent implements OnInit {

  notifications = [];

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit() {
    const userId = 1;
    this.notificationsService.subscribeToNotifications(userId).subscribe(mockNotifications => {
      this.notifications = mockNotifications;
      console.log('Mocked Notifications Received:', this.notifications);
    });
  }
}
