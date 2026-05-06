import React from 'react';
import VendorList from '../../components/vendors/VendorList';

const VendorsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-16" style={{ backgroundColor: "#F9EAE8" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.2em] uppercase font-sans font-medium mb-3" style={{ color: "#C9A84C" }}>
            Premium Partners
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: "#2C2C2C" }}>
            Discover Our Vendors
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            We've partnered with the finest professionals in the industry to ensure your special day is nothing short of perfection. Browse our curated selection of talented vendors.
          </p>
        </div>
      </div>
      
      <VendorList />
    </div>
  );
};

export default VendorsPage;
