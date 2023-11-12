package com.lms.backend.dto;

public record BookRequestDto(
                String bookName,
                String referenceNumber,
                String description,
                String author,
                String shelfNumber,
                String batchId,
                int semester) {
}

// List<String> batch is missing
