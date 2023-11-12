package com.lms.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.lms.backend.constants.BookIssueStatus;
import com.lms.backend.model.BookIssue;

public interface BookIssueRepository extends MongoRepository<BookIssue, String> {
    List<BookIssue> findByStatus(BookIssueStatus status);

    long countByStatus(BookIssueStatus status);

    List<BookIssue> findByStudentReferenceNumber(String studentReferenceNumber);

}
