package com.lms.backend.services;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.lms.backend.model.User;

public interface UserService {
    User createUser(User user);

    User createAdmin(User user);

    User updateUser(User user, String userId);

    User deleteUser(String userId);

    List<User> getUsers();

    List<User> getAdmins();

    User getUserById(String userId);

    User getUserByReferenceNumber(String referenceNumber);

    User approveUser(String userId);

    List<User> findAllPendingUser();

    String saveUserImage(String bookId, MultipartFile file);

    Resource getImage(String bookId);
}
