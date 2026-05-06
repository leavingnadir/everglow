package com.everglow.backend.vendors.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorDTO {
    private Long id;
    private String businessName;
    private String category;
    private String description;
    private String contactEmail;
    private String contactPhone;
    private String priceRange;
    private Double rating;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
