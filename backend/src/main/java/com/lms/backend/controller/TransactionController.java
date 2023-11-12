package com.lms.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.backend.dto.TransactionResponseDto;
import com.lms.backend.services.TransactionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/transaction")
@Tag(name = "Transaction controller", description = "Manage Transaction")

public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping("/five")
    @Operation(summary = "Get transaction", description = "To retrieve last five transaction")
    public List<TransactionResponseDto> getAllNotifications() {
        return transactionService.getLastFiveTransaction();
    }
}
