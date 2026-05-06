package com.everglow.backend.vendors.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorRequestDTO {

    @NotBlank(message = "Business name is required")
    private String businessName;

    @NotBlank(message = "Category is required")
    private String category;

    private String description;

    @NotBlank(message = "Contact email is required")
    @Email(message = "Invalid email format")
    private String contactEmail;

    @NotBlank(message = "Contact phone is required")
    private String contactPhone;

    private String priceRange;
    
    private Double rating;
}
