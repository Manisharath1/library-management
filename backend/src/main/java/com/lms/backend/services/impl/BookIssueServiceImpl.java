package com.lms.backend.services.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.lms.backend.constants.BookIssueStatus;
import com.lms.backend.constants.BookStatus;
import com.lms.backend.dto.BookIssueResponseDto;
import com.lms.backend.model.Book;
import com.lms.backend.model.BookIssue;
import com.lms.backend.repository.BookIssueRepository;
import com.lms.backend.repository.BookRepository;
import com.lms.backend.repository.UserRepository;
import com.lms.backend.services.BookIssueService;
import com.lms.backend.services.TransactionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookIssueServiceImpl implements BookIssueService {
    private final BookIssueRepository bookIssueRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final TransactionService transactionService;

    @Override
    public BookIssue issueBook(BookIssue bookIssue) {
        var referenceNumber = bookIssue.getStudentReferenceNumber();
        var student = userRepository.existsByReferenceNumber(referenceNumber);

        if (!student) {
            throw new RuntimeException("Student not found");
        }

        var bookIssueId = UUID.randomUUID().toString();
        var issueStatus = BookIssueStatus.ISSUED;
        var now = LocalDateTime.now();
        var bookReferenceNumber = bookIssue.getBookReferenceNumber();
        var book = bookRepository.findByReferenceNumber(bookReferenceNumber).orElseThrow();

        bookIssue.setBookIssueId(bookIssueId);
        bookIssue.setStatus(issueStatus);
        bookIssue.setIssuedDate(now);

        var bookStatus = book.getStatus();
        var availableStock = book.getAvailableStock();

        if (bookStatus != BookStatus.OUTOFSTOCK && availableStock > 0) {
            BookIssue savedBookIssue = bookIssueRepository.save(bookIssue);
            CompletableFuture.runAsync(() -> {
                if (savedBookIssue.getBookIssueId() != null) {
                    int avaiableStock = book.getAvailableStock() - 1;
                    book.setAvailableStock(avaiableStock);
                    bookRepository.save(book);
                    transactionService.createTransaction(savedBookIssue);
                }
            });
        } else {
            throw new RuntimeException("Book out of stock");
        }

        return bookIssue;
    }

    @Override
    public BookIssue returnBook(String bookIssueId) {
        var existingIssuedBook = bookIssueRepository.findById(bookIssueId).orElseThrow();
        existingIssuedBook.setStatus(BookIssueStatus.RETURNED);
        var bookId = existingIssuedBook.getBookReferenceNumber();
        var book = bookRepository.findByReferenceNumber(bookId).orElseThrow();

        BookIssue savedBookIssue = bookIssueRepository.save(existingIssuedBook);

        CompletableFuture.runAsync(() -> {
            if (savedBookIssue.getBookIssueId() != null) {
                int avaiableStock = book.getAvailableStock() + 1;
                book.setAvailableStock(avaiableStock);
                bookRepository.save(book);
                transactionService.updateTransaction(bookIssueId);
            }
        });

        return existingIssuedBook;
    }

    public List<BookIssueResponseDto> getAllIssuedBook() {
        var sort = Sort.by(Direction.DESC, "issuedDate");
        var bookIssues = bookIssueRepository.findAll(sort);

        return getResponse(bookIssues);
    }

    public List<BookIssueResponseDto> getAllIssuedBook(BookIssueStatus status) {
        var bookIssues = bookIssueRepository.findByStatus(status);
        return getResponse(bookIssues);
    }

    @Override
    public List<BookIssueResponseDto> getAllIssuedBook(String referenceNumber) {
        var books = bookIssueRepository.findByStudentReferenceNumber(referenceNumber);
        return getResponse(books);
    }

    private List<BookIssueResponseDto> getResponse(List<BookIssue> bookIssues) {
        var refenceNumbers = bookIssues.stream().map(bookIssue -> bookIssue.getBookReferenceNumber()).toList();
        var books = bookRepository.findAllByReferenceNumberIn(refenceNumbers);

        var map = new HashMap<String, Book>();
        books.forEach(book -> map.put(book.getReferenceNumber(), book));

        return bookIssues.stream().map(bookIssue -> {
            var studentReferenceNumber = bookIssue.getStudentReferenceNumber();
            var issuedDate = bookIssue.getIssuedDate();
            var issuedBy = bookIssue.getIssuedBy();
            var status = bookIssue.getStatus().name();
            var bookIssueId = bookIssue.getBookIssueId();
            var bookReferenceNumber = bookIssue.getBookReferenceNumber();
            var book = map.get(bookReferenceNumber);
            var bookName = book.getBookName();
            var author = book.getAuthor();

            return new BookIssueResponseDto(bookIssueId, bookReferenceNumber,
                    bookName, author, studentReferenceNumber, status, issuedDate,
                    issuedBy);
        }).toList();
    }
}
