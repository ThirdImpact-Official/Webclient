export interface GetNotificationDto extends BaseDto {
    id: number;
    title: string;
    content: string;
    isRead: boolean;
    notificationTypeId: number;
    notificationType: NotificationType;
    userId: number;
    creationDate: string | null;
    updatedDate: string | null;
}