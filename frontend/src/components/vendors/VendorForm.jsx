import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVendor, updateVendor, fetchVendorById } from '../../services/vendorService';

const VendorForm = ({ vendorId, onSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'Photography',
    description: '',
    contactEmail: '',
    contactPhone: '',
    priceRange: '',
    rating: 0.0
  });

  const categories = ['Photography', 'Videography', 'Catering', 'Venue', 'Decoration', 'Music', 'Other'];

  useEffect(() => {
    if (vendorId) {
      loadVendor();
    }
  }, [vendorId]);

  const loadVendor = async () => {
    try {
      setLoading(true);
      const data = await fetchVendorById(vendorId);
      setFormData({
        businessName: data.businessName || '',
        category: data.category || 'Photography',
        description: data.description || '',
        contactEmail: data.contactEmail || '',
        contactPhone: data.contactPhone || '',
        priceRange: data.priceRange || '',
        rating: data.rating || 0.0
      });
    } catch (err) {
      setError('Failed to load vendor details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      if (vendorId) {
        await updateVendor(vendorId, formData);
      } else {
        await createVendor(formData);
      }
      
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to save vendor. Please check the inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-serif mb-6 text-center" style={{ color: "#2C2C2C" }}>
        {vendorId ? 'Edit Vendor' : 'Register New Vendor'}
      </h2>

      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#2C2C2C" }}>Business Name *</label>
            <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required
              className="w-full p-2 border rounded-sm outline-none focus:border-red-800 transition-colors"
              style={{ borderColor: "#EDE0DF" }} />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#2C2C2C" }}>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required
              className="w-full p-2 border rounded-sm outline-none focus:border-red-800 transition-colors"
              style={{ borderColor: "#EDE0DF" }}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#2C2C2C" }}>Contact Email *</label>
            <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required
              className="w-full p-2 border rounded-sm outline-none focus:border-red-800 transition-colors"
              style={{ borderColor: "#EDE0DF" }} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#2C2C2C" }}>Contact Phone *</label>
            <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange} required
              className="w-full p-2 border rounded-sm outline-none focus:border-red-800 transition-colors"
              style={{ borderColor: "#EDE0DF" }} />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#2C2C2C" }}>Price Range</label>
            <input type="text" name="priceRange" value={formData.priceRange} onChange={handleChange} placeholder="e.g. $500 - $1500"
              className="w-full p-2 border rounded-sm outline-none focus:border-red-800 transition-colors"
              style={{ borderColor: "#EDE0DF" }} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#2C2C2C" }}>Initial Rating (0-5)</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" step="0.1"
              className="w-full p-2 border rounded-sm outline-none focus:border-red-800 transition-colors"
              style={{ borderColor: "#EDE0DF" }} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "#2C2C2C" }}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4"
            className="w-full p-2 border rounded-sm outline-none focus:border-red-800 transition-colors"
            style={{ borderColor: "#EDE0DF" }}></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: "#EDE0DF" }}>
          <button type="button" onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-sm text-sm border hover:bg-gray-50 transition-colors"
            style={{ borderColor: "#EDE0DF", color: "#2C2C2C" }}>
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="px-5 py-2 rounded-sm text-sm text-white transition-colors"
            style={{ backgroundColor: loading ? "#eab308" : "#C0392B" }}>
            {loading ? 'Saving...' : 'Save Vendor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorForm;
