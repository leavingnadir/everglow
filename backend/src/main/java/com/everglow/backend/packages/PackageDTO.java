package com.everglow.backend.packages;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PackageDTO {

    private Long id;
    private String name;
    private Package.Tier tier;
    private String description;
    private BigDecimal price;
    private List<Package.VendorCategory> includedVendors;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ─────────────────────────────
    // ENTITY → DTO
    // ─────────────────────────────
    public static PackageDTO fromEntity(Package pkg) {
        PackageDTO dto = new PackageDTO();
        dto.id = pkg.getId();
        dto.name = pkg.getName();
        dto.tier = pkg.getTier();
        dto.description = pkg.getDescription();
        dto.price = pkg.getPrice();
        dto.includedVendors = pkg.getIncludedVendors();
        dto.active = pkg.isActive();
        dto.createdAt = pkg.getCreatedAt();
        dto.updatedAt = pkg.getUpdatedAt();
        return dto;
    }

    // ─────────────────────────────
    // DTO → ENTITY
    // (FIXED: NO setId() to avoid JPA crash)
    // ─────────────────────────────
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

    // ─────────────────────────────
    // GETTERS & SETTERS
    // ─────────────────────────────

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Package.Tier getTier() {
        return tier;
    }

    public void setTier(Package.Tier tier) {
        this.tier = tier;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<Package.VendorCategory> getIncludedVendors() {
        return includedVendors;
    }

    public void setIncludedVendors(List<Package.VendorCategory> includedVendors) {
        this.includedVendors = includedVendors;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}