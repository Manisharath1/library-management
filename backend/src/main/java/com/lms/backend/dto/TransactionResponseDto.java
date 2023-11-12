package com.lms.backend.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public record TransactionResponseDto(String bookName,
        String author, String refrenceNumber,
        String issuedBy, String registrationNumber, String status,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime date) {

}
