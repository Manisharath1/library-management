package com.lms.backend.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public record BookIssueResponseDto(String bookIssueId,
                String bookReferenceNumber,
                String bookName,
                String author,
                String studentReferenceNumber,
                String status,
                @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime issuedDate,
                String issuedBy) {

}
