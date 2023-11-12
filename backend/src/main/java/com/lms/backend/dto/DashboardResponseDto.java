package com.lms.backend.dto;

public record DashboardResponseDto(long totalBook, long totalAdmin, long totalStudent, long totalBatch,
        long issuedBooks) {
}
