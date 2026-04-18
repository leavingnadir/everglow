package com.everglow.backend.payments;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Payment entity representing a payment record in the system.
 * Maps to the "payments" table in Neon PostgreSQL.
 */
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_id", nullable = false)
    private Long bookingId;

    @Column(name = "vendor_name")
    private String vendorName;

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PaymentStatus status;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // --- Lifecycle hooks ---

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == null) this.status = PaymentStatus.PENDING;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // --- Enums (inner, keeps everything in one file) ---

    public enum PaymentMethod {
        CARD, BANK_TRANSFER, CASH
    }

    public enum PaymentStatus {
        PENDING, PAID, FAILED, REFUNDED
    }

    // --- Constructors ---

    public Payment() {}

    public Payment(Long bookingId, String vendorName, BigDecimal amount, PaymentMethod paymentMethod, PaymentStatus status, LocalDate paymentDate, String notes) {
        this.bookingId     = bookingId;
        this.vendorName    = vendorName;
        this.amount        = amount;
        this.paymentMethod = paymentMethod;
        this.status        = status;
        this.paymentDate   = paymentDate;
        this.notes         = notes;
    }

    // --- Getters & Setters ---

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }

    public Long getBookingId(){
        return bookingId;
    }
    public void setBookingId(Long bookingId){
        this.bookingId = bookingId;
    }

    public String getVendorName(){
        return vendorName;
    }
    public void setVendorName(String v){
        this.vendorName = v;
    }

    public BigDecimal getAmount(){
        return amount;
    }
    public void setAmount(BigDecimal amount){
        this.amount = amount;
    }

    public PaymentMethod getPaymentMethod(){
        return paymentMethod;
    }
    public void setPaymentMethod(PaymentMethod m){
        this.paymentMethod = m;
    }

    public PaymentStatus getStatus(){
        return status;
    }
    public void setStatus(PaymentStatus status){
        this.status = status;
    }

    public LocalDate getPaymentDate(){
        return paymentDate;
    }
    public void setPaymentDate(LocalDate paymentDate){
        this.paymentDate = paymentDate;
    }

    public String getNotes(){
        return notes;
    }
    public void setNotes(String notes){
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt(){
        return createdAt;
    }
    public LocalDateTime getUpdatedAt(){
        return updatedAt;
    }
}
