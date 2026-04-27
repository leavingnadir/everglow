package com.everglow.backend.packages;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * DTO (Data Transfer Object) for Package.
 * Separates the API contract from the entity model — good OOP practice.
 */
public class PackageDTO {

    private Long id;

    @NotBlank(message = "Package name is required")
    private String name;

    @NotNull(message = "Tier is required")
    private Package.Tier tier;

    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;

    private List<Package.VendorCategory> includedVendors = new ArrayList<>();

    private boolean active;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ── Constructors ──────────────────────────────────────────────────────────

    public PackageDTO() {}

    /** Convert a Package entity to DTO */
    public static PackageDTO fromEntity(Package pkg) {
        PackageDTO dto = new PackageDTO();
        dto.setId(pkg.getId());
        dto.setName(pkg.getName());
        dto.setTier(pkg.getTier());
        dto.setDescription(pkg.getDescription());
        dto.setPrice(pkg.getPrice());
        dto.setIncludedVendors(pkg.getIncludedVendors());
        dto.setActive(pkg.isActive());
        dto.setCreatedAt(pkg.getCreatedAt());
        dto.setUpdatedAt(pkg.getUpdatedAt());
        return dto;
    }

    /** Convert DTO to Package entity */
    public Package toEntity() {
        Package pkg = new Package();
        pkg.setName(this.name);
        pkg.setTier(this.tier);
        pkg.setDescription(this.description);
        pkg.setPrice(this.price);
        pkg.setIncludedVendors(this.includedVendors);
        pkg.setActive(this.active);
        return pkg;
    }

    // ── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Package.Tier getTier() { return tier; }
    public void setTier(Package.Tier tier) { this.tier = tier; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public List<Package.VendorCategory> getIncludedVendors() { return includedVendors; }
    public void setIncludedVendors(List<Package.VendorCategory> includedVendors) {
        this.includedVendors = includedVendors;
    }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
