package com.everglow.backend.payments;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Custom exception thrown when a payment record is not found.
 *
 * OOP Concept: Inheritance — extends RuntimeException to integrate
 * with Spring's exception handling pipeline.
 *
 * @ResponseStatus automatically returns HTTP 404 when this is thrown.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class PaymentNotFoundException extends RuntimeException {

    public PaymentNotFoundException(String message) {
        super(message);
    }
}
