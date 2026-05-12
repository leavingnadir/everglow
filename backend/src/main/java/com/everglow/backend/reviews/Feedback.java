package com.everglow.backend.reviews;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    @NotNull(message = "User ID is required")
    private Long userId;

    @Column(name = "vendor_id", nullable = false)
    @NotNull(message = "Vendor ID is required")
    private Long vendorId;

    @Column(name = "booking_id")
    private Long bookingId;

    @Column(nullable = false)
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "Comment cannot be blank")
    @Size(max = 1000, message = "Comment cannot exceed 1000 characters")
    private String comment;

    @Column(name = "reviewer_name", length = 100)
    private String reviewerName;

    @Column(name = "vendor_category", length = 100)
    private String vendorCategory;

    @Column(nullable = false)
    @Builder.Default
    private Boolean approved = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
