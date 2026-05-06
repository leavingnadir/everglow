import React from 'react';
import { Link } from 'react-router-dom';

const VendorCard = ({ vendor }) => {
  return (
    <div 
      className="p-7 rounded-sm transition-all duration-200 hover:shadow-lg bg-white"
      style={{ border: "1px solid #EDE0DF" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "#C9A84C"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#EDE0DF"}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold font-serif" style={{ color: "#C0392B" }}>
          {vendor.businessName}
        </h3>
        <span className="px-3 py-1 text-xs uppercase tracking-wider rounded-full" 
              style={{ backgroundColor: "#F9EAE8", color: "#2C2C2C" }}>
          {vendor.category}
        </span>
      </div>
      
      <p className="text-sm mb-4 line-clamp-3" style={{ color: "#2C2C2C", opacity: 0.7 }}>
        {vendor.description}
      </p>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: "#EDE0DF" }}>
        <div className="text-sm font-medium" style={{ color: "#C9A84C" }}>
          {vendor.priceRange || 'Contact for pricing'}
        </div>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-sm" style={{ color: "#2C2C2C" }}>{vendor.rating?.toFixed(1) || '0.0'}</span>
        </div>
      </div>
      
      <Link 
        to={`/vendors/${vendor.id}`}
        className="block mt-5 text-center px-4 py-2 text-sm font-sans font-medium transition-colors duration-200"
        style={{ backgroundColor: "#C0392B", color: "#fff" }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#E74C3C"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#C0392B"}
      >
        View Details
      </Link>
    </div>
  );
};

export default VendorCard;
