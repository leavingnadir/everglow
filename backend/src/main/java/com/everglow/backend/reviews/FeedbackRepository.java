package com.everglow.backend.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByVendorId(Long vendorId);

    List<Feedback> findByUserId(Long userId);

    List<Feedback> findByApprovedTrue();

    List<Feedback> findByVendorIdAndApprovedTrue(Long vendorId);

    List<Feedback> findByBookingId(Long bookingId);

    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.vendorId = :vendorId AND f.approved = true")
    Double findAverageRatingByVendorId(@Param("vendorId") Long vendorId);

    boolean existsByUserIdAndBookingId(Long userId, Long bookingId);
}
