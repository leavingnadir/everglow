package com.everglow.backend.packages;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {

    /** Find all active packages with vendors loaded */
    @Query("SELECT DISTINCT p FROM Package p " +
            "LEFT JOIN FETCH p.includedVendors " +
            "WHERE p.active = true")
    List<Package> findByActiveTrue();

    /** Find all packages by tier with vendors loaded */
    @Query("SELECT DISTINCT p FROM Package p " +
            "LEFT JOIN FETCH p.includedVendors " +
            "WHERE p.tier = :tier")
    List<Package> findByTierOrderByPriceDesc(@Param("tier") Package.Tier tier);

    /** Find all active packages with vendors loaded — ordering done in Java */
    @Query("SELECT DISTINCT p FROM Package p " +
            "LEFT JOIN FETCH p.includedVendors " +
            "WHERE p.active = true")
    List<Package> findAllActiveOrderedByTier();

    /** Check if a package name already exists */
    boolean existsByNameIgnoreCase(String name);
}