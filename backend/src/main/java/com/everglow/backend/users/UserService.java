package com.everglow.backend.users;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service layer — all business logic lives here.
 * Controller calls Service; Service calls Repository.
 * OOP principle: Single Responsibility — each method does ONE thing.
 */
@Service
@Transactional
public class UserService {

    // ─── Dependencies (Constructor Injection — OOP: Dependency Inversion) ──────

    private final UserRepository  userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository  = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ─── CREATE ────────────────────────────────────────────────────────────────

    /**
     * Register a new user.
     * Throws if email already exists.
     */
    public UserResponseDTO createUser(UserDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new UserAlreadyExistsException("Email already registered: " + dto.getEmail());
        }

        User user = new User(
            dto.getName(),
            dto.getEmail(),
            passwordEncoder.encode(dto.getPassword()),   // hash password
            dto.getRole() != null ? dto.getRole() : "USER",
            dto.getPhoneNumber()
        );
        user.setActive(true);

        User saved = userRepository.save(user);
        return UserResponseDTO.from(saved);
    }

    // ─── READ (all) ────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponseDTO::from)
                .collect(Collectors.toList());
    }

    // ─── READ (single) ─────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(Long id) {
        User user = findOrThrow(id);
        return UserResponseDTO.from(user);
    }

    // ─── UPDATE ────────────────────────────────────────────────────────────────

    /**
     * Update user details.
     * Password is only changed if a new one is provided.
     */
    public UserResponseDTO updateUser(Long id, UserDTO dto) {
        User user = findOrThrow(id);

        // Check email uniqueness only if email changed
        if (!user.getEmail().equals(dto.getEmail()) &&
            userRepository.existsByEmail(dto.getEmail())) {
            throw new UserAlreadyExistsException("Email already in use: " + dto.getEmail());
        }

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setActive(dto.isActive());

        if (dto.getRole() != null && !dto.getRole().isBlank()) {
            user.setRole(dto.getRole());
        }

        // Only re-hash & update password if a new one was sent
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        User updated = userRepository.save(user);
        return UserResponseDTO.from(updated);
    }

    // ─── DELETE ────────────────────────────────────────────────────────────────

    /**
     * Hard delete — removes user from database.
     */
    public void deleteUser(Long id) {
        User user = findOrThrow(id);
        userRepository.delete(user);
    }

    // ─── SOFT DELETE (deactivate) ──────────────────────────────────────────────

    /**
     * Soft delete — marks user as inactive instead of removing.
     */
    public UserResponseDTO deactivateUser(Long id) {
        User user = findOrThrow(id);
        user.setActive(false);
        return UserResponseDTO.from(userRepository.save(user));
    }

    // ─── LOGIN ─────────────────────────────────────────────────────────────────

    /**
     * Validate credentials and return user info (no JWT — simple session approach).
     */
    @Transactional(readOnly = true)
    public UserResponseDTO login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("No account found with email: " + email));

        if (!user.isActive()) {
            throw new IllegalStateException("This account has been deactivated.");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Incorrect password.");
        }

        return UserResponseDTO.from(user);
    }

    // ─── Private Helper ────────────────────────────────────────────────────────

    private User findOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }
}
