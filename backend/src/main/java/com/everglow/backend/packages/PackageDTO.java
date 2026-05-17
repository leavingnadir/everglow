package com.everglow.backend.packages;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PackageDTO {

    private Long id;

    @NotBlank(message = "Package name is required")
    private String name;

    @NotNull(message = "Tier is required")
    private Package.Tier tier;

    @NotNull(message = "Theme is required")
    private Package.Theme theme;

    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;

    private BigDecimal discountedPrice;
    private BigDecimal savings;
    private int discountPercent;
    private Integer maxGuests;
    private Package.Availability availability;
    private String bookingUrl;
    private List<Package.VendorCategory> includedVendors = new ArrayList<>();
    private boolean active;
    private boolean featured;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PackageDTO fromEntity(Package pkg) {
        PackageDTO dto = new PackageDTO();
        dto.setId(pkg.getId());
        dto.setName(pkg.getName());
        dto.setTier(pkg.getTier());
        dto.setTheme(pkg.getTheme());
        dto.setDescription(pkg.getDescription());
        dto.setPrice(pkg.getPrice());
        dto.setDiscountedPrice(pkg.getDiscountedPrice());
        dto.setSavings(pkg.getSavings());
        dto.setDiscountPercent(pkg.getDiscountPercent());
        dto.setMaxGuests(pkg.getMaxGuests());
        dto.setAvailability(pkg.getAvailability());
        dto.setBookingUrl(pkg.getBookingUrl());
        dto.setIncludedVendors(pkg.getIncludedVendors());
        dto.setActive(pkg.isActive());
        dto.setFeatured(pkg.isFeatured());
        dto.setCreatedAt(pkg.getCreatedAt());
        dto.setUpdatedAt(pkg.getUpdatedAt());
        return dto;
    }

    public Package toEntity() {
        Package pkg = new Package();
        pkg.setName(this.name);
        pkg.setTier(this.tier);
        pkg.setTheme(this.theme);
        pkg.setDescription(this.description);
        pkg.setPrice(this.price);
        pkg.setDiscountPercent(this.discountPercent);
        pkg.setMaxGuests(this.maxGuests);
        pkg.setAvailability(this.availability != null ? this.availability : Package.Availability.AVAILABLE);
        pkg.setBookingUrl(this.bookingUrl);
        pkg.setIncludedVendors(this.includedVendors);
        pkg.setActive(this.active);
        pkg.setFeatured(this.featured);
        return pkg;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Package.Tier getTier() { return tier; }
    public void setTier(Package.Tier tier) { this.tier = tier; }
    public Package.Theme getTheme() { return theme; }
    public void setTheme(Package.Theme theme) { this.theme = theme; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public BigDecimal getDiscountedPrice() { return discountedPrice; }
    public void setDiscountedPrice(BigDecimal discountedPrice) { this.discountedPrice = discountedPrice; }
    public BigDecimal getSavings() { return savings; }
    public void setSavings(BigDecimal savings) { this.savings = savings; }
    public int getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(int discountPercent) { this.discountPercent = discountPercent; }
    public Integer getMaxGuests() { return maxGuests; }
    public void setMaxGuests(Integer maxGuests) { this.maxGuests = maxGuests; }
    public Package.Availability getAvailability() { return availability; }
    public void setAvailability(Package.Availability availability) { this.availability = availability; }
    public String getBookingUrl() { return bookingUrl; }
    public void setBookingUrl(String bookingUrl) { this.bookingUrl = bookingUrl; }
    public List<Package.VendorCategory> getIncludedVendors() { return includedVendors; }
    public void setIncludedVendors(List<Package.VendorCategory> includedVendors) { this.includedVendors = includedVendors; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
