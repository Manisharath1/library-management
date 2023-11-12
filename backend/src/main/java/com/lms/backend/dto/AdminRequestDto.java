package com.lms.backend.dto;

/**
 * UserRequestDto
 */
public record AdminRequestDto(
        String firstName,
        String lastName,
        String referenceNumber,
        String email,
        String password) {
}