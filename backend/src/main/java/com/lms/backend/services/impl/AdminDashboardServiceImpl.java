package com.lms.backend.services.impl;

import org.springframework.stereotype.Service;

import com.lms.backend.constants.BookIssueStatus;
import com.lms.backend.constants.UserRole;
import com.lms.backend.constants.UserStatus;
import com.lms.backend.dto.DashboardResponseDto;
import com.lms.backend.repository.BatchRepository;
import com.lms.backend.repository.BookIssueRepository;
import com.lms.backend.repository.BookRepository;
import com.lms.backend.repository.UserRepository;
import com.lms.backend.services.AdminDashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {
    private final BookRepository bookRepository;
    private final BatchRepository batchRepository;
    private final BookIssueRepository issueRepository;
    private final UserRepository userRepository;

    @Override
    public DashboardResponseDto getDetails() {
        var totalBook = bookRepository.count();
        var totalBatch = batchRepository.count();
        var totalIssuedBook = issueRepository.countByStatus(BookIssueStatus.ISSUED);
        var totalAdmin = userRepository.countByUserRole(UserRole.ADMIN);
        var totalStudent = userRepository.countByUserRoleAndUserStatus(UserRole.USER, UserStatus.ACTIVE);

        return new DashboardResponseDto(totalBook, totalAdmin, totalStudent, totalBatch, totalIssuedBook);
    }

}
