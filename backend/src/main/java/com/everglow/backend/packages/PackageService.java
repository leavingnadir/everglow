package com.everglow.backend.packages;

import java.util.List;

/**
 * Service interface defining the contract for package operations.
 * OOP principle: program to an interface, not an implementation.
 * This makes the code testable and swappable.
 */
public interface PackageService {

    /** Get all active packages ordered Gold → Platinum → Silver */
    List<PackageDTO> getAllPackages();

    /** Get a single package by ID */
    PackageDTO getPackageById(Long id);

    /** Get all packages by tier */
    List<PackageDTO> getPackagesByTier(Package.Tier tier);

    /** Create a new package */
    PackageDTO createPackage(PackageDTO packageDTO);

    /** Update an existing package */
    PackageDTO updatePackage(Long id, PackageDTO packageDTO);

    /** Soft-delete a package (sets active = false) */
    void deletePackage(Long id);
}
