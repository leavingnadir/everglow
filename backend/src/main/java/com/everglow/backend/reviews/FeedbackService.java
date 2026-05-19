package com.everglow.backend.reviews;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

// Marks this class as a Spring service component
@Service

// Automatically creates constructor for final fields
@RequiredArgsConstructor

// Enables transaction management for database operations
@Transactional
public class FeedbackService {

    // Repository object used for database access
    private final FeedbackRepository feedbackRepository;

    // ── Create ───────────────────────────────────────────────────────────────

    // Create and save a new feedback
    public FeedbackDTO.Response createFeedback(FeedbackDTO.Request request) {

        // Check whether feedback already exists for the same booking and user
        if (request.getBookingId() != null &&
                feedbackRepository.existsByUserIdAndBookingId(
                        request.getUserId(),
                        request.getBookingId())) {

            // Prevent duplicate feedback submissions
            throw new IllegalStateException(
                    "You have already submitted feedback for this booking.");
        }

        // Build Feedback entity object using request data
        Feedback feedback = Feedback.builder()
                .userId(request.getUserId())
                .vendorId(request.getVendorId())
                .bookingId(request.getBookingId())
                .rating(request.getRating())
                .comment(request.getComment())
                .reviewerName(request.getReviewerName())
                .vendorCategory(request.getVendorCategory())

                // Newly submitted feedback is not approved by default
                .approved(false)
                .build();

        // Save feedback and return response DTO
        return toResponse(feedbackRepository.save(feedback));
    }

    // ── Read ─────────────────────────────────────────────────────────────────

    // Get all feedback records
    @Transactional(readOnly = true)
    public List<FeedbackDTO.Response> getAllFeedbacks() {

        // Convert entity list into response DTO list
        return feedbackRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // Get a single feedback by ID
    @Transactional(readOnly = true)
    public FeedbackDTO.Response getFeedbackById(Long id) {

        // Find feedback or throw exception if not found
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Feedback not found with id: " + id));

        // Return converted response DTO
        return toResponse(feedback);
    }

    // Get approved feedbacks for a specific vendor
    @Transactional(readOnly = true)
    public List<FeedbackDTO.Response> getFeedbacksByVendor(Long vendorId) {

        // Return approved vendor feedbacks only
        return feedbackRepository.findByVendorIdAndApprovedTrue(vendorId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // Get all feedbacks submitted by a user
    @Transactional(readOnly = true)
    public List<FeedbackDTO.Response> getFeedbacksByUser(Long userId) {

        // Return feedbacks related to the given user
        return feedbackRepository.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // Get all approved feedbacks
    @Transactional(readOnly = true)
    public List<FeedbackDTO.Response> getApprovedFeedbacks() {

        // Return only approved feedbacks
        return feedbackRepository.findByApprovedTrue()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // Calculate average rating for a vendor
    @Transactional(readOnly = true)
    public Double getAverageRating(Long vendorId) {

        // Get average rating from repository
        Double avg = feedbackRepository.findAverageRatingByVendorId(vendorId);

        // Round result to one decimal place
        return avg != null
                ? Math.round(avg * 10.0) / 10.0
                : 0.0;
    }

    // ── Update ───────────────────────────────────────────────────────────────

    // Update an existing feedback
    public FeedbackDTO.Response updateFeedback(
            Long id,
            FeedbackDTO.Request request) {

        // Find feedback or throw exception if not found
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Feedback not found with id: " + id));

        // Update feedback fields
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());
        feedback.setReviewerName(request.getReviewerName());
        feedback.setVendorCategory(request.getVendorCategory());

        // Reset approval after editing
        feedback.setApproved(false);

        // Save updated feedback and return response
        return toResponse(feedbackRepository.save(feedback));
    }

    // Approve a feedback
    public FeedbackDTO.Response approveFeedback(Long id) {

        // Find feedback by ID
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Feedback not found with id: " + id));

        // Mark feedback as approved
        feedback.setApproved(true);

        // Save and return updated feedback
        return toResponse(feedbackRepository.save(feedback));
    }

    // ── Delete ───────────────────────────────────────────────────────────────

    // Delete a feedback by ID
    public void deleteFeedback(Long id) {

        // Check whether feedback exists
        if (!feedbackRepository.existsById(id)) {

            // Throw exception if feedback does not exist
            throw new EntityNotFoundException(
                    "Feedback not found with id: " + id);
        }

        // Delete feedback from database
        feedbackRepository.deleteById(id);
    }

    // ── Mapper ───────────────────────────────────────────────────────────────

    // Convert Feedback entity into Response DTO
    private FeedbackDTO.Response toResponse(Feedback feedback) {

        // Build and return response object
        return FeedbackDTO.Response.builder()
                .id(feedback.getId())
                .userId(feedback.getUserId())
                .vendorId(feedback.getVendorId())
                .bookingId(feedback.getBookingId())
                .rating(feedback.getRating())
                .comment(feedback.getComment())
                .reviewerName(feedback.getReviewerName())
                .vendorCategory(feedback.getVendorCategory())
                .approved(feedback.getApproved())
                .createdAt(feedback.getCreatedAt())
                .updatedAt(feedback.getUpdatedAt())
                .build();
    }
}