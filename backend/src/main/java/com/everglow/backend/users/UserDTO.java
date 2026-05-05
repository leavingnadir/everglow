package com.everglow.backend.users;

/**
 * DTO used for Create / Update operations.
 * Password is only sent from client on register or password-change.
 * Never returned back to client.
 */
public class UserDTO {

    private String name;
    private String email;
    private String password;       // nullable on update
    private String role;
    private String phoneNumber;
    private boolean active;

    // ─── Constructors ──────────────────────────────────────────────────────────

    public UserDTO() {}

    public UserDTO(String name, String email, String password,
                   String role, String phoneNumber, boolean active) {
        this.name        = name;
        this.email       = email;
        this.password    = password;
        this.role        = role;
        this.phoneNumber = phoneNumber;
        this.active      = active;
    }

    // ─── Getters & Setters ─────────────────────────────────────────────────────

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
}
