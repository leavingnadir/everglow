package com.everglow.backend.bookings;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository repository;

    public BookingService(BookingRepository repository) {
        this.repository = repository;
    }

    public Booking createBooking(Booking b) {
        return repository.save(b);
    }

    public List<Booking> getAll() {
        return repository.findAll();
    }

    public List<Booking> getByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    /** ✅ NEW — Update status */
    public Optional<Booking> updateStatus(Long id, Booking.BookingStatus newStatus) {
        return repository.findById(id).map(booking -> {
            booking.setStatus(newStatus);
            return repository.save(booking);
        });
    }

    /** ✅ NEW — Delete */
    public boolean deleteById(Long id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }
}
