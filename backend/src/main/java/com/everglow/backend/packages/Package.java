package com.everglow.backend.packages;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Package entity representing a service package (Gold, Platinum, Silver).
 * Uses OOP principles: encapsulation, validation, and clean data modeling.
 */
@Entity
@Table(name = "packages")
public class Package {

    // ── Enums ─────────────────────────────────────────────────────────────────

    public enum Tier {
        GOLD, PLATINUM, SILVER
    }

    public enum VendorCategory {
        VIDEOGRAPHY, FLORA, CATERING, PHOTOGRAPHY, SOUNDS_AND_LIGHTING, DANCING_TEAM
    }

    // ── Fields ────────────────────────────────────────────────────────────────

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Package name is required")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "Tier is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tier tier;

    @Column(length = 1000)
    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    // Comma-separated vendor categories included in this package
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "package_vendors", joinColumns = @JoinColumn(name = "package_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "vendor_category")
    private List<VendorCategory> includedVendors = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    private boolean active = true;

    // ── Lifecycle ─────────────────────────────────────────────────────────────

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ── Constructors ──────────────────────────────────────────────────────────

    public Package() {}

    public Package(String name, Tier tier, String description, BigDecimal price) {
        this.name = name;
        this.tier = tier;
        this.description = description;
        this.price = price;
    }

    // ── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Tier getTier() { return tier; }
    public void setTier(Tier tier) { this.tier = tier; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public List<VendorCategory> getIncludedVendors() { return includedVendors; }
    public void setIncludedVendors(List<VendorCategory> includedVendors) {
        this.includedVendors = includedVendors;
    }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    @Override
    public String toString() {
        return "Package{id=" + id + ", name='" + name + "', tier=" + tier + ", price=" + price + "}";
    }
}
