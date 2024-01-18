export class NotificationDTO {
  id: number;
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

export class NotificationReservationCreatedDTO extends NotificationDTO {
  reservationRequestDTO: any;
}
export class NotificationReservationCancelledDTO extends NotificationDTO {
  reservationRequestDTO: any;
}
export class NotificationReservationRequestResponseDTO extends NotificationDTO {
  reservationRequestDTO: any;
  approved: boolean;
}
export class NotificationOwnerReviewedDTO extends NotificationDTO {
  reviewDTO: any;
}
export class NotificationAcommodationReviewedDTO extends NotificationDTO {
  reviewDTO: any;
}
