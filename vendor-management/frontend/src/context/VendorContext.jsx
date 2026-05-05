import React, { createContext, useState, useCallback } from 'react';

export const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback((vendorData) => {
    setVendor(vendorData);
    setIsAuthenticated(true);
    localStorage.setItem('vendor', JSON.stringify(vendorData));
  }, []);

  const logout = useCallback(() => {
    setVendor(null);
    setIsAuthenticated(false);
    localStorage.removeItem('vendor');
  }, []);

  const updateVendorProfile = useCallback((updatedData) => {
    setVendor(prevVendor => ({
      ...prevVendor,
      ...updatedData
    }));
    localStorage.setItem('vendor', JSON.stringify({
      ...vendor,
      ...updatedData
    }));
  }, [vendor]);

  const value = {
    vendor,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    updateVendorProfile,
    setLoading,
    setError
  };

  return (
    <VendorContext.Provider value={value}>
      {children}
    </VendorContext.Provider>
  );
};
