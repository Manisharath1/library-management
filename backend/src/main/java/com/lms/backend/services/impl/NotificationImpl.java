package com.lms.backend.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.lms.backend.constants.NotificationStateStatus;
import com.lms.backend.constants.NotificationStatus;
import com.lms.backend.model.Notification;
import com.lms.backend.repository.NotificationRepository;
import com.lms.backend.services.NotificationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public Notification sendNotification(Notification notification) {
        var notificationId = UUID.randomUUID().toString();
        var status = NotificationStatus.UNREAD;
        var state = NotificationStateStatus.ACTIVE;

        notification.setNotificationId(notificationId);
        notification.setStatus(status);
        notification.setState(state);

        notificationRepository.save(notification);
        return notification;
    }

    @Override
    public List<Notification> markAsRead(String receiverUserId) {
        var notifications = notificationRepository.findAllByReceiverUserIdAndStatus(receiverUserId,
                NotificationStatus.UNREAD);

        var lists = notifications.stream().map(notification -> {
            notification.setStatus(NotificationStatus.READ);
            return notification;
        }).toList();

        notificationRepository.saveAll(lists);
        return lists;
    }

    @Override
    public List<Notification> getAllNotification() {
        return notificationRepository.findAllByState(NotificationStateStatus.ACTIVE);
    }

    @Override
    public Notification deleteNotification(String notificationId) {
        var oldNotification = notificationRepository.findById(notificationId).orElseThrow();

        oldNotification.setState(NotificationStateStatus.INACTIVE);

        notificationRepository.save(oldNotification);
        return oldNotification;
    }

    @Override
    public List<Notification> findAllByReceiverUserIdStatus(String receiverUserId, NotificationStatus status) {
        return notificationRepository.findAllByReceiverUserIdAndStatus(receiverUserId, status);
    }

}
