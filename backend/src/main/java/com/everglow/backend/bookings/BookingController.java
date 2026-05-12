package com.everglow.backend.bookings;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    /** Create a new booking (any authenticated user) */
    @PostMapping
    public Booking create(@RequestBody Booking b) {
        return service.createBooking(b);
    }

    /** Get all bookings — ADMIN only */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Booking> getAll() {
        return service.getAll();
    }

    /** Get bookings for a specific user */
    @GetMapping("/user/{userId}")
    public List<Booking> getByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }

    /** ✅ NEW — Change booking status — ADMIN only */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Booking> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest req) {
        return service.updateStatus(id, req.getStatus())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** ✅ NEW — Delete a booking — ADMIN only */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = service.deleteById(id);
        return deleted
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    // ── inner DTO ──────────────────────────────────────────────────────────
    public static class StatusUpdateRequest {
        private Booking.BookingStatus status;
        public Booking.BookingStatus getStatus() { return status; }
        public void setStatus(Booking.BookingStatus status) { this.status = status; }
    }
}
