package com.lms.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.lms.backend.constants.UserRole;
import com.lms.backend.model.User;
import com.lms.backend.constants.UserStatus;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findAllByUserRole(UserRole userRole);

    Optional<User> findByReferenceNumber(String referenceNumber);

    List<User> findByUserStatus(UserStatus userStatus);
    
    boolean existsByReferenceNumber(String referenceNumber);

    long countByUserRole(UserRole userRole);

    long countByUserRoleAndUserStatus(UserRole userRole, UserStatus userStatus);
}
