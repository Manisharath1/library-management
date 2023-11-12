package com.lms.backend.dto;

/**
 * UserRequestDto
 */
public record UserRequestDto(String firstName,
        String lastName,
        String referenceNumber,
        String email,
        String password, String batchId,
        int semester) {
}