import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchVendorById } from '../../services/vendorService';

const VendorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVendor = async () => {
      try {
        setLoading(true);
        const data = await fetchVendorById(id);
        setVendor(data);
      } catch (err) {
        setError('Failed to load vendor details.');
      } finally {
        setLoading(false);
      }
    };
    loadVendor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800" style={{ borderColor: "#C0392B" }}></div>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <h2 className="text-2xl text-red-600 mb-4">{error || 'Vendor not found'}</h2>
        <button onClick={() => navigate('/vendors')} className="text-blue-600 hover:underline">
          Back to Vendors
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header section */}
      <div className="w-full h-64 md:h-80 relative flex items-center justify-center" style={{ backgroundColor: "#F9EAE8" }}>
        <div className="text-center px-4 relative z-10">
          <span className="px-3 py-1 text-xs uppercase tracking-wider rounded-full mb-4 inline-block bg-white shadow-sm" 
                style={{ color: "#2C2C2C" }}>
            {vendor.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900">{vendor.businessName}</h1>
          <div className="flex items-center justify-center mt-4">
            <span className="text-yellow-500 text-xl mr-2">★</span>
            <span className="font-medium text-gray-800">{vendor.rating?.toFixed(1) || '0.0'} Rating</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white p-8 md:p-12 shadow-lg rounded-sm border border-gray-100">
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-serif mb-4" style={{ color: "#C0392B" }}>About</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-light">
                {vendor.description || 'No description available for this vendor.'}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-sm border" style={{ borderColor: "#EDE0DF" }}>
              <h3 className="text-lg font-serif mb-4 pb-2 border-b" style={{ color: "#2C2C2C", borderColor: "#EDE0DF" }}>
                Contact Information
              </h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider">Email</p>
                  <a href={`mailto:${vendor.contactEmail}`} className="text-gray-800 hover:text-red-700 transition">
                    {vendor.contactEmail}
                  </a>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider">Phone</p>
                  <a href={`tel:${vendor.contactPhone}`} className="text-gray-800 hover:text-red-700 transition">
                    {vendor.contactPhone}
                  </a>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider">Price Range</p>
                  <p className="font-medium" style={{ color: "#C9A84C" }}>
                    {vendor.priceRange || 'Contact for pricing'}
                  </p>
                </div>
              </div>

              <button className="w-full mt-8 py-3 text-white text-sm font-medium tracking-wider uppercase transition-colors"
                      style={{ backgroundColor: "#C0392B" }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#E74C3C"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = "#C0392B"}>
                Request Quote
              </button>
            </div>
          </div>
          
        </div>
        
        <div className="mt-8 text-center">
          <button onClick={() => navigate('/vendors')} className="text-sm uppercase tracking-wider text-gray-500 hover:text-gray-800 transition">
            &larr; Back to all vendors
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsPage;
