package com.lms.backend.services;

import java.util.List;

import com.lms.backend.constants.NotificationStatus;
import com.lms.backend.model.Notification;

public interface NotificationService {
    Notification sendNotification(Notification notification);

    List<Notification> markAsRead(String notificationId);

    List<Notification> getAllNotification();

    Notification deleteNotification(String id);

    List<Notification> findAllByReceiverUserIdStatus(String receiverUserId, NotificationStatus notificationStatus);
}
