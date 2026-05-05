import React, { useState } from 'react';
import vendorService from '../../services/vendorService';
import './VendorRegistration.css';

const VendorRegistration = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    businessName: '',
    ownerName: '',
    description: '',
    phone: '',
    location: '',
    city: '',
    country: '',
    businessType: '',
    website: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await vendorService.register(formData);
      setSuccess(true);
      setFormData({
        email: '',
        password: '',
        businessName: '',
        ownerName: '',
        description: '',
        phone: '',
        location: '',
        city: '',
        country: '',
        businessType: '',
        website: ''
      });
      
      if (onRegistrationSuccess) {
        onRegistrationSuccess(response);
      }

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vendor-registration">
      <h2>Register as a Vendor</h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">Registration successful! Your account is pending approval.</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Account Information</h3>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Business Information</h3>
          <div className="form-group">
            <label>Business Name *</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Owner Name *</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Business Type *</label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              required
            >
              <option value="">Select Business Type</option>
              <option value="Photography">Photography</option>
              <option value="Catering">Catering</option>
              <option value="Decoration">Decoration</option>
              <option value="Venue">Venue</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Country *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default VendorRegistration;
