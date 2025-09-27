package com.projectpurple.backend.controller;

import com.projectpurple.backend.config.JwtTokenProvider;
import com.projectpurple.backend.model.User;
import com.projectpurple.backend.repository.UserRepository;
import com.projectpurple.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailAvailability(@RequestParam String email) {
        try {
            Map<String, Object> result = authService.checkEmailAvailability(email);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", "Failed to check email"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request) {
        try {
            String name = request.get("name");
            String email = request.get("email");
            String password = request.get("password");

            User user = authService.registerUser(name, email, password);
            String token = tokenProvider.generateToken(user);

            return new ResponseEntity<>(Map.of(
                    "token", token,
                    "user", Map.of(
                            "id", user.getId(),
                            "name", user.getName(),
                            "email", user.getEmail()
                    ),
                    "message", "User registered successfully",
                    "status", "registration_success"
            ), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(Map.of(
                    "error", e.getMessage(),
                    "status", "registration_failed"
            ), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");

            if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                        "error", "Email and password are required",
                        "status", "login_failed"
                ));
            }

            return authService.authenticateUser(email, password)
                    .map(user -> {
                        String token = tokenProvider.generateToken(user);
                        return ResponseEntity.ok(Map.of(
                                "token", token,
                                "user", Map.of(
                                        "id", user.getId(),
                                        "name", user.getName(),
                                        "email", user.getEmail()
                                ),
                                "status", "login_success",
                                "message", "Login successful"
                        ));
                    })
                    .orElseGet(() -> {
                        // Check if email exists to provide more specific error message
                        boolean emailExists = userRepository.existsByEmail(email);
                        if (emailExists) {
                            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                                    "error", "Password does not match",
                                    "status", "login_failed"
                            ));
                        } else {
                            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                                    "error", "Email not registered",
                                    "status", "login_failed"
                            ));
                        }
                    });
        } catch (Exception e) {
            // Ensure we always return valid JSON even in unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "error", "An unexpected error occurred",
                    "status", "login_failed"
            ));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(Authentication authentication) {
        // Clear authentication context
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of(
                "message", "Logout successful",
                "status", "logout_success"
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "error", "Not authenticated",
                    "status", "unauthenticated"
            ));
        }

        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(Map.of(
                "user", Map.of(
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail()
                ),
                "status", "authenticated"
        ));
    }
}
