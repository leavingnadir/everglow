package com.everglow.backend.payments;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller exposing Payment CRUD endpoints.
 *
 * OOP Concept: Controller is thin — it only handles HTTP concerns
 * (status codes, request/response). All business logic lives in PaymentService.
 *
 * Base URL: /api/payments
 */
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // ── GET /api/payments ────────────────────────────────────────────────────
    // Returns all payments. Frontend: PaymentList.jsx

    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        List<PaymentDTO> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    // ── GET /api/payments/{id} ───────────────────────────────────────────────
    // Returns one payment by ID. Frontend: PaymentDetail.jsx

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getPaymentById(@PathVariable Long id) {
        PaymentDTO payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(payment);
    }

    // ── GET /api/payments/booking/{bookingId} ────────────────────────────────
    // Returns all payments for a booking. Useful for booking detail page.

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<PaymentDTO>> getPaymentsByBooking(@PathVariable Long bookingId) {
        List<PaymentDTO> payments = paymentService.getPaymentsByBookingId(bookingId);
        return ResponseEntity.ok(payments);
    }

    // ── POST /api/payments ───────────────────────────────────────────────────
    // Creates a new payment. Frontend: PaymentForm.jsx (create mode)

    @PostMapping
    public ResponseEntity<PaymentDTO> createPayment(@RequestBody PaymentDTO dto) {
        PaymentDTO created = paymentService.createPayment(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // ── PUT /api/payments/{id} ───────────────────────────────────────────────
    // Updates existing payment. Frontend: PaymentForm.jsx (edit mode)

    @PutMapping("/{id}")
    public ResponseEntity<PaymentDTO> updatePayment(
            @PathVariable Long id,
            @RequestBody PaymentDTO dto) {
        PaymentDTO updated = paymentService.updatePayment(id, dto);
        return ResponseEntity.ok(updated);
    }

    // ── DELETE /api/payments/{id} ────────────────────────────────────────────
    // Deletes a payment. Frontend: PaymentList.jsx + PaymentDetail.jsx

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}
