package com.lms.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.lms.backend.model.Transaction;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    Transaction findByBookIssueId(String bookIssueId);

    List<Transaction> findTop5ByCreatedDateBeforeOrderByCreatedDateDesc(LocalDateTime currentDateTime);

    @Aggregation(pipeline = {
            "{ $group: { _id: '$bookReferenceNumber', count: { $sum: 1 }, transactions: { $push: '$$ROOT' } } }",
            "{ $match: { count: { $gte: 2 } } }",
            "{ $unwind: '$transactions' }",
            "{ $replaceRoot: { newRoot: '$transactions' } }"
    })
    List<Transaction> findTransactionsForBookReferenceNumbersWithAtLeastTwoEntries();
}
