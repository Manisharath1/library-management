package com.lms.backend.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lms.backend.constants.BookStatus;

public record BookResponseDto(
                String bookId,
                String bookName,
                String author,
                String description,
                String image,
                String referenceNumber,
                String batchName,
                int semester,
                String shelfNumber,
                int availableStock,
                BookStatus status,
                String createdBy,
                @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime createdDate,
                String updatedBy,
                @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime updatedDate) {

}
