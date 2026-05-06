package com.everglow.backend.vendors.controller;

import com.everglow.backend.vendors.dto.VendorDTO;
import com.everglow.backend.vendors.dto.VendorRequestDTO;
import com.everglow.backend.vendors.service.VendorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin(origins = "*")
public class VendorController {

    private final VendorService vendorService;

    // ✅ FIX: manual constructor injection
    public VendorController(VendorService vendorService) {
        this.vendorService = vendorService;
    }

    @PostMapping
    public ResponseEntity<VendorDTO> createVendor(
            @Valid @RequestBody VendorRequestDTO vendorRequestDTO) {

        return new ResponseEntity<>(
                vendorService.createVendor(vendorRequestDTO),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendorDTO> getVendorById(@PathVariable Long id) {
        return ResponseEntity.ok(vendorService.getVendorById(id));
    }

    @GetMapping
    public ResponseEntity<List<VendorDTO>> getAllVendors(
            @RequestParam(required = false) String category) {

        if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(vendorService.getVendorsByCategory(category));
        }
        return ResponseEntity.ok(vendorService.getAllVendors());
    }

    @PutMapping("/{id}")
    public ResponseEntity<VendorDTO> updateVendor(
            @PathVariable Long id,
            @Valid @RequestBody VendorRequestDTO vendorRequestDTO) {

        return ResponseEntity.ok(vendorService.updateVendor(id, vendorRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
        return ResponseEntity.noContent().build();
    }
}