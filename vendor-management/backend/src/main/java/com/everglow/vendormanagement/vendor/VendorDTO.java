package com.everglow.vendormanagement.vendor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorDTO {
    
    private Long id;
    private String email;
    private String businessName;
    private String ownerName;
    private String description;
    private String phone;
    private String location;
    private String city;
    private String country;
    private String businessType;
    private String website;
    private String profilePicture;
    private String status;
    private String role;
    private Double averageRating;
    private Integer totalReviews;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isActive;
}
