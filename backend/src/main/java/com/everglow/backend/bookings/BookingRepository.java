package backend.src.main.java.com.everglow.backend.bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public class BookingRepository extends backend.src.main.java.com.everglow.backend.bookings.JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId) {
        return null;
    }

    List<Booking> findByVendorId(Long vendorId) {
        return null;
    }

    public List<Booking> findAll() {
        return List.of();
    }

    public Booking save(Booking b) {
        return b;
    }
}
