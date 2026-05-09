package com.everglow.backend.reviews;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

public class FeedbackDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {

        @NotNull(message = "User ID is required")
        private Long userId;

        @NotNull(message = "Vendor ID is required")
        private Long vendorId;

        private Long bookingId;

        @NotNull(message = "Rating is required")
        @Min(value = 1, message = "Rating must be at least 1")
        @Max(value = 5, message = "Rating must be at most 5")
        private Integer rating;

        @NotBlank(message = "Comment cannot be blank")
        @Size(max = 1000, message = "Comment cannot exceed 1000 characters")
        private String comment;

        @Size(max = 100)
        private String reviewerName;

        @Size(max = 100)
        private String vendorCategory;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {

        private Long id;
        private Long userId;
        private Long vendorId;
        private Long bookingId;
        private Integer rating;
        private String comment;
        private String reviewerName;
        private String vendorCategory;
        private Boolean approved;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
