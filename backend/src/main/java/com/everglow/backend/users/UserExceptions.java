package com.everglow.backend.users;

// ─── User Not Found ────────────────────────────────────────────────────────────
class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}

// ─── Duplicate Email ───────────────────────────────────────────────────────────
class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
