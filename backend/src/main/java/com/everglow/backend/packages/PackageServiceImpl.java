package com.everglow.backend.packages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of PackageService.
 * OOP principles applied:
 *   - Single Responsibility: only handles package business logic
 *   - Dependency Injection via constructor (not field injection)
 *   - DTO pattern: entity never leaves this layer
 *   - Soft delete: preserves data integrity
 */
@Service
@Transactional
public class PackageServiceImpl implements PackageService {

    private final PackageRepository packageRepository;

    // Constructor injection — preferred over @Autowired on field (easier to test)
    @Autowired
    public PackageServiceImpl(PackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    // ── READ (all) ─────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public List<PackageDTO> getAllPackages() {
        return packageRepository.findAllActiveOrderedByTier()
                .stream()
                .map(PackageDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ── READ (single) ──────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public PackageDTO getPackageById(Long id) {
        Package pkg = findActivePackageOrThrow(id);
        return PackageDTO.fromEntity(pkg);
    }

    // ── READ (by tier) ─────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public List<PackageDTO> getPackagesByTier(Package.Tier tier) {
        return packageRepository.findByTierOrderByPriceDesc(tier)
                .stream()
                .map(PackageDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ── CREATE ─────────────────────────────────────────────────────────────────

    @Override
    public PackageDTO createPackage(PackageDTO packageDTO) {
        // Validate no duplicate name
        if (packageRepository.existsByNameIgnoreCase(packageDTO.getName())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "A package with the name '" + packageDTO.getName() + "' already exists."
            );
        }

        Package pkg = packageDTO.toEntity();
        pkg.setActive(true);
        Package saved = packageRepository.save(pkg);
        return PackageDTO.fromEntity(saved);
    }

    // ── UPDATE ─────────────────────────────────────────────────────────────────

    @Override
    public PackageDTO updatePackage(Long id, PackageDTO packageDTO) {
        Package existing = findActivePackageOrThrow(id);

        // Check name conflict only if name is changing
        if (!existing.getName().equalsIgnoreCase(packageDTO.getName())
                && packageRepository.existsByNameIgnoreCase(packageDTO.getName())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "A package with the name '" + packageDTO.getName() + "' already exists."
            );
        }

        // Apply updates (encapsulation: use setters, not direct field access)
        existing.setName(packageDTO.getName());
        existing.setTier(packageDTO.getTier());
        existing.setDescription(packageDTO.getDescription());
        existing.setPrice(packageDTO.getPrice());
        existing.setIncludedVendors(packageDTO.getIncludedVendors());

        Package updated = packageRepository.save(existing);
        return PackageDTO.fromEntity(updated);
    }

    // ── DELETE (soft) ──────────────────────────────────────────────────────────

    @Override
    public void deletePackage(Long id) {
        Package pkg = findActivePackageOrThrow(id);
        pkg.setActive(false);          // soft delete — keeps historical data
        packageRepository.save(pkg);
    }

    // ── Private helpers ────────────────────────────────────────────────────────

    private Package findActivePackageOrThrow(Long id) {
        Package pkg = packageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Package not found with id: " + id));
        if (!pkg.isActive()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id: " + id);
        }
        return pkg;
    }
}
