package com.lms.backend.services;

import java.util.List;

import com.lms.backend.constants.BookIssueStatus;
import com.lms.backend.dto.BookIssueResponseDto;
import com.lms.backend.model.BookIssue;

public interface BookIssueService {
    BookIssue issueBook(BookIssue bookIssue);

    BookIssue returnBook(String bookIssueId);

    List<BookIssueResponseDto> getAllIssuedBook();

    List<BookIssueResponseDto> getAllIssuedBook(BookIssueStatus status);

    List<BookIssueResponseDto> getAllIssuedBook(String referenceNumber);
}
