package com.everglow.backend.packages;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "packages")
public class Package {

    public enum Tier {
        SILVER, GOLD, PLATINUM, DIAMOND
    }

    public enum VendorCategory {
        VIDEOGRAPHY,
        FLORA,
        CATERING,
        PHOTOGRAPHY,
        SOUNDS_AND_LIGHTING,
        DANCING_TEAM,
        DRONE_SHOOT,
        BUFFET_CATERING
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Tier tier;

    private String description;

    @NotNull
    @Positive
    private BigDecimal price;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "package_vendors", joinColumns = @JoinColumn(name = "package_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "vendor_category")
    private List<VendorCategory> includedVendors = new ArrayList<>();

    private boolean active = true;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // getters/setters (keep as-is or use Lombok if you want)
    public Long getId() { return id; }
    public String getName() { return name; }
    public Tier getTier() { return tier; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public List<VendorCategory> getIncludedVendors() { return includedVendors; }
    public boolean isActive() { return active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setName(String name) { this.name = name; }
    public void setTier(Tier tier) { this.tier = tier; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setIncludedVendors(List<VendorCategory> v) { this.includedVendors = v; }
    public void setActive(boolean active) { this.active = active; }
}