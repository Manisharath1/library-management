package com.lms.backend.dto;

import com.lms.backend.constants.UserRole;

public record UserResponseDto(
        String userId, String firstName,
        String lastName, String email,
        String referenceNumber,
        String profilePic, UserRole role) {
}
