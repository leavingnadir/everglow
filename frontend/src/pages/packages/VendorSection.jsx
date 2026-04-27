// src/pages/packages/VendorSection.jsx
// Shows vendor categories for a package with icons and descriptions.

const VENDOR_INFO = {
  VIDEOGRAPHY:        { icon: "🎬", desc: "Full event videography & highlight reel" },
  FLORA:              { icon: "💐", desc: "Floral arrangements & décor" },
  CATERING:           { icon: "🍽️", desc: "Full catering & beverage service" },
  PHOTOGRAPHY:        { icon: "📸", desc: "Professional photography & album" },
  SOUNDS_AND_LIGHTING:{ icon: "🎵", desc: "PA system, DJ, and lighting setup" },
  DANCING_TEAM:       { icon: "💃", desc: "Live dance performance team" },
};

export default function VendorSection({ vendors = [] }) {
  if (!vendors || vendors.length === 0) {
    return (
      <p className="text-sm text-gray-400 italic">No vendors assigned to this package.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {vendors.map((vendorKey) => {
        const info = VENDOR_INFO[vendorKey] || { icon: "🔧", desc: vendorKey };
        return (
          <div
            key={vendorKey}
            className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
          >
            <span className="text-2xl">{info.icon}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {vendorKey.replace(/_/g, " ")}
              </p>
              <p className="text-xs text-gray-500">{info.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
