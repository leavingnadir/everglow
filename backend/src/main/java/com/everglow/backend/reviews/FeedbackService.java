package com.everglow.backend.reviews;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    // ── Create ───────────────────────────────────────────────────────────────

    public FeedbackDTO.Response createFeedback(FeedbackDTO.Request request) {
        if (request.getBookingId() != null &&
                feedbackRepository.existsByUserIdAndBookingId(request.getUserId(), request.getBookingId())) {
            throw new IllegalStateException("You have already submitted feedback for this booking.");
        }

        Feedback feedback = Feedback.builder()
                .userId(request.getUserId())
                .vendorId(request.getVendorId())
                .bookingId(request.getBookingId())
                .rating(request.getRating())
                .comment(request.getComment())
                .reviewerName(request.getReviewerName())
                .vendorCategory(request.getVendorCategory())
                .approved(false)
                .build();

        return toResponse(feedbackRepository.save(feedback));
    }

    // ── Read ─────────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<FeedbackDTO.Response> getAllFeedbacks() {
        return feedbackRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FeedbackDTO.Response getFeedbackById(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Feedback not found with id: " + id));
        return toResponse(feedback);
    }

    @Transactional(readOnly = true)
    public List<FeedbackDTO.Response> getFeedbacksByVendor(Long vendorId) {
        return feedbackRepository.findByVendorIdAndApprovedTrue(vendorId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FeedbackDTO.Response> getFeedbacksByUser(Long userId) {
        return feedbackRepository.findByUserId(userId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FeedbackDTO.Response> getApprovedFeedbacks() {
        return feedbackRepository.findByApprovedTrue()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Double getAverageRating(Long vendorId) {
        Double avg = feedbackRepository.findAverageRatingByVendorId(vendorId);
        return avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0;
    }

    // ── Update ───────────────────────────────────────────────────────────────

    public FeedbackDTO.Response updateFeedback(Long id, FeedbackDTO.Request request) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Feedback not found with id: " + id));

        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());
        feedback.setReviewerName(request.getReviewerName());
        feedback.setVendorCategory(request.getVendorCategory());
        feedback.setApproved(false); // reset approval after edit

        return toResponse(feedbackRepository.save(feedback));
    }

    public FeedbackDTO.Response approveFeedback(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Feedback not found with id: " + id));
        feedback.setApproved(true);
        return toResponse(feedbackRepository.save(feedback));
    }

    // ── Delete ───────────────────────────────────────────────────────────────

    public void deleteFeedback(Long id) {
        if (!feedbackRepository.existsById(id)) {
            throw new EntityNotFoundException("Feedback not found with id: " + id);
        }
        feedbackRepository.deleteById(id);
    }

    // ── Mapper ───────────────────────────────────────────────────────────────

    private FeedbackDTO.Response toResponse(Feedback feedback) {
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
