package com.everglow.backend.payments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository layer for Payment entity.
 * Spring Data JPA auto-implements all standard CRUD methods.
 */
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Find all payments for a specific booking
    List<Payment> findByBookingId(Long bookingId);

    // Find all payments by status (e.g. PENDING, PAID)
    List<Payment> findByStatus(Payment.PaymentStatus status);

    // Find all payments for a specific vendor
    List<Payment> findByVendorNameContainingIgnoreCase(String vendorName);
}
