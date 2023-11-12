package com.lms.backend.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.lms.backend.constants.UserRole;
import com.lms.backend.constants.UserStatus;
import com.lms.backend.model.User;
import com.lms.backend.repository.UserRepository;
import com.lms.backend.services.StorageService;
import com.lms.backend.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final StorageService storageService;

    @Override
    public User createUser(User user) {
        var referenceNumber = user.getReferenceNumber();
        var isExists = userRepository.existsByReferenceNumber(referenceNumber);

        if (isExists) {
            throw new RuntimeException("Account already exists");
        }

        var encodePassword = passwordEncoder.encode(user.getPassword());
        var userId = UUID.randomUUID().toString();
        var userRole = UserRole.USER;
        var userStatus = UserStatus.PENDING_APPROVAL;

        user.setPassword(encodePassword);
        user.setUserId(userId);
        user.setUserRole(userRole);
        user.setUserStatus(userStatus);

        userRepository.save(user);
        return user;
    }

    @Override
    public User createAdmin(User user) {
        var referenceNumber = user.getReferenceNumber();
        var isExists = userRepository.existsByReferenceNumber(referenceNumber);

        if (isExists) {
            throw new RuntimeException("Account already exists");
        }

        var encodePassword = passwordEncoder.encode(user.getPassword());
        var userId = UUID.randomUUID().toString();
        var userRole = UserRole.ADMIN;
        var userStatus = UserStatus.ACTIVE;

        user.setPassword(encodePassword);
        user.setUserId(userId);
        user.setUserRole(userRole);
        user.setUserStatus(userStatus);

        userRepository.save(user);
        return user;
    }

    @Override
    public User updateUser(User user, String userId) {
        var oldUser = userRepository.findById(userId).orElseThrow();

        oldUser.setFirstName(user.getFirstName());
        oldUser.setFirstName(user.getLastName());
        oldUser.setEmail(user.getEmail());
        oldUser.setReferenceNumber(user.getReferenceNumber());
        oldUser.setUserStatus(user.getUserStatus());

        userRepository.save(oldUser);
        return oldUser;
    }

    @Override
    public User deleteUser(String userId) {
        var user = userRepository.findById(userId).orElseThrow();
        user.setUserStatus(UserStatus.INACTIVE);

        userRepository.save(user);
        return user;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAllByUserRole(UserRole.USER);
    }

    @Override
    public List<User> getAdmins() {
        return userRepository.findAllByUserRole(UserRole.ADMIN);
    }

    @Override
    public User getUserById(String userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    @Override
    public User getUserByReferenceNumber(String referenceNumber) {
        return userRepository.findByReferenceNumber(referenceNumber).orElseThrow();
    }

    @Override
    public User approveUser(String userId) {
        var user = userRepository.findById(userId).orElseThrow();
        user.setUserStatus(UserStatus.ACTIVE);

        userRepository.save(user);
        return user;
    }

    @Override
    public List<User> findAllPendingUser() {
        return userRepository.findByUserStatus(UserStatus.PENDING_APPROVAL);
    }

    @Override
    public String saveUserImage(String userId, MultipartFile file) {
        var user = userRepository.findById(userId).orElseThrow();
        var location = storageService.store(file, "user/");

        user.setProfilePic(location);
        userRepository.save(user);

        return location;
    }

    @Override
    public Resource getImage(String bookId) {
        var book = userRepository.findById(bookId).orElseThrow();
        return storageService.load(book.getProfilePic());
    }
}
