package com.everglow.backend.users;

import java.time.LocalDateTime;

/**
 * Response DTO — never exposes the password hash.
 */
public class UserResponseDTO {

    private Long          id;
    private String        name;
    private String        email;
    private String        role;
    private String        phoneNumber;
    private boolean       active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ─── Static factory ────────────────────────────────────────────────────────

    public static UserResponseDTO from(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.id          = user.getId();
        dto.name        = user.getName();
        dto.email       = user.getEmail();
        dto.role        = user.getRole();
        dto.phoneNumber = user.getPhoneNumber();
        dto.active      = user.isActive();
        dto.createdAt   = user.getCreatedAt();
        dto.updatedAt   = user.getUpdatedAt();
        return dto;
    }

    // ─── Getters ───────────────────────────────────────────────────────────────

    public Long          getId()          { return id; }
    public String        getName()        { return name; }
    public String        getEmail()       { return email; }
    public String        getRole()        { return role; }
    public String        getPhoneNumber() { return phoneNumber; }
    public boolean       isActive()       { return active; }
    public LocalDateTime getCreatedAt()   { return createdAt; }
    public LocalDateTime getUpdatedAt()   { return updatedAt; }
}
