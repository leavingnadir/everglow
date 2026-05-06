package com.everglow.backend.vendors.service;

import com.everglow.backend.vendors.dto.VendorDTO;
import com.everglow.backend.vendors.dto.VendorRequestDTO;

import java.util.List;

public interface VendorService {
    VendorDTO createVendor(VendorRequestDTO vendorRequestDTO);
    VendorDTO getVendorById(Long id);
    List<VendorDTO> getAllVendors();
    List<VendorDTO> getVendorsByCategory(String category);
    VendorDTO updateVendor(Long id, VendorRequestDTO vendorRequestDTO);
    void deleteVendor(Long id);
}
