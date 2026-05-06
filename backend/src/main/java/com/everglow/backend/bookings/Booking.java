package backend.src.main.java.com.everglow.backend.bookings;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Booking {
    private static final Object GenerationType = ;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long vendorId;

    private LocalDateTime eventDate;
    private Double amount;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private LocalDateTime createdAt = LocalDateTime.now();
}


