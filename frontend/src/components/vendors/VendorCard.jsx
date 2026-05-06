import React from 'react';
import { Link } from 'react-router-dom';

const FALLBACK_IMG = "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80";

const VendorCard = ({ vendor }) => {
  return (
    <div
      className="overflow-hidden transition-all duration-200 hover:shadow-lg bg-white"
      style={{ border: "1px solid #EDE0DF", borderRadius: "2px" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "#C9A84C"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#EDE0DF"}
    >
      <div
        style={{
          height: "200px",
          width: "100%",
          backgroundImage: `url(${vendor.imageUrl || FALLBACK_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "rgba(255,255,255,0.95)",
            padding: "4px 12px",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#2C2C2C",
          }}
        >
          {vendor.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold font-serif" style={{ color: "#C0392B" }}>
            {vendor.businessName}
          </h3>
        </div>

        <p className="text-sm mb-4 line-clamp-3" style={{ color: "#2C2C2C", opacity: 0.7 }}>
          {vendor.description}
        </p>

        <div
          className="flex items-center justify-between mt-4 pt-4 border-t"
          style={{ borderColor: "#EDE0DF" }}
        >
          <div className="text-sm font-medium" style={{ color: "#C9A84C" }}>
            {vendor.priceRange || 'Contact for pricing'}
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm" style={{ color: "#2C2C2C" }}>
              {vendor.rating?.toFixed(1) || '0.0'}
            </span>
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
    </div>
  );
};

export default VendorCard;