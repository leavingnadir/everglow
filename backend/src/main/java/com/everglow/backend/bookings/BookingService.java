package com.everglow.backend.bookings;

import org.springframework.stereotype.Service;
import java.util.List;

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
}