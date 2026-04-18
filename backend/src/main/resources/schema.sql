-- Everglow Payments Table
-- Run this once in your Neon SQL Editor to create the table manually
-- (or let Hibernate auto-create it via ddl-auto=update)

CREATE TABLE IF NOT EXISTS payments (
    id             BIGSERIAL PRIMARY KEY,
    booking_id     BIGINT        NOT NULL,
    vendor_name    VARCHAR(255),
    amount         NUMERIC(10,2) NOT NULL,
    payment_method VARCHAR(50),
    status         VARCHAR(50)   DEFAULT 'PENDING',
    payment_date   DATE,
    notes          TEXT,
    created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- Optional: sample data for testing
INSERT INTO payments (booking_id, vendor_name, amount, payment_method, status, payment_date, notes)
VALUES
  (1001, 'Floral Bliss Studio',  2500.00, 'CARD',          'PAID',    '2025-03-15', 'Deposit for floral arrangements'),
  (1002, 'Harmony Photography',  3800.00, 'BANK_TRANSFER',  'PENDING', '2025-04-01', 'Full package payment'),
  (1003, 'Golden Venue Hall',    8000.00, 'CARD',           'PAID',    '2025-02-20', 'Venue booking confirmed');
