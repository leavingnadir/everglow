package com.everglow.vendormanagement.vendor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    
    Optional<Vendor> findByEmail(String email);
    
    List<Vendor> findByStatus(Vendor.VendorStatus status);
    
    List<Vendor> findByCity(String city);
    
    List<Vendor> findByBusinessType(String businessType);
    
    List<Vendor> findByIsActiveTrue();
}
