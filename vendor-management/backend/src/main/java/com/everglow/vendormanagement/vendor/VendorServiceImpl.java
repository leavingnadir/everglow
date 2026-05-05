package com.everglow.vendormanagement.vendor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VendorServiceImpl implements VendorService {
    
    @Autowired
    private VendorRepository vendorRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public VendorDTO registerVendor(VendorDTO vendorDTO) {
        // Check if vendor already exists
        if (vendorRepository.findByEmail(vendorDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Vendor with this email already exists");
        }

        Vendor vendor = new Vendor();
        vendor.setEmail(vendorDTO.getEmail());
        vendor.setPassword(passwordEncoder.encode(vendorDTO.getPassword()));
        vendor.setBusinessName(vendorDTO.getBusinessName());
        vendor.setOwnerName(vendorDTO.getOwnerName());
        vendor.setDescription(vendorDTO.getDescription());
        vendor.setPhone(vendorDTO.getPhone());
        vendor.setLocation(vendorDTO.getLocation());
        vendor.setCity(vendorDTO.getCity());
        vendor.setCountry(vendorDTO.getCountry());
        vendor.setBusinessType(vendorDTO.getBusinessType());
        vendor.setWebsite(vendorDTO.getWebsite());
        vendor.setStatus(Vendor.VendorStatus.PENDING);

        Vendor savedVendor = vendorRepository.save(vendor);
        return convertToDTO(savedVendor);
    }

    @Override
    public Optional<VendorDTO> getVendorById(Long id) {
        return vendorRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public Optional<VendorDTO> getVendorByEmail(String email) {
        return vendorRepository.findByEmail(email).map(this::convertToDTO);
    }

    @Override
    public List<VendorDTO> getAllVendors() {
        return vendorRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<VendorDTO> getVendorsByStatus(String status) {
        try {
            Vendor.VendorStatus vendorStatus = Vendor.VendorStatus.valueOf(status.toUpperCase());
            return vendorRepository.findByStatus(vendorStatus).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid vendor status");
        }
    }

    @Override
    public List<VendorDTO> getVendorsByCity(String city) {
        return vendorRepository.findByCity(city).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<VendorDTO> getVendorsByBusinessType(String businessType) {
        return vendorRepository.findByBusinessType(businessType).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<VendorDTO> getActiveVendors() {
        return vendorRepository.findByIsActiveTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VendorDTO updateVendor(Long id, VendorDTO vendorDTO) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        vendor.setBusinessName(vendorDTO.getBusinessName());
        vendor.setDescription(vendorDTO.getDescription());
        vendor.setPhone(vendorDTO.getPhone());
        vendor.setLocation(vendorDTO.getLocation());
        vendor.setCity(vendorDTO.getCity());
        vendor.setCountry(vendorDTO.getCountry());
        vendor.setWebsite(vendorDTO.getWebsite());
        vendor.setProfilePicture(vendorDTO.getProfilePicture());

        Vendor updatedVendor = vendorRepository.save(vendor);
        return convertToDTO(updatedVendor);
    }

    @Override
    public void deleteVendor(Long id) {
        if (!vendorRepository.existsById(id)) {
            throw new RuntimeException("Vendor not found");
        }
        vendorRepository.deleteById(id);
    }

    @Override
    public VendorDTO approveVendor(Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        vendor.setStatus(Vendor.VendorStatus.APPROVED);
        Vendor updatedVendor = vendorRepository.save(vendor);
        return convertToDTO(updatedVendor);
    }

    @Override
    public VendorDTO rejectVendor(Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        vendor.setStatus(Vendor.VendorStatus.REJECTED);
        Vendor updatedVendor = vendorRepository.save(vendor);
        return convertToDTO(updatedVendor);
    }

    @Override
    public VendorDTO suspendVendor(Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        vendor.setStatus(Vendor.VendorStatus.SUSPENDED);
        vendor.setIsActive(false);
        Vendor updatedVendor = vendorRepository.save(vendor);
        return convertToDTO(updatedVendor);
    }

    @Override
    public void updateVendorRating(Long id, Double rating) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        vendor.setAverageRating(rating);
        vendor.setTotalReviews(vendor.getTotalReviews() + 1);
        vendorRepository.save(vendor);
    }

    private VendorDTO convertToDTO(Vendor vendor) {
        VendorDTO dto = new VendorDTO();
        dto.setId(vendor.getId());
        dto.setEmail(vendor.getEmail());
        dto.setBusinessName(vendor.getBusinessName());
        dto.setOwnerName(vendor.getOwnerName());
        dto.setDescription(vendor.getDescription());
        dto.setPhone(vendor.getPhone());
        dto.setLocation(vendor.getLocation());
        dto.setCity(vendor.getCity());
        dto.setCountry(vendor.getCountry());
        dto.setBusinessType(vendor.getBusinessType());
        dto.setWebsite(vendor.getWebsite());
        dto.setProfilePicture(vendor.getProfilePicture());
        dto.setStatus(vendor.getStatus().toString());
        dto.setRole(vendor.getRole().toString());
        dto.setAverageRating(vendor.getAverageRating());
        dto.setTotalReviews(vendor.getTotalReviews());
        dto.setCreatedAt(vendor.getCreatedAt());
        dto.setUpdatedAt(vendor.getUpdatedAt());
        dto.setIsActive(vendor.getIsActive());
        return dto;
    }
}
