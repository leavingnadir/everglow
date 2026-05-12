package com.everglow.backend.reviews;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    private final FeedbackService feedbackService;

    // POST /api/feedbacks  →  Submit new feedback
    @PostMapping
    public ResponseEntity<FeedbackDTO.Response> createFeedback(
            @Valid @RequestBody FeedbackDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(feedbackService.createFeedback(request));
    }

    // GET /api/feedbacks  →  All feedbacks (admin)
    @GetMapping
    public ResponseEntity<List<FeedbackDTO.Response>> getAllFeedbacks() {
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    // GET /api/feedbacks/approved  →  Public approved feedbacks
    @GetMapping("/approved")
    public ResponseEntity<List<FeedbackDTO.Response>> getApprovedFeedbacks() {
        return ResponseEntity.ok(feedbackService.getApprovedFeedbacks());
    }

    // GET /api/feedbacks/{id}  →  Single feedback
    @GetMapping("/{id}")
    public ResponseEntity<FeedbackDTO.Response> getFeedbackById(@PathVariable Long id) {
        return ResponseEntity.ok(feedbackService.getFeedbackById(id));
    }

    // GET /api/feedbacks/vendor/{vendorId}  →  Vendor's approved feedbacks
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<FeedbackDTO.Response>> getFeedbacksByVendor(
            @PathVariable Long vendorId) {
        return ResponseEntity.ok(feedbackService.getFeedbacksByVendor(vendorId));
    }

    // GET /api/feedbacks/vendor/{vendorId}/rating  →  Average rating
    @GetMapping("/vendor/{vendorId}/rating")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long vendorId) {
        return ResponseEntity.ok(feedbackService.getAverageRating(vendorId));
    }

    // GET /api/feedbacks/user/{userId}  →  User's own feedbacks
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FeedbackDTO.Response>> getFeedbacksByUser(
            @PathVariable Long userId) {
        return ResponseEntity.ok(feedbackService.getFeedbacksByUser(userId));
    }

    // PUT /api/feedbacks/{id}  →  Update feedback
    @PutMapping("/{id}")
    public ResponseEntity<FeedbackDTO.Response> updateFeedback(
            @PathVariable Long id,
            @Valid @RequestBody FeedbackDTO.Request request) {
        return ResponseEntity.ok(feedbackService.updateFeedback(id, request));
    }

    // PATCH /api/feedbacks/{id}/approve  →  Approve (admin)
    @PatchMapping("/{id}/approve")
    public ResponseEntity<FeedbackDTO.Response> approveFeedback(@PathVariable Long id) {
        return ResponseEntity.ok(feedbackService.approveFeedback(id));
    }

    // DELETE /api/feedbacks/{id}  →  Delete feedback
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
}
