package com.lms.backend.dto;

public record BatchRequestDto(
        String batchName,
        boolean isSemesterApplicable,
        int totalSemester) {
}
