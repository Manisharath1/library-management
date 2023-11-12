package com.lms.backend.services;

import java.util.List;

import com.lms.backend.model.Batch;

public interface BatchService {
    public Batch addBatch(Batch batch);

    public List<Batch> getAllBatch();

    public List<Batch> getBatchByName(String batchName);

    public Batch getBatchById(String batchId);

    public Batch deleteBatchById(String batchId);

    public List<Batch> getAllActiveBatch();

    public List<Batch> getAllInActiveBatch();

    public Batch updateBatch(Batch batch, String batchId);

    public Batch markAsActive(Batch batch);
}
