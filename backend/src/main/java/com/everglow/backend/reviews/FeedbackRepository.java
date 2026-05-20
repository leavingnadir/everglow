package com.everglow.backend.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository layer for Feedback entity.(3)
 * 
 * Responsible for:
 * - Communicating with the database
 * - Performing CRUD operations
 * - Executing custom queries
 */
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    /**
     * Get all feedbacks for a specific vendor
     * (regardless of approval status)
     */
    List<Feedback> findByVendorId(Long vendorId);

    /**
     * Get all feedbacks submitted by a specific user
     */
    List<Feedback> findByUserId(Long userId);

    /**
     * Get all approved feedbacks only
     * (used for public display)
     */
    List<Feedback> findByApprovedTrue();

    /**
     * Get approved feedbacks for a specific vendor
     * (used in vendor profile page)
     */
    List<Feedback> findByVendorIdAndApprovedTrue(Long vendorId);

    /**
     * Get feedback linked to a specific booking
     */
    List<Feedback> findByBookingId(Long bookingId);

    /**
     * Calculate average rating for a vendor
     * Only includes approved feedbacks
     * 
     * JPQL (Java Persistence Query Language)
     */
    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.vendorId = :vendorId AND f.approved = true")
    Double findAverageRatingByVendorId(@Param("vendorId") Long vendorId);

    /**
     * Check if a user has already submitted feedback
     * for a specific booking (prevents duplicates)
     */
    boolean existsByUserIdAndBookingId(Long userId, Long bookingId);
}