package com.lms.backend.dto;

public record NotificationRequestDto(
                String message,
                String senderUserId,
                String receiverUserId) {

}
