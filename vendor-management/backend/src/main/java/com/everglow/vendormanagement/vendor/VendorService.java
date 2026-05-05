package com.everglow.vendormanagement.vendor;

import java.util.List;
import java.util.Optional;

public interface VendorService {
    
    VendorDTO registerVendor(VendorDTO vendorDTO);
    
    Optional<VendorDTO> getVendorById(Long id);
    
    Optional<VendorDTO> getVendorByEmail(String email);
    
    List<VendorDTO> getAllVendors();
    
    List<VendorDTO> getVendorsByStatus(String status);
    
    List<VendorDTO> getVendorsByCity(String city);
    
    List<VendorDTO> getVendorsByBusinessType(String businessType);
    
    List<VendorDTO> getActiveVendors();
    
    VendorDTO updateVendor(Long id, VendorDTO vendorDTO);
    
    void deleteVendor(Long id);
    
    VendorDTO approveVendor(Long id);
    
    VendorDTO rejectVendor(Long id);
    
    VendorDTO suspendVendor(Long id);
    
    void updateVendorRating(Long id, Double rating);
}
