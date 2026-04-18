package com.everglow.backend.payments;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO (Data Transfer Object) for Payment.
 *
 * OOP Concept: Separation of Concerns — the DTO decouples the API
 * contract from the internal database entity. This means we control
 * exactly what fields are exposed to the frontend.
 */
public class PaymentDTO {

    private Long id;
    private Long bookingId;
    private String vendorName;
    private BigDecimal amount;
    private String paymentMethod;   // String so frontend gets "CARD" not an enum object
    private String status;
    private LocalDate paymentDate;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // --- Constructors ---

    public PaymentDTO() {}

    /**
     * Static factory method — converts a Payment entity into a PaymentDTO.
     * OOP Concept: Encapsulation — conversion logic lives inside the DTO itself.
     */
    public static PaymentDTO fromEntity(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.id            = payment.getId();
        dto.bookingId     = payment.getBookingId();
        dto.vendorName    = payment.getVendorName();
        dto.amount        = payment.getAmount();
        dto.paymentMethod = payment.getPaymentMethod() != null
                            ? payment.getPaymentMethod().name() : null;
        dto.status        = payment.getStatus() != null
                            ? payment.getStatus().name() : null;
        dto.paymentDate   = payment.getPaymentDate();
        dto.notes         = payment.getNotes();
        dto.createdAt     = payment.getCreatedAt();
        dto.updatedAt     = payment.getUpdatedAt();
        return dto;
    }

    /**
     * Converts this DTO into a Payment entity (used on CREATE).
     */
    public Payment toEntity() {
        Payment p = new Payment();
        p.setBookingId(this.bookingId);
        p.setVendorName(this.vendorName);
        p.setAmount(this.amount);
        p.setPaymentMethod(this.paymentMethod != null
                ? Payment.PaymentMethod.valueOf(this.paymentMethod) : null);
        p.setStatus(this.status != null
                ? Payment.PaymentStatus.valueOf(this.status) : Payment.PaymentStatus.PENDING);
        p.setPaymentDate(this.paymentDate);
        p.setNotes(this.notes);
        return p;
    }

    // --- Getters & Setters ---

    public Long getId()                            { return id; }
    public void setId(Long id)                     { this.id = id; }

    public Long getBookingId()                     { return bookingId; }
    public void setBookingId(Long bookingId)       { this.bookingId = bookingId; }

    public String getVendorName()                  { return vendorName; }
    public void setVendorName(String vendorName)   { this.vendorName = vendorName; }

    public BigDecimal getAmount()                  { return amount; }
    public void setAmount(BigDecimal amount)       { this.amount = amount; }

    public String getPaymentMethod()               { return paymentMethod; }
    public void setPaymentMethod(String m)         { this.paymentMethod = m; }

    public String getStatus()                      { return status; }
    public void setStatus(String status)           { this.status = status; }

    public LocalDate getPaymentDate()              { return paymentDate; }
    public void setPaymentDate(LocalDate d)        { this.paymentDate = d; }

    public String getNotes()                       { return notes; }
    public void setNotes(String notes)             { this.notes = notes; }

    public LocalDateTime getCreatedAt()            { return createdAt; }
    public void setCreatedAt(LocalDateTime t)      { this.createdAt = t; }

    public LocalDateTime getUpdatedAt()            { return updatedAt; }
    public void setUpdatedAt(LocalDateTime t)      { this.updatedAt = t; }
}
