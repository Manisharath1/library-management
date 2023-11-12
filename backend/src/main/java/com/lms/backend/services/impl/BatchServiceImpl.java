package com.lms.backend.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.lms.backend.constants.BatchStatus;
import com.lms.backend.model.Batch;
import com.lms.backend.repository.BatchRepository;
import com.lms.backend.services.BatchService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BatchServiceImpl implements BatchService {
    private final BatchRepository batchRepository;

    @Override
    public Batch addBatch(Batch batch) {
        var batchId = UUID.randomUUID().toString();

        batch.setBatchId(batchId);
        batch.setStatus(BatchStatus.ACTIVE);

        batchRepository.save(batch);

        return batch;
    }

    @Override
    public List<Batch> getAllBatch() {
        return batchRepository.findAll();
    }

    @Override
    public List<Batch> getBatchByName(String batchName) {
        return batchRepository.findByBatchNameContainingIgnoreCase(batchName);
    }

    @Override
    public Batch getBatchById(String batchId) {
        return batchRepository.findById(batchId).orElseThrow();
    }

    @Override
    public Batch deleteBatchById(String batchId) {
        var oldBatch = batchRepository.findById(batchId).orElseThrow();

        oldBatch.setStatus(BatchStatus.INACTIVE);
        batchRepository.save(oldBatch);

        return oldBatch;
    }

    @Override
    public List<Batch> getAllActiveBatch() {
        return batchRepository.findByStatus(BatchStatus.ACTIVE);
    }

    @Override
    public List<Batch> getAllInActiveBatch() {
        return batchRepository.findByStatus(BatchStatus.INACTIVE);
    }

    @Override
    public Batch updateBatch(Batch batch, String batchId) {
        var oldBatch = batchRepository.findById(batchId).orElseThrow();

        oldBatch.setBatchName(batch.getBatchName());
        oldBatch.setSemesterApplicable(batch.isSemesterApplicable());
        oldBatch.setTotalSemester(batch.getTotalSemester());

        batchRepository.save(oldBatch);
        return oldBatch;
    }

    @Override
    public Batch markAsActive(Batch batch) {
        batch.setStatus(BatchStatus.ACTIVE);
        batchRepository.save(batch);

        return batch;
    }

}
