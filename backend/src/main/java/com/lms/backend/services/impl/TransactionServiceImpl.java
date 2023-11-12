package com.lms.backend.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.lms.backend.constants.BookIssueStatus;
import com.lms.backend.dto.TransactionResponseDto;
import com.lms.backend.model.BookIssue;
import com.lms.backend.model.Transaction;
import com.lms.backend.repository.BookRepository;
import com.lms.backend.repository.TransactionRepository;
import com.lms.backend.repository.UserRepository;
import com.lms.backend.services.TransactionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Override
    public Transaction createTransaction(BookIssue bookIssue) {
        var transactionId = UUID.randomUUID().toString();
        var bookIssueId = bookIssue.getBookIssueId();
        var adminId = bookIssue.getIssuedBy();
        var bookReferenceNumber = bookIssue.getBookReferenceNumber();
        var studentId = bookIssue.getStudentReferenceNumber();
        var bookIssueStatus = bookIssue.getStatus();

        Transaction transaction = new Transaction();
        transaction.setTransactionId(transactionId);
        transaction.setBookIssueId(bookIssueId);
        transaction.setAdminId(adminId);
        transaction.setBookReferenceNumber(bookReferenceNumber);
        transaction.setStudentId(studentId);
        transaction.setStatus(bookIssueStatus);

        transactionRepository.save(transaction);
        return transaction;
    }

    @Override
    public void updateTransaction(String bookIssueId) {
        var existingIssuedBook = transactionRepository.findByBookIssueId(bookIssueId);
        Transaction transaction = new Transaction();
        transaction.setTransactionId(UUID.randomUUID().toString());
        transaction.setBookIssueId(existingIssuedBook.getBookIssueId());
        transaction.setAdminId(existingIssuedBook.getAdminId());
        transaction.setBookReferenceNumber(existingIssuedBook.getBookReferenceNumber());
        transaction.setStudentId(existingIssuedBook.getStudentId());
        transaction.setStatus(BookIssueStatus.RETURNED);

        transactionRepository.save(transaction);
    }

    @Override
    public List<TransactionResponseDto> getLastFiveTransaction() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        var transactions = transactionRepository.findTop5ByCreatedDateBeforeOrderByCreatedDateDesc(currentDateTime);

        return transactions.stream().map(this::convertTransactionDto).toList();
    }

    private TransactionResponseDto convertTransactionDto(Transaction transaction) {
        var bookReferenceNumber = transaction.getBookReferenceNumber();
        var book = bookRepository.findByReferenceNumber(bookReferenceNumber).orElseThrow();

        var adminId = transaction.getAdminId();
        var admin = userRepository.findByReferenceNumber(adminId).orElseThrow();
        var adminName = "%s %s".formatted(admin.getFirstName(), admin.getLastName());

        return new TransactionResponseDto(
                book.getBookName(),
                book.getAuthor(),
                bookReferenceNumber,
                adminName,
                transaction.getStudentId(),
                transaction.getStatus().name(),
                transaction.getUpdatedDate());
    }

    @Override
    public List<Transaction> getDemandindBook() {
        return transactionRepository.findTransactionsForBookReferenceNumbersWithAtLeastTwoEntries();
    }
}
