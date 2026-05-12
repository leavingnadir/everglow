package com.everglow.backend.packages;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "packages")
public class Package {

    public enum Tier { SILVER, GOLD, PLATINUM, DIAMOND }

    public enum Theme { DESTINATION, TRADITIONAL, MODERN_LUXURY, INTIMATE, BUDGET_SMART }

    public enum Availability { AVAILABLE, LIMITED, BOOKED }

    public enum VendorCategory {
        DJ, LIVE_BAND, TRADITIONAL_DANCERS, FIREWORKS,
        FLORAL_DESIGN, THEME_COLORS, STAGE_DESIGN,
        PHOTOGRAPHY, VIDEOGRAPHY, DRONE_SHOOT,
        BUFFET_CATERING, SET_MENU_CATERING, DESSERT_TABLE,
        HOTEL_VENUE, GARDEN_VENUE, BEACH_VENUE,
        MAKEUP_ARTIST, BRIDAL_DRESSING, GROOM_DRESSING,
        WEDDING_CAR, GUEST_TRANSPORT,
        WEDDING_WEBSITE, DIGITAL_INVITATION, GUEST_MANAGEMENT
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tier tier;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Theme theme;

    @Column(length = 2000)
    private String description;

    @NotNull
    @Positive
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private int discountPercent = 0;

    private Integer maxGuests;

    // 🔥 NEW: Availability status
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Availability availability = Availability.AVAILABLE;

    // 🔥 NEW: Booking URL link
    @Column(length = 500)
    private String bookingUrl;

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
    private boolean featured = false;

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); updatedAt = LocalDateTime.now(); }

    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    public Package() {}

    // Business logic — encapsulation
    public BigDecimal getDiscountedPrice() {
        if (discountPercent <= 0) return price;
        BigDecimal discount = price.multiply(BigDecimal.valueOf(discountPercent)).divide(BigDecimal.valueOf(100));
        return price.subtract(discount);
    }

    public BigDecimal getSavings() { return price.subtract(getDiscountedPrice()); }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Tier getTier() { return tier; }
    public void setTier(Tier tier) { this.tier = tier; }
    public Theme getTheme() { return theme; }
    public void setTheme(Theme theme) { this.theme = theme; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public int getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(int discountPercent) { this.discountPercent = discountPercent; }
    public Integer getMaxGuests() { return maxGuests; }
    public void setMaxGuests(Integer maxGuests) { this.maxGuests = maxGuests; }
    public Availability getAvailability() { return availability; }
    public void setAvailability(Availability availability) { this.availability = availability; }
    public String getBookingUrl() { return bookingUrl; }
    public void setBookingUrl(String bookingUrl) { this.bookingUrl = bookingUrl; }
    public List<VendorCategory> getIncludedVendors() { return includedVendors; }
    public void setIncludedVendors(List<VendorCategory> includedVendors) { this.includedVendors = includedVendors; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
}
