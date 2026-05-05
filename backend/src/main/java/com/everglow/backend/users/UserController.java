package com.everglow.backend.users;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * REST Controller — exposes User CRUD API.
 * Base URL: /api/users
 *
 * ENDPOINTS:
 *   POST   /api/users/register          → create user (public)
 *   POST   /api/users/login             → login       (public)
 *   GET    /api/users                   → all users   (admin)
 *   GET    /api/users/{id}              → single user
 *   PUT    /api/users/{id}              → update user
 *   DELETE /api/users/{id}              → hard delete (admin)
 *   PATCH  /api/users/{id}/deactivate   → soft delete (admin)
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")   // Vite dev server
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ─── REGISTER (Create) ─────────────────────────────────────────────────────

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@Valid @RequestBody UserDTO dto) {
        UserResponseDTO created = userService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // ─── LOGIN ─────────────────────────────────────────────────────────────────

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email    = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
        }

        UserResponseDTO user = userService.login(email, password);
        return ResponseEntity.ok(user);
    }

    // ─── GET ALL (Admin) ───────────────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // ─── GET ONE ───────────────────────────────────────────────────────────────

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // ─── UPDATE ────────────────────────────────────────────────────────────────

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDTO dto) {
        return ResponseEntity.ok(userService.updateUser(id, dto));
    }

    // ─── DELETE (hard) ─────────────────────────────────────────────────────────

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    // ─── DEACTIVATE (soft delete) ──────────────────────────────────────────────

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<UserResponseDTO> deactivateUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.deactivateUser(id));
    }

    // ─── Global Exception Handlers ─────────────────────────────────────────────

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNotFound(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> handleDuplicate(UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentials(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> handleInactive(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", ex.getMessage()));
    }
}
