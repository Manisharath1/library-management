package com.lms.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lms.backend.dto.AdminRequestDto;
import com.lms.backend.dto.UserRequestDto;
import com.lms.backend.dto.UserResponseDto;
import com.lms.backend.model.User;
import com.lms.backend.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Tag(name = "User controller", description = "Manage users")
public class UserController {
    private final UserService userService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create user", description = "create new user")
    public UserResponseDto createUser(@RequestBody UserRequestDto userRequestDto) {
        var user = new User();
        BeanUtils.copyProperties(userRequestDto, user);
        return convertToUserResponseDto(userService.createUser(user));
    }

    @PostMapping("/create/admin")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create admin", description = "create new admin")
    public UserResponseDto createAdmin(@RequestBody AdminRequestDto userRequestDto) {
        var user = new User();
        BeanUtils.copyProperties(userRequestDto, user);
        return convertToUserResponseDto(userService.createAdmin(user));
    }

    @PutMapping("/update/{userId}")
    @Operation(summary = "Update user", description = "Update user basic details")
    @ApiResponse(responseCode = "200", description = "On successful update")
    @ApiResponse(responseCode = "500", description = "User not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    public UserResponseDto updateUser(@RequestBody UserRequestDto userRequestDto, @PathVariable String userId) {
        var user = new User();
        BeanUtils.copyProperties(userRequestDto, user);
        return convertToUserResponseDto(userService.updateUser(user, userId));
    }

    @DeleteMapping("/delete/{userId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @Operation(summary = "Delete user", description = "Inactive a user by user id")
    @ApiResponse(responseCode = "200", description = "On successful delete")
    @ApiResponse(responseCode = "500", description = "User not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    public UserResponseDto deleteUser(@PathVariable String userId) {
        return convertToUserResponseDto(userService.deleteUser(userId));
    }

    @GetMapping("/users")
    @Operation(summary = "Get users", description = "To retrive all users data")
    public List<UserResponseDto> getUsers() {
        return userService.getUsers().stream().map(this::convertToUserResponseDto).toList();
    }

    @GetMapping("/admins")
    @Operation(summary = "Get admins", description = "To retrive all admins data")
    public List<UserResponseDto> getAdmins() {
        return userService.getAdmins().stream().map(this::convertToUserResponseDto).toList();
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Get user by id", description = "To retrive a single user by user id")
    @ApiResponse(responseCode = "200", description = "On successful retrive")
    @ApiResponse(responseCode = "500", description = "User not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    public UserResponseDto getUserById(@PathVariable String userId) {
        return convertToUserResponseDto(userService.getUserById(userId));
    }

    @GetMapping("/byreferencenumber/{referenceNumber}")
    @Operation(summary = "Get user by reference number", description = "To retrive a single user by reference number")
    @ApiResponse(responseCode = "200", description = "On successful retrive")
    @ApiResponse(responseCode = "500", description = "User not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    public UserResponseDto getUserByReferenceNumber(@PathVariable String referenceNumber) {
        return convertToUserResponseDto(userService.getUserByReferenceNumber(referenceNumber));
    }

    @PutMapping("/approve/{userId}")
    @Operation(summary = "Approve user", description = "Approve user by id")
    @ApiResponse(responseCode = "200", description = "On successful approval")
    @ApiResponse(responseCode = "500", description = "User not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    public UserResponseDto approveUser(@PathVariable String userId) {
        return convertToUserResponseDto(userService.approveUser(userId));
    }

    @GetMapping("/pending")
    @Operation(summary = "Get the list of all pending user", description = "To retrive all pending user")
    public List<UserResponseDto> getAllPendingUser() throws JsonProcessingException {
        var pendingUsers = userService.findAllPendingUser();
        return pendingUsers.stream().map(this::convertToUserResponseDto).toList();
    }

    @PostMapping("/{userId}/upload/image")
    public Map<String, String> uploadImage(@PathVariable String userId, @RequestParam("file") MultipartFile file) {
        userService.saveUserImage(userId, file);
        return Map.of("message", "Image uploaded");
    }

    @GetMapping("/{userId}/image/{version}")
    public ResponseEntity<Resource> userImage(@PathVariable String userId) {
        var file = userService.getImage(userId);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"");
        return ResponseEntity.ok()
                .headers(headers)
                .body(file);
    }

    private UserResponseDto convertToUserResponseDto(User user) {
        var image = "/user/%s/image/%d".formatted(user.getUserId(), user.getVersion());

        return new UserResponseDto(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getReferenceNumber(),
                image,
                user.getUserRole());
    }
}
