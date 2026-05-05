package com.everglow.backend.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository layer — Spring Data JPA handles all SQL automatically.
 * Add custom query methods here as needed.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find by email (used for login & duplicate check)
    Optional<User> findByEmail(String email);

    // Check email exists (used before creating)
    boolean existsByEmail(String email);

    // Fetch only active users
    List<User> findByActiveTrue();

    // Fetch users by role
    List<User> findByRole(String role);
}
