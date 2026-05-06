package backend.src.main.java.com.everglow.backend.bookings;
import org.springframework.stereotype.Service;
import java.util.List;

@backend.src.main.java.com.everglow.backend.bookings.Service
public class BookingService {
    private final BookingRepository repo;

    public BookingService(BookingRepository repo) {
        this.repo = repo;
    }

    public Booking createBooking(Booking b) {
        b.setStatus(BookingStatus.REQUESTED);
        b.setCreatedAt(java.time.LocalDateTime.now());
        return repo.save(b);
    }

    public List<Booking> getAll() {
        return repo.findAll();
    }
}
