package com.everglow.backend.packages;

import java.math.BigDecimal;
import java.util.List;

public interface PackageService {
    List<PackageDTO> getAllPackages();
    PackageDTO getPackageById(Long id);
    List<PackageDTO> getPackagesByTier(Package.Tier tier);
    List<PackageDTO> getPackagesByTheme(Package.Theme theme);
    List<PackageDTO> getFeaturedPackages();
    List<PackageDTO> getPackagesByAvailability(Package.Availability availability);
    List<PackageDTO> getPackagesByPriceRange(BigDecimal min, BigDecimal max);  // 🔥 NEW
    PackageDTO createPackage(PackageDTO packageDTO);
    PackageDTO updatePackage(Long id, PackageDTO packageDTO);
    void deletePackage(Long id);
}
