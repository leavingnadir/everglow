package com.everglow.backend.bookings;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @PostMapping
    public Booking create(@RequestBody Booking b) {
        return service.createBooking(b);
    }

    @GetMapping
    public List<Booking> getAll() {
        return service.getAll();
    }
}