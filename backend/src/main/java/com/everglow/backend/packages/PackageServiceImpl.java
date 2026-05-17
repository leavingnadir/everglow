package com.everglow.backend.packages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PackageServiceImpl implements PackageService {

    private final PackageRepository repo;

    @Autowired
    public PackageServiceImpl(PackageRepository repo) { this.repo = repo; }

    @Override @Transactional(readOnly = true)
    public List<PackageDTO> getAllPackages() {
        return repo.findAllActiveOrderedByTier().stream().map(PackageDTO::fromEntity).collect(Collectors.toList());
    }

    @Override @Transactional(readOnly = true)
    public PackageDTO getPackageById(Long id) { return PackageDTO.fromEntity(findOrThrow(id)); }

    @Override @Transactional(readOnly = true)
    public List<PackageDTO> getPackagesByTier(Package.Tier tier) {
        return repo.findByTierAndActiveTrueOrderByPriceAsc(tier).stream().map(PackageDTO::fromEntity).collect(Collectors.toList());
    }

    @Override @Transactional(readOnly = true)
    public List<PackageDTO> getPackagesByTheme(Package.Theme theme) {
        return repo.findByThemeAndActiveTrueOrderByPriceAsc(theme).stream().map(PackageDTO::fromEntity).collect(Collectors.toList());
    }

    @Override @Transactional(readOnly = true)
    public List<PackageDTO> getFeaturedPackages() {
        return repo.findByFeaturedTrueAndActiveTrue().stream().map(PackageDTO::fromEntity).collect(Collectors.toList());
    }

    @Override @Transactional(readOnly = true)
    public List<PackageDTO> getPackagesByAvailability(Package.Availability availability) {
        return repo.findByAvailabilityAndActiveTrue(availability).stream().map(PackageDTO::fromEntity).collect(Collectors.toList());
    }

    @Override @Transactional(readOnly = true)
    public List<PackageDTO> getPackagesByPriceRange(BigDecimal min, BigDecimal max) {
        return repo.findByPriceRange(min, max).stream().map(PackageDTO::fromEntity).collect(Collectors.toList());
    }

    @Override
    public PackageDTO createPackage(PackageDTO dto) {
        if (repo.existsByNameIgnoreCase(dto.getName()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Package name already exists.");
        Package pkg = dto.toEntity();
        pkg.setActive(true);
        return PackageDTO.fromEntity(repo.save(pkg));
    }

    @Override
    public PackageDTO updatePackage(Long id, PackageDTO dto) {
        Package existing = findOrThrow(id);
        if (!existing.getName().equalsIgnoreCase(dto.getName()) && repo.existsByNameIgnoreCase(dto.getName()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Package name already exists.");
        existing.setName(dto.getName());
        existing.setTier(dto.getTier());
        existing.setTheme(dto.getTheme());
        existing.setDescription(dto.getDescription());
        existing.setPrice(dto.getPrice());
        existing.setDiscountPercent(dto.getDiscountPercent());
        existing.setMaxGuests(dto.getMaxGuests());
        existing.setAvailability(dto.getAvailability() != null ? dto.getAvailability() : Package.Availability.AVAILABLE);
        existing.setBookingUrl(dto.getBookingUrl());
        existing.setIncludedVendors(dto.getIncludedVendors());
        existing.setFeatured(dto.isFeatured());
        return PackageDTO.fromEntity(repo.save(existing));
    }

    @Override
    public void deletePackage(Long id) {
        Package pkg = findOrThrow(id);
        pkg.setActive(false);
        repo.save(pkg);
    }

    private Package findOrThrow(Long id) {
        Package pkg = repo.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found: " + id));
        if (!pkg.isActive()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found: " + id);
        return pkg;
    }
}
