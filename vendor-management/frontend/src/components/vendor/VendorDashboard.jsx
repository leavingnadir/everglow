import React, { useState, useEffect } from 'react';
import vendorService from '../../services/vendorService';
import './VendorDashboard.css';

const VendorDashboard = ({ vendorId }) => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadVendorData();
  }, [vendorId]);

  const loadVendorData = async () => {
    try {
      setLoading(true);
      const data = await vendorService.getVendorById(vendorId);
      setVendor(data);
      setEditData(data);
    } catch (err) {
      setError(err.message || 'Failed to load vendor data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const updated = await vendorService.updateVendor(vendorId, editData);
      setVendor(updated);
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Failed to update vendor information');
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!vendor) return <div className="error-message">Vendor not found</div>;

  return (
    <div className="vendor-dashboard">
      <div className="dashboard-header">
        <h2>{vendor.businessName}</h2>
        <div className="status-badge" style={{
          backgroundColor: vendor.status === 'APPROVED' ? '#4CAF50' : 
                          vendor.status === 'PENDING' ? '#FFA500' : '#FF6B6B'
        }}>
          {vendor.status}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="info-card">
          <h3>Business Information</h3>
          {editMode ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={editData.businessName}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editData.description || ''}
                  onChange={handleEditChange}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="website"
                  value={editData.website || ''}
                  onChange={handleEditChange}
                />
              </div>
            </div>
          ) : (
            <div className="info-display">
              <p><strong>Owner:</strong> {vendor.ownerName}</p>
              <p><strong>Type:</strong> {vendor.businessType}</p>
              <p><strong>Description:</strong> {vendor.description || 'N/A'}</p>
              <p><strong>Website:</strong> {vendor.website ? <a href={vendor.website} target="_blank" rel="noopener noreferrer">{vendor.website}</a> : 'N/A'}</p>
            </div>
          )}
        </div>

        <div className="info-card">
          <h3>Contact Information</h3>
          {editMode ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={editData.city}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={editData.location}
                  onChange={handleEditChange}
                />
              </div>
            </div>
          ) : (
            <div className="info-display">
              <p><strong>Email:</strong> {vendor.email}</p>
              <p><strong>Phone:</strong> {vendor.phone}</p>
              <p><strong>Location:</strong> {vendor.location}, {vendor.city}</p>
              <p><strong>Country:</strong> {vendor.country}</p>
            </div>
          )}
        </div>

        <div className="info-card">
          <h3>Performance</h3>
          <div className="performance-stats">
            <div className="stat">
              <span className="stat-label">Average Rating</span>
              <span className="stat-value">
                {vendor.averageRating ? vendor.averageRating.toFixed(2) : 'No ratings yet'}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Reviews</span>
              <span className="stat-value">{vendor.totalReviews}</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3>Account Status</h3>
          <div className="account-status">
            <p><strong>Status:</strong> {vendor.status}</p>
            <p><strong>Active:</strong> {vendor.isActive ? 'Yes' : 'No'}</p>
            <p><strong>Joined:</strong> {new Date(vendor.createdAt).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> {new Date(vendor.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        {!editMode && (
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        )}
        {editMode && (
          <>
            <button className="btn btn-primary" onClick={handleSaveChanges}>
              Save Changes
            </button>
            <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
