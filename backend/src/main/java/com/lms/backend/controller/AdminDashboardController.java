package com.lms.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.backend.dto.DashboardResponseDto;
import com.lms.backend.services.AdminDashboardService;

import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/dashboard")
@Tag(name = "Admin controller", description = "Admin dashboard data")
public class AdminDashboardController {
    private final AdminDashboardService dashboardService;

    @GetMapping
    public DashboardResponseDto allDetails() {
        return dashboardService.getDetails();
    }
}
