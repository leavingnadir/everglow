package com.everglow.backend.vendors.service;

import com.everglow.backend.vendors.dto.VendorDTO;
import com.everglow.backend.vendors.dto.VendorRequestDTO;
import com.everglow.backend.vendors.model.Vendor;
import com.everglow.backend.vendors.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VendorServiceImpl implements VendorService {

    private final VendorRepository vendorRepository;

    @Override
    public VendorDTO createVendor(VendorRequestDTO requestDTO) {
        Vendor vendor = Vendor.builder()
                .businessName(requestDTO.getBusinessName())
                .category(requestDTO.getCategory())
                .description(requestDTO.getDescription())
                .contactEmail(requestDTO.getContactEmail())
                .contactPhone(requestDTO.getContactPhone())
                .priceRange(requestDTO.getPriceRange())
                .rating(requestDTO.getRating() != null ? requestDTO.getRating() : 0.0)
                .build();

        Vendor savedVendor = vendorRepository.save(vendor);
        return mapToDTO(savedVendor);
    }

    @Override
    public VendorDTO getVendorById(Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + id));
        return mapToDTO(vendor);
    }

    @Override
    public List<VendorDTO> getAllVendors() {
        return vendorRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<VendorDTO> getVendorsByCategory(String category) {
        return vendorRepository.findByCategory(category).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VendorDTO updateVendor(Long id, VendorRequestDTO requestDTO) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + id));

        vendor.setBusinessName(requestDTO.getBusinessName());
        vendor.setCategory(requestDTO.getCategory());
        vendor.setDescription(requestDTO.getDescription());
        vendor.setContactEmail(requestDTO.getContactEmail());
        vendor.setContactPhone(requestDTO.getContactPhone());
        vendor.setPriceRange(requestDTO.getPriceRange());
        if (requestDTO.getRating() != null) {
            vendor.setRating(requestDTO.getRating());
        }

        Vendor updatedVendor = vendorRepository.save(vendor);
        return mapToDTO(updatedVendor);
    }

    @Override
    public void deleteVendor(Long id) {
        if (!vendorRepository.existsById(id)) {
            throw new RuntimeException("Vendor not found with id: " + id);
        }
        vendorRepository.deleteById(id);
    }

    private VendorDTO mapToDTO(Vendor vendor) {
        return VendorDTO.builder()
                .id(vendor.getId())
                .businessName(vendor.getBusinessName())
                .category(vendor.getCategory())
                .description(vendor.getDescription())
                .contactEmail(vendor.getContactEmail())
                .contactPhone(vendor.getContactPhone())
                .priceRange(vendor.getPriceRange())
                .rating(vendor.getRating())
                .createdAt(vendor.getCreatedAt())
                .updatedAt(vendor.getUpdatedAt())
                .build();
    }
}
