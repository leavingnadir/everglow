package com.everglow.backend.packages;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {

    @Query("SELECT p FROM Package p WHERE p.active = true ORDER BY " +
           "CASE p.tier WHEN 'SILVER' THEN 1 WHEN 'GOLD' THEN 2 WHEN 'PLATINUM' THEN 3 WHEN 'DIAMOND' THEN 4 END, p.price ASC")
    List<Package> findAllActiveOrderedByTier();

    List<Package> findByTierAndActiveTrueOrderByPriceAsc(Package.Tier tier);

    List<Package> findByThemeAndActiveTrueOrderByPriceAsc(Package.Theme theme);

    List<Package> findByFeaturedTrueAndActiveTrue();

    List<Package> findByAvailabilityAndActiveTrue(Package.Availability availability);

    // 🔥 Price range search
    @Query("SELECT p FROM Package p WHERE p.active = true AND p.price BETWEEN :min AND :max ORDER BY p.price ASC")
    List<Package> findByPriceRange(@Param("min") BigDecimal min, @Param("max") BigDecimal max);

    boolean existsByNameIgnoreCase(String name);
}
