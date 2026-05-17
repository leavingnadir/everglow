// src/hooks/usePackages.js
import { useState, useEffect, useCallback } from "react";
import { getAllPackages, createPackage, updatePackage, deletePackage } from "../services/packageService";

export function usePackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [success, setSuccess]   = useState(null);

  const flash = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(null), 3000); };

  const fetchPackages = useCallback(async () => {
    setLoading(true); setError(null);
    try { setPackages(await getAllPackages()); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  const addPackage = async (data) => {
    setLoading(true); setError(null);
    try {
      const created = await createPackage(data);
      setPackages((prev) => [...prev, created]);
      flash("Package created!"); return created;
    } catch (err) { setError(err.message); throw err; }
    finally { setLoading(false); }
  };

  const editPackage = async (id, data) => {
    setLoading(true); setError(null);
    try {
      const updated = await updatePackage(id, data);
      setPackages((prev) => prev.map((p) => (p.id === id ? updated : p)));
      flash("Package updated!"); return updated;
    } catch (err) { setError(err.message); throw err; }
    finally { setLoading(false); }
  };

  const removePackage = async (id) => {
    setLoading(true); setError(null);
    try {
      await deletePackage(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
      flash("Package deleted.");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return { packages, loading, error, success, fetchPackages, addPackage, editPackage, removePackage, clearError: () => setError(null) };
}
