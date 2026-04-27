package com.everglow.backend.packages;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Package.
 * Spring Data JPA automatically implements CRUD methods.
 */
@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {

    /** Find all active packages */
    List<Package> findByActiveTrue();

    /** Find all packages by tier (GOLD, PLATINUM, SILVER) */
    List<Package> findByTierOrderByPriceDesc(Package.Tier tier);

    /** Find all active packages ordered: GOLD → PLATINUM → SILVER, then by price */
    @Query("SELECT p FROM Package p WHERE p.active = true " +
           "ORDER BY CASE p.tier " +
           "WHEN 'GOLD' THEN 1 WHEN 'PLATINUM' THEN 2 WHEN 'SILVER' THEN 3 END, p.price DESC")
    List<Package> findAllActiveOrderedByTier();

    /** Check if a package name already exists */
    boolean existsByNameIgnoreCase(String name);
}
