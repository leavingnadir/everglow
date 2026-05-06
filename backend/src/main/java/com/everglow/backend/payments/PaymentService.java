package com.everglow.backend.payments;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service layer for Payment business logic.
 *
 * OOP Concepts applied:
 * - Single Responsibility: this class only handles payment business rules
 * - Dependency Injection: repository is injected via constructor (not hardcoded)
 * - Abstraction: controller doesn't know how data is fetched — it just calls service methods
 */
@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    // Constructor injection (preferred over @Autowired on field)
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // ── CREATE ──────────────────────────────────────────────────────────────

    public PaymentDTO createPayment(PaymentDTO dto) {
        Payment payment = dto.toEntity();
        Payment saved = paymentRepository.save(payment);
        return PaymentDTO.fromEntity(saved);
    }

    // ── READ (all) ───────────────────────────────────────────────────────────

    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(PaymentDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ── READ (single) ────────────────────────────────────────────────────────

    public PaymentDTO getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with id: " + id));
        return PaymentDTO.fromEntity(payment);
    }

    // ── READ (by booking) ────────────────────────────────────────────────────

    public List<PaymentDTO> getPaymentsByBookingId(Long bookingId) {
        return paymentRepository.findByBookingId(bookingId)
                .stream()
                .map(PaymentDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ── UPDATE ───────────────────────────────────────────────────────────────

    public PaymentDTO updatePayment(Long id, PaymentDTO dto) {
        Payment existing = paymentRepository.findById(id)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with id: " + id));

        // Only update fields that were provided
        if (dto.getBookingId()     != null) existing.setBookingId(dto.getBookingId());
        if (dto.getVendorName()    != null) existing.setVendorName(dto.getVendorName());
        if (dto.getAmount()        != null) existing.setAmount(dto.getAmount());
        if (dto.getPaymentDate()   != null) existing.setPaymentDate(dto.getPaymentDate());
        if (dto.getNotes()         != null) existing.setNotes(dto.getNotes());
        if (dto.getPaymentMethod() != null)
            existing.setPaymentMethod(Payment.PaymentMethod.valueOf(dto.getPaymentMethod()));
        if (dto.getStatus()        != null)
            existing.setStatus(Payment.PaymentStatus.valueOf(dto.getStatus()));

        Payment updated = paymentRepository.save(existing);
        return PaymentDTO.fromEntity(updated);
    }

    // ── DELETE ───────────────────────────────────────────────────────────────

    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new PaymentNotFoundException("Payment not found with id: " + id);
        }
        paymentRepository.deleteById(id);
    }
}
