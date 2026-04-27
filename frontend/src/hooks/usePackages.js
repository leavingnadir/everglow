// src/hooks/usePackages.js
// Custom hook — manages all package state and CRUD operations.
// Components just call this hook and get clean state + handlers back.

import { useState, useEffect, useCallback } from "react";
import {
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "../services/packageService";

export function usePackages() {
  const [packages, setPackages]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const [success, setSuccess]     = useState(null);

  // ── Fetch all ────────────────────────────────────────────────────────────

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPackages();
      setPackages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // ── Create ───────────────────────────────────────────────────────────────

  const addPackage = async (packageData) => {
    setLoading(true);
    setError(null);
    try {
      const created = await createPackage(packageData);
      setPackages((prev) => [...prev, created]);
      setSuccess("Package created successfully!");
      clearSuccessAfterDelay();
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ── Update ───────────────────────────────────────────────────────────────

  const editPackage = async (id, packageData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updatePackage(id, packageData);
      setPackages((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
      setSuccess("Package updated successfully!");
      clearSuccessAfterDelay();
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────

  const removePackage = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deletePackage(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
      setSuccess("Package deleted.");
      clearSuccessAfterDelay();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Helpers ──────────────────────────────────────────────────────────────

  const clearSuccessAfterDelay = () => {
    setTimeout(() => setSuccess(null), 3000);
  };

  const clearError = () => setError(null);

  return {
    packages,
    loading,
    error,
    success,
    fetchPackages,
    addPackage,
    editPackage,
    removePackage,
    clearError,
  };
}
