# Vendor Management - Database Schema

```sql
-- Vendors Table
CREATE TABLE IF NOT EXISTS vendors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    description TEXT,
    phone VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    business_type VARCHAR(100) NOT NULL,
    website VARCHAR(255),
    business_license VARCHAR(255),
    profile_picture LONGTEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    role VARCHAR(50) NOT NULL DEFAULT 'VENDOR',
    average_rating DECIMAL(3,2),
    total_reviews INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_city (city),
    INDEX idx_business_type (business_type),
    INDEX idx_created_at (created_at)
);
```

## Important Notes

- Integrate with existing everglow database
- Uses same MySQL database configuration
- Tables follow naming conventions with underscores
- Timestamps are automatic with MySQL functions
- Indices added for frequently queried fields
