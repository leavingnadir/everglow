package com.everglow.backend.vendors.service;

import com.everglow.backend.vendors.dto.VendorDTO;
import com.everglow.backend.vendors.dto.VendorRequestDTO;
import com.everglow.backend.vendors.model.Vendor;
import com.everglow.backend.vendors.repository.VendorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendorServiceImpl implements VendorService {

    private final VendorRepository vendorRepository;

    public VendorServiceImpl(VendorRepository vendorRepository) {
        this.vendorRepository = vendorRepository;
    }

    @Override
    public VendorDTO createVendor(VendorRequestDTO requestDTO) {
        Vendor vendor = new Vendor();

        vendor.setBusinessName(requestDTO.getBusinessName());
        vendor.setCategory(requestDTO.getCategory());
        vendor.setDescription(requestDTO.getDescription());
        vendor.setContactEmail(requestDTO.getContactEmail());
        vendor.setContactPhone(requestDTO.getContactPhone());
        vendor.setPriceRange(requestDTO.getPriceRange());
        vendor.setImageUrl(requestDTO.getImageUrl());
        vendor.setRating(requestDTO.getRating() != null ? requestDTO.getRating() : 0.0);

        Vendor savedVendor = vendorRepository.save(vendor);
        return mapToDTO(savedVendor);
    }

    @Override
    public VendorDTO getVendorById(Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        return mapToDTO(vendor);
    }

    @Override
    public List<VendorDTO> getAllVendors() {
        return vendorRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<VendorDTO> getVendorsByCategory(String category) {
        return vendorRepository.findByCategory(category)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VendorDTO updateVendor(Long id, VendorRequestDTO requestDTO) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        vendor.setBusinessName(requestDTO.getBusinessName());
        vendor.setCategory(requestDTO.getCategory());
        vendor.setDescription(requestDTO.getDescription());
        vendor.setContactEmail(requestDTO.getContactEmail());
        vendor.setContactPhone(requestDTO.getContactPhone());
        vendor.setPriceRange(requestDTO.getPriceRange());

        if (requestDTO.getRating() != null) {
            vendor.setRating(requestDTO.getRating());
        }

        Vendor updated = vendorRepository.save(vendor);
        return mapToDTO(updated);
    }

    @Override
    public void deleteVendor(Long id) {
        vendorRepository.deleteById(id);
    }

    private VendorDTO mapToDTO(Vendor vendor) {
        VendorDTO dto = new VendorDTO();

        dto.setId(vendor.getId());
        dto.setBusinessName(vendor.getBusinessName());
        dto.setCategory(vendor.getCategory());
        dto.setDescription(vendor.getDescription());
        dto.setContactEmail(vendor.getContactEmail());
        dto.setContactPhone(vendor.getContactPhone());
        dto.setPriceRange(vendor.getPriceRange());
        dto.setRating(vendor.getRating());
        dto.setImageUrl(vendor.getImageUrl());
        dto.setCreatedAt(vendor.getCreatedAt());
        dto.setUpdatedAt(vendor.getUpdatedAt());

        return dto;
    }
}