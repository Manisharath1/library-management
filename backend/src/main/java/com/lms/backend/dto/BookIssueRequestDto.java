package com.lms.backend.dto;

public record BookIssueRequestDto(
        String bookReferenceNumber,
        String studentReferenceNumber) {

}
