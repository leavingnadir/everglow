package com.everglow.backend.packages;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Package management.
 *
 * Endpoints:
 *   GET    /api/packages           → list all active packages
 *   GET    /api/packages/{id}      → get one package
 *   GET    /api/packages/tier/{t}  → filter by tier (GOLD/PLATINUM/SILVER)
 *   POST   /api/packages           → create package
 *   PUT    /api/packages/{id}      → update package
 *   DELETE /api/packages/{id}      → soft-delete package
 */
@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "*")  // Vite dev server
public class PackageController {

    private final PackageService packageService;

    @Autowired
    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    // ── GET all ───────────────────────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<List<PackageDTO>> getAllPackages() {
        return ResponseEntity.ok(packageService.getAllPackages());
    }

    // ── GET by ID ─────────────────────────────────────────────────────────────

    @GetMapping("/{id}")
    public ResponseEntity<PackageDTO> getPackageById(@PathVariable Long id) {
        return ResponseEntity.ok(packageService.getPackageById(id));
    }

    // ── GET by tier ───────────────────────────────────────────────────────────

    @GetMapping("/tier/{tier}")
    public ResponseEntity<List<PackageDTO>> getByTier(
            @PathVariable Package.Tier tier) {
        return ResponseEntity.ok(packageService.getPackagesByTier(tier));
    }

    // ── POST create ───────────────────────────────────────────────────────────

    @PostMapping
    public ResponseEntity<PackageDTO> createPackage(
            @Valid @RequestBody PackageDTO packageDTO) {
        PackageDTO created = packageService.createPackage(packageDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // ── PUT update ────────────────────────────────────────────────────────────

    @PutMapping("/{id}")
    public ResponseEntity<PackageDTO> updatePackage(
            @PathVariable Long id,
            @Valid @RequestBody PackageDTO packageDTO) {
        return ResponseEntity.ok(packageService.updatePackage(id, packageDTO));
    }

    // ── DELETE (soft) ─────────────────────────────────────────────────────────

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }
}
