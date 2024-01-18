export class NotificationDTO {
  senderId: number;
  receiverId: number;
  sentAt: string; // epoch seconds
  seen: boolean;
  type: NotificationType;
}

export enum NotificationType {
  RESERVATION_REQUEST_CREATED,
  RESERVATION_REQUEST_CANCELLED,
  OWNER_REVIEWED,
  ACCOMMODATION_REVIEWED,
  RESERVATION_REQUEST_RESPONSE
}

export  class NotificationReservationCreated extends NotificationDTO {
  request:any;
}
export  class NotificationReservationCancelled extends NotificationDTO {
    request:any;
}

export  class NotificationReservationRequestResponse extends NotificationDTO {
  request:any;
}

export class NotificationOwnerReviewed extends NotificationDTO {
  review:any;
}

export class NotificationAcommodationReviewed extends NotificationDTO {
  review:any;
}
