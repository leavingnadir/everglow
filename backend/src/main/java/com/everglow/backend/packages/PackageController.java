package com.everglow.backend.packages;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "*")
public class PackageController {

    private final PackageService packageService;

    @Autowired
    public PackageController(PackageService packageService) { this.packageService = packageService; }

    @GetMapping
    public ResponseEntity<List<PackageDTO>> getAll() {
        return ResponseEntity.ok(packageService.getAllPackages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PackageDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(packageService.getPackageById(id));
    }

    @GetMapping("/tier/{tier}")
    public ResponseEntity<List<PackageDTO>> getByTier(@PathVariable Package.Tier tier) {
        return ResponseEntity.ok(packageService.getPackagesByTier(tier));
    }

    @GetMapping("/theme/{theme}")
    public ResponseEntity<List<PackageDTO>> getByTheme(@PathVariable Package.Theme theme) {
        return ResponseEntity.ok(packageService.getPackagesByTheme(theme));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<PackageDTO>> getFeatured() {
        return ResponseEntity.ok(packageService.getFeaturedPackages());
    }

    @GetMapping("/availability/{status}")
    public ResponseEntity<List<PackageDTO>> getByAvailability(@PathVariable Package.Availability status) {
        return ResponseEntity.ok(packageService.getPackagesByAvailability(status));
    }

    // 🔥 Price range: GET /api/packages/price-range?min=500000&max=2000000
    @GetMapping("/price-range")
    public ResponseEntity<List<PackageDTO>> getByPriceRange(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max) {
        return ResponseEntity.ok(packageService.getPackagesByPriceRange(min, max));
    }

    @PostMapping
    public ResponseEntity<PackageDTO> create(@Valid @RequestBody PackageDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(packageService.createPackage(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PackageDTO> update(@PathVariable Long id, @Valid @RequestBody PackageDTO dto) {
        return ResponseEntity.ok(packageService.updatePackage(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }
}
