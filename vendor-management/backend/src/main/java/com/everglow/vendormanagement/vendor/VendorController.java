package com.everglow.vendormanagement.vendor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class VendorController {
    
    @Autowired
    private VendorService vendorService;

    // Public endpoints
    @PostMapping("/register")
    public ResponseEntity<VendorDTO> registerVendor(@RequestBody VendorDTO vendorDTO) {
        try {
            VendorDTO savedVendor = vendorService.registerVendor(vendorDTO);
            return new ResponseEntity<>(savedVendor, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendorDTO> getVendorById(@PathVariable Long id) {
        Optional<VendorDTO> vendor = vendorService.getVendorById(id);
        return vendor.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<VendorDTO> getVendorByEmail(@PathVariable String email) {
        Optional<VendorDTO> vendor = vendorService.getVendorByEmail(email);
        return vendor.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<VendorDTO>> getAllVendors() {
        List<VendorDTO> vendors = vendorService.getAllVendors();
        return new ResponseEntity<>(vendors, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<VendorDTO>> getActiveVendors() {
        List<VendorDTO> vendors = vendorService.getActiveVendors();
        return new ResponseEntity<>(vendors, HttpStatus.OK);
    }

    @GetMapping("/filter/city/{city}")
    public ResponseEntity<List<VendorDTO>> getVendorsByCity(@PathVariable String city) {
        List<VendorDTO> vendors = vendorService.getVendorsByCity(city);
        return new ResponseEntity<>(vendors, HttpStatus.OK);
    }

    @GetMapping("/filter/business-type/{businessType}")
    public ResponseEntity<List<VendorDTO>> getVendorsByBusinessType(@PathVariable String businessType) {
        List<VendorDTO> vendors = vendorService.getVendorsByBusinessType(businessType);
        return new ResponseEntity<>(vendors, HttpStatus.OK);
    }

    // Protected endpoints (require authentication)
    @PutMapping("/{id}")
    public ResponseEntity<VendorDTO> updateVendor(@PathVariable Long id, @RequestBody VendorDTO vendorDTO) {
        try {
            VendorDTO updatedVendor = vendorService.updateVendor(id, vendorDTO);
            return new ResponseEntity<>(updatedVendor, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        try {
            vendorService.deleteVendor(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Admin endpoints
    @GetMapping("/filter/status/{status}")
    public ResponseEntity<List<VendorDTO>> getVendorsByStatus(@PathVariable String status) {
        try {
            List<VendorDTO> vendors = vendorService.getVendorsByStatus(status);
            return new ResponseEntity<>(vendors, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<VendorDTO> approveVendor(@PathVariable Long id) {
        try {
            VendorDTO vendor = vendorService.approveVendor(id);
            return new ResponseEntity<>(vendor, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<VendorDTO> rejectVendor(@PathVariable Long id) {
        try {
            VendorDTO vendor = vendorService.rejectVendor(id);
            return new ResponseEntity<>(vendor, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/suspend")
    public ResponseEntity<VendorDTO> suspendVendor(@PathVariable Long id) {
        try {
            VendorDTO vendor = vendorService.suspendVendor(id);
            return new ResponseEntity<>(vendor, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
