package com.lms.backend.services;

import java.util.List;

import com.lms.backend.dto.TransactionResponseDto;
import com.lms.backend.model.BookIssue;
import com.lms.backend.model.Transaction;

/**
 * TransactionService
 */
public interface TransactionService {
    Transaction createTransaction(BookIssue bookIssue);

    void updateTransaction(String bookIssueId);

    List<TransactionResponseDto> getLastFiveTransaction();
    
    List<Transaction> getDemandindBook();
}