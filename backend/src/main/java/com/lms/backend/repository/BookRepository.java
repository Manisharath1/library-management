package com.lms.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.lms.backend.constants.BookStatus;
import com.lms.backend.model.Book;

public interface BookRepository extends MongoRepository<Book, String> {
    Optional<Book> findByReferenceNumber(String referenceNumber);

    List<Book> findAllByReferenceNumberIn(List<String> referenceNumber);

    List<Book> findAllByStatus(BookStatus status);

    List<Book> findByShelfNumber(String shelfNumber);

    List<Book> findByBatchId(String batchId);

    List<Book> findBySemester(int semester);

    List<Book> findAllByBatchIdAndSemester(String bookId, int semester);
}
