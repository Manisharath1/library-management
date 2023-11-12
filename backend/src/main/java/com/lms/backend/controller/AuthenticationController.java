package com.lms.backend.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.backend.dto.LoginRequestDto;
import com.lms.backend.dto.LoginResponseDto;
import com.lms.backend.dto.UserResponseDto;
import com.lms.backend.model.User;
import com.lms.backend.services.TokenService;
import com.lms.backend.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/login")
@RequiredArgsConstructor
@Tag(name = "Authentication controller", description = "Manage authentication")
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserService userService;

    @PostMapping
    @Operation(summary = "Sign in", description = "Sign in to application")
    @ApiResponse(responseCode = "200", description = "On successful login")
    @ApiResponse(responseCode = "500", description = "User not found", content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    public LoginResponseDto login(@RequestBody LoginRequestDto dto) {
        var usernamePasswordAuthentication = new UsernamePasswordAuthenticationToken(dto.username(), dto.password());
        var authenticate = authenticationManager.authenticate(usernamePasswordAuthentication);

        SecurityContextHolder.getContext().setAuthentication(authenticate);
        var token = tokenService.generateToken(authenticate);

        return new LoginResponseDto(token);
    }

    @GetMapping("/user")
    public UserResponseDto getCurrentUser(Principal principal) {
        var user = userService.getUserByReferenceNumber(principal.getName());
        return convertToUserResponseDto(user);
    }

    @GetMapping("/user/role")
    public Map<String, String> getCurrentUserRole(Principal principal) {
        var user = userService.getUserByReferenceNumber(principal.getName());
        return Map.of("role", user.getUserRole().name());
    }

    private UserResponseDto convertToUserResponseDto(User user) {
        var profilePic = user.getProfilePic();
        var image = profilePic != null ? "/user/%s/image/%d".formatted(user.getUserId(), user.getVersion()) : null;
        
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
