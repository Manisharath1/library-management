package com.lms.backend.controller;

import java.util.List;

import com.lms.backend.dto.BatchRequestDto;
import com.lms.backend.model.Batch;
import com.lms.backend.services.BatchService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/batch")
@Tag(name = "Batch controller", description = "Manage batch")
public class BatchController {

    private final BatchService batchService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    @Operation(summary = "Create batch", description = "Create a new batch")
    public Batch addBatch(@RequestBody BatchRequestDto batchRequestDto) {
        var batch = new Batch();
        BeanUtils.copyProperties(batchRequestDto, batch);
        return batchService.addBatch(batch);
    }

    @GetMapping
    @Operation(summary = "Get batches", description = "To retrive all batch data")
    public List<Batch> getAllBatch() {
        return batchService.getAllBatch();
    }

    @GetMapping("/{batchId}")
    @Operation(summary = "Get batch by id", description = "Retrive a batch by it's batch id")
    @ApiResponse(responseCode = "200", description = "On successful retrival")
    @ApiResponse(responseCode = "500", description = "Batch not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    public Batch getBatchById(@PathVariable String batchId) {
        return batchService.getBatchById(batchId);
    }

    @GetMapping("/name/{batchName}")
    @Operation(summary = "Get batch by name", description = "Retrive all the batch containing this string")
    public List<Batch> getBatchByName(@PathVariable String batchName) {
        return batchService.getBatchByName(batchName);
    }

    @DeleteMapping("/{batchId}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @Operation(summary = "Delete batch", description = "Inactive a batch by batch id")
    @ApiResponse(responseCode = "200", description = "On successful delete")
    @ApiResponse(responseCode = "500", description = "Batch not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    public Batch deleteBatchById(@PathVariable String batchId) {
        return batchService.deleteBatchById(batchId);
    }

    @GetMapping("/active")
    @Operation(summary = "Get all active batch", description = "To retrive all the active batch")
    public List<Batch> getAllActiveBatch() {
        return batchService.getAllActiveBatch();
    }

    @GetMapping("/inactive")
    @Operation(summary = "Get all inactive batch", description = "To retrive all the inactive batch")
    public List<Batch> getAllInActiveBatch() {
        return batchService.getAllInActiveBatch();
    }

    @PutMapping("/{batchId}")
    @Operation(summary = "Update batch", description = "Update batch basic details")
    @ApiResponse(responseCode = "200", description = "On successful update")
    @ApiResponse(responseCode = "500", description = "Batch not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    public Batch updateBatch(@RequestBody BatchRequestDto batchRequestDto, @PathVariable String batchId) {
        Batch batch = new Batch();
        BeanUtils.copyProperties(batchRequestDto, batch);
        return batchService.updateBatch(batch, batchId);
    }

    @PutMapping("/activate/{batchId}")
    @Operation(summary = "Make inactive batch active", description = "Update as active through batchId")
    @ApiResponse(responseCode = "200", description = "On successful change")
    @ApiResponse(responseCode = "500", description = "Batch not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    public Batch markAsActive(@PathVariable String batchId) {
        Batch batch = batchService.getBatchById(batchId);
        return batchService.markAsActive(batch);
    }
}
