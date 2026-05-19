package com.everglow.backend.reviews;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

// DTO class used for transferring feedback data(5)
public class FeedbackDTO {

    // Request DTO used when creating or updating feedback
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {

        // ID of the user who submits the feedback
        @NotNull(message = "User ID is required")
        private Long userId;

        // ID of the vendor being reviewed
        @NotNull(message = "Vendor ID is required")
        private Long vendorId;

        // Optional booking ID related to the feedback
        private Long bookingId;

        // Rating value given by the user
        // Must be between 1 and 5
        @NotNull(message = "Rating is required")
        @Min(value = 1, message = "Rating must be at least 1")
        @Max(value = 5, message = "Rating must be at most 5")
        private Integer rating;

        // User comment or review message
        @NotBlank(message = "Comment cannot be blank")
        @Size(max = 1000, message = "Comment cannot exceed 1000 characters")
        private String comment;

        // Name of the reviewer
        @Size(max = 100)
        private String reviewerName;

        // Vendor category such as Photographer, Venue, Caterer, etc.
        @Size(max = 100)
        private String vendorCategory;
    }

    // Response DTO used when sending feedback data to frontend
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {

        // Unique feedback ID
        private Long id;

        // User ID of the reviewer
        private Long userId;

        // Vendor ID being reviewed
        private Long vendorId;

        // Related booking ID
        private Long bookingId;

        // Rating value
        private Integer rating;

        // Review comment
        private String comment;

        // Name of the reviewer
        private String reviewerName;

        // Category of the vendor
        private String vendorCategory;

        // Indicates whether feedback is approved or not
        private Boolean approved;

        // Date and time when feedback was created
        private LocalDateTime createdAt;

        // Date and time when feedback was last updated
        private LocalDateTime updatedAt;
    }
}