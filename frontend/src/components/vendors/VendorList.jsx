import React, { useState, useEffect } from 'react';
import VendorCard from './VendorCard';
import { fetchVendors } from '../../services/vendorService';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');

  const categories = ['', 'Photography', 'Videography', 'Catering', 'Venue', 'Decoration', 'Music', 'Other'];

  useEffect(() => {
    loadVendors();
  }, [category]);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const data = await fetchVendors(category);
      setVendors(data);
      setError(null);
    } catch (err) {
      setError('Failed to load vendors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif" style={{ color: "#2C2C2C" }}>Our Vendors</h2>
        
        <div className="flex items-center gap-3">
          <label htmlFor="category" className="text-sm font-medium" style={{ color: "#2C2C2C" }}>Filter by:</label>
          <select 
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-sm text-sm"
            style={{ borderColor: "#EDE0DF", color: "#2C2C2C", outline: "none" }}
          >
            <option value="">All Categories</option>
            {categories.slice(1).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-sm">{error}</div>}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800" style={{ borderColor: "#C0392B" }}></div>
        </div>
      ) : vendors.length === 0 ? (
        <div className="text-center py-20" style={{ color: "#2C2C2C", opacity: 0.6 }}>
          <p className="text-xl">No vendors found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorList;
