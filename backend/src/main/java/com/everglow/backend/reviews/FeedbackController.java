package com.everglow.backend.reviews;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Marks this class as a REST API controller
@RestController

// Base URL for all feedback-related endpoints
@RequestMapping("/api/feedbacks")

// Generates constructor for final fields automatically
@RequiredArgsConstructor

// Allows frontend running on localhost:5173 to access these APIs
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    // Service layer object used to handle business logic
    private final FeedbackService feedbackService;

    // POST /api/feedbacks
    // Submit a new feedback
    @PostMapping
    public ResponseEntity<FeedbackDTO.Response> createFeedback(
            @Valid @RequestBody FeedbackDTO.Request request) {

        // Return created feedback with HTTP 201 status
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(feedbackService.createFeedback(request));
    }

    // GET /api/feedbacks
    // Get all feedbacks (Admin use)
    @GetMapping
    public ResponseEntity<List<FeedbackDTO.Response>> getAllFeedbacks() {

        // Return all feedback records
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    // GET /api/feedbacks/approved
    // Get only approved feedbacks for public view
    @GetMapping("/approved")
    public ResponseEntity<List<FeedbackDTO.Response>> getApprovedFeedbacks() {

        // Return approved feedback list
        return ResponseEntity.ok(feedbackService.getApprovedFeedbacks());
    }

    // GET /api/feedbacks/{id}
    // Get a single feedback by its ID
    @GetMapping("/{id}")
    public ResponseEntity<FeedbackDTO.Response> getFeedbackById(
            @PathVariable Long id) {

        // Return feedback matching the given ID
        return ResponseEntity.ok(feedbackService.getFeedbackById(id));
    }

    // GET /api/feedbacks/vendor/{vendorId}
    // Get approved feedbacks related to a specific vendor
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<FeedbackDTO.Response>> getFeedbacksByVendor(
            @PathVariable Long vendorId) {

        // Return feedbacks of the selected vendor
        return ResponseEntity.ok(feedbackService.getFeedbacksByVendor(vendorId));
    }

    // GET /api/feedbacks/vendor/{vendorId}/rating
    // Get average rating of a vendor
    @GetMapping("/vendor/{vendorId}/rating")
    public ResponseEntity<Double> getAverageRating(
            @PathVariable Long vendorId) {

        // Return calculated average rating
        return ResponseEntity.ok(feedbackService.getAverageRating(vendorId));
    }

    // GET /api/feedbacks/user/{userId}
    // Get all feedbacks submitted by a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FeedbackDTO.Response>> getFeedbacksByUser(
            @PathVariable Long userId) {

        // Return feedback list of the selected user
        return ResponseEntity.ok(feedbackService.getFeedbacksByUser(userId));
    }

    // PUT /api/feedbacks/{id}
    // Update an existing feedback
    @PutMapping("/{id}")
    public ResponseEntity<FeedbackDTO.Response> updateFeedback(
            @PathVariable Long id,
            @Valid @RequestBody FeedbackDTO.Request request) {

        // Return updated feedback
        return ResponseEntity.ok(feedbackService.updateFeedback(id, request));
    }

    // PATCH /api/feedbacks/{id}/approve
    // Approve a feedback (Admin action)
    @PatchMapping("/{id}/approve")
    public ResponseEntity<FeedbackDTO.Response> approveFeedback(
            @PathVariable Long id) {

        // Return approved feedback
        return ResponseEntity.ok(feedbackService.approveFeedback(id));
    }

    // DELETE /api/feedbacks/{id}
    // Delete a feedback by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {

        // Call service method to delete feedback
        feedbackService.deleteFeedback(id);

        // Return HTTP 204 No Content response
        return ResponseEntity.noContent().build();
    }
}