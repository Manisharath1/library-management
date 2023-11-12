package com.lms.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.lms.backend.model.Batch;
import com.lms.backend.constants.BatchStatus;

public interface BatchRepository extends MongoRepository<Batch, String> {
    List<Batch> findByBatchNameContainingIgnoreCase(String partialName);

    List<Batch> findByStatus(BatchStatus status);
}
