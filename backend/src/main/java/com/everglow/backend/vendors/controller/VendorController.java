package com.everglow.backend.vendors.controller;

import com.everglow.backend.vendors.dto.VendorDTO;
import com.everglow.backend.vendors.dto.VendorRequestDTO;
import com.everglow.backend.vendors.service.VendorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Adjust this in production
public class VendorController {

    private final VendorService vendorService;

    @PostMapping
    public ResponseEntity<VendorDTO> createVendor(@Valid @RequestBody VendorRequestDTO vendorRequestDTO) {
        VendorDTO createdVendor = vendorService.createVendor(vendorRequestDTO);
        return new ResponseEntity<>(createdVendor, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendorDTO> getVendorById(@PathVariable Long id) {
        VendorDTO vendor = vendorService.getVendorById(id);
        return ResponseEntity.ok(vendor);
    }

    @GetMapping
    public ResponseEntity<List<VendorDTO>> getAllVendors(@RequestParam(required = false) String category) {
        List<VendorDTO> vendors;
        if (category != null && !category.isEmpty()) {
            vendors = vendorService.getVendorsByCategory(category);
        } else {
            vendors = vendorService.getAllVendors();
        }
        return ResponseEntity.ok(vendors);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VendorDTO> updateVendor(
            @PathVariable Long id, 
            @Valid @RequestBody VendorRequestDTO vendorRequestDTO) {
        VendorDTO updatedVendor = vendorService.updateVendor(id, vendorRequestDTO);
        return ResponseEntity.ok(updatedVendor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
        return ResponseEntity.noContent().build();
    }
}
