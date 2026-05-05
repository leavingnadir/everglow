import React, { useState, useEffect } from 'react';
import vendorService from '../../services/vendorService';
import VendorRegistration from '../../components/vendor/VendorRegistration';
import './VendorPage.css';

const VendorPage = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [filterCity, setFilterCity] = useState('');
  const [filterBusinessType, setFilterBusinessType] = useState('');

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const data = await vendorService.getActiveVendors();
      setVendors(data);
    } catch (err) {
      setError(err.message || 'Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByCity = async () => {
    if (!filterCity.trim()) {
      loadVendors();
      return;
    }
    try {
      setLoading(true);
      const data = await vendorService.getVendorsByCity(filterCity);
      setVendors(data);
    } catch (err) {
      setError(err.message || 'Failed to filter vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByBusinessType = async () => {
    if (!filterBusinessType.trim()) {
      loadVendors();
      return;
    }
    try {
      setLoading(true);
      const data = await vendorService.getVendorsByBusinessType(filterBusinessType);
      setVendors(data);
    } catch (err) {
      setError(err.message || 'Failed to filter vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    loadVendors();
  };

  if (showRegistration) {
    return (
      <div className="vendor-page">
        <button className="btn-back" onClick={() => setShowRegistration(false)}>
          ← Back to Vendors
        </button>
        <VendorRegistration onRegistrationSuccess={handleRegistrationSuccess} />
      </div>
    );
  }

  return (
    <div className="vendor-page">
      <div className="page-header">
        <h1>Vendor Management</h1>
        <button className="btn-register" onClick={() => setShowRegistration(true)}>
          + Register as Vendor
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by city..."
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          />
          <button onClick={handleFilterByCity}>Search by City</button>
        </div>
        <div className="filter-group">
          <select
            value={filterBusinessType}
            onChange={(e) => setFilterBusinessType(e.target.value)}
          >
            <option value="">All Business Types</option>
            <option value="Photography">Photography</option>
            <option value="Catering">Catering</option>
            <option value="Decoration">Decoration</option>
            <option value="Venue">Venue</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <button onClick={handleFilterByBusinessType}>Filter</button>
        </div>
        <button className="btn-reset" onClick={loadVendors}>Reset Filters</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading vendors...</div>
      ) : vendors.length === 0 ? (
        <div className="no-vendors">No vendors found</div>
      ) : (
        <div className="vendors-grid">
          {vendors.map(vendor => (
            <div key={vendor.id} className="vendor-card">
              <div className="vendor-header">
                <h3>{vendor.businessName}</h3>
                <span className="business-type">{vendor.businessType}</span>
              </div>
              <p className="owner"><strong>{vendor.ownerName}</strong></p>
              <p className="description">{vendor.description || 'No description provided'}</p>
              <div className="vendor-details">
                <p><strong>Location:</strong> {vendor.location}, {vendor.city}</p>
                <p><strong>Phone:</strong> {vendor.phone}</p>
                {vendor.website && (
                  <p><strong>Website:</strong> <a href={vendor.website} target="_blank" rel="noopener noreferrer">{vendor.website}</a></p>
                )}
              </div>
              <div className="vendor-rating">
                <span className="rating">
                  ⭐ {vendor.averageRating ? vendor.averageRating.toFixed(1) : 'N/A'} 
                  ({vendor.totalReviews} reviews)
                </span>
              </div>
              <button className="btn-view">View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorPage;
