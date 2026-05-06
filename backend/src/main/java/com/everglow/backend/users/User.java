package com.everglow.backend.users;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    // ─── Fields ────────────────────────────────────────────────────────────────

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100)
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password is required")
    @Column(nullable = false)
    private String password;          // stored as BCrypt hash

    @Column(nullable = false)
    private String role = "USER";     // "USER" or "ADMIN"

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ─── Lifecycle ─────────────────────────────────────────────────────────────

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ─── Constructors ──────────────────────────────────────────────────────────

    public User() {}

    public User(String name, String email, String password, String role, String phoneNumber) {
        this.name        = name;
        this.email       = email;
        this.password    = password;
        this.role        = role;
        this.phoneNumber = phoneNumber;
    }

    // ─── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId()                        { return id; }
    public void setId(Long id)                 { this.id = id; }

    public String getName()                    { return name; }
    public void setName(String name)           { this.name = name; }

    public String getEmail()                   { return email; }
    public void setEmail(String email)         { this.email = email; }

    public String getPassword()                { return password; }
    public void setPassword(String password)   { this.password = password; }

    public String getRole()                    { return role; }
    public void setRole(String role)           { this.role = role; }

    public String getPhoneNumber()                     { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber)     { this.phoneNumber = phoneNumber; }

    public boolean isActive()                  { return active; }
    public void setActive(boolean active)      { this.active = active; }

    public LocalDateTime getCreatedAt()        { return createdAt; }
    public LocalDateTime getUpdatedAt()        { return updatedAt; }
}
