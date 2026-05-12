// src/pages/packages/PackageCard.jsx
import { useState } from "react";
import { TIER_STYLES, THEMES, VENDOR_CATEGORIES, AVAILABILITY_STYLES, formatLKR, calcEMI } from "../../services/packageService";

export default function PackageCard({ pkg, isAdmin, onEdit, onDelete }) {
  const [showEMI, setShowEMI] = useState(false);
  const tier   = TIER_STYLES[pkg.tier]   || TIER_STYLES.SILVER;
  const theme  = THEMES.find((t) => t.value === pkg.theme);
  const avail  = AVAILABILITY_STYLES[pkg.availability] || AVAILABILITY_STYLES.AVAILABLE;
  const hasDiscount = pkg.discountPercent > 0;
  const finalPrice  = hasDiscount ? pkg.discountedPrice : pkg.price;
  const emiOptions  = calcEMI(finalPrice);
  const isBooked    = pkg.availability === "BOOKED";

  // Group vendors
  const groups = {};
  (pkg.includedVendors || []).forEach((v) => {
    const cat = VENDOR_CATEGORIES.find((x) => x.value === v);
    const grp = cat?.group || "Other";
    if (!groups[grp]) groups[grp] = [];
    groups[grp].push(cat?.label || v);
  });

  return (
    <div style={{ backgroundColor: "#fff", border: `2px solid ${tier.border}`, display: "flex", flexDirection: "column", transition: "box-shadow 0.2s", opacity: isBooked ? 0.75 : 1 }}
      onMouseEnter={e => { if (!isBooked) e.currentTarget.style.boxShadow = `0 8px 32px ${tier.color}33`; }}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Tier banner */}
      <div style={{ backgroundColor: tier.color, padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff" }}>
          {tier.icon} {tier.label} — {tier.subtitle}
        </span>
        {pkg.featured && <span style={{ fontSize: "10px", background: "rgba(255,255,255,0.25)", color: "#fff", padding: "2px 8px" }}>★ FEATURED</span>}
      </div>

      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "14px" }}>

        {/* Availability badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {theme && <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: tier.color, letterSpacing: "0.15em", textTransform: "uppercase" }}>{theme.icon} {theme.label}</span>}
          <span style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "var(--font-body)", fontSize: "11px", color: avail.color, background: avail.bg, padding: "3px 10px", border: `1px solid ${avail.color}33` }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: avail.dot, display: "inline-block" }} />
            {avail.label}
          </span>
        </div>

        {/* Name */}
        <h3 style={{ fontFamily: "var(--font-brand)", fontSize: "22px", fontWeight: 300, fontStyle: "italic", color: "#2C2C2C", margin: 0, lineHeight: 1.3 }}>
          {pkg.name}
        </h3>

        {/* Price + Discount */}
        <div>
          {hasDiscount && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#9CA3AF", textDecoration: "line-through" }}>{formatLKR(pkg.price)}</span>
              <span style={{ fontSize: "11px", background: "#C0392B", color: "#fff", padding: "2px 8px", fontFamily: "var(--font-body)" }}>{pkg.discountPercent}% OFF</span>
            </div>
          )}
          <p style={{ fontFamily: "var(--font-brand)", fontSize: "28px", fontWeight: 300, color: tier.color, margin: 0 }}>
            {formatLKR(finalPrice)}
          </p>
          {hasDiscount && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#15803d", margin: "2px 0 0" }}>
              You save {formatLKR(pkg.savings)}
            </p>
          )}
        </div>

        {/* EMI toggle */}
        <div>
          <button onClick={() => setShowEMI(!showEMI)} style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", background: "transparent", border: "1px solid #EDE0DF", color: "#C9A84C", padding: "5px 14px", cursor: "pointer" }}>
            {showEMI ? "Hide" : "View"} EMI Options
          </button>
          {showEMI && (
            <div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {emiOptions.map((e) => (
                <div key={e.months} style={{ border: "1px solid #EDE0DF", padding: "8px 12px", textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-brand)", fontSize: "16px", fontWeight: 300, color: tier.color, margin: 0 }}>{formatLKR(e.amount)}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "#9CA3AF", margin: 0 }}>/ month × {e.months}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Max guests */}
        {pkg.maxGuests && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#6B7280", margin: 0 }}>👥 Up to {pkg.maxGuests} guests</p>
        )}

        {/* Description */}
        {pkg.description && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#2C2C2C", opacity: 0.65, lineHeight: 1.7, margin: 0 }}>{pkg.description}</p>
        )}

        {/* Vendor groups */}
        {Object.keys(groups).length > 0 && (
          <div style={{ borderTop: "1px solid #EDE0DF", paddingTop: "14px" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "10px" }}>Included Services</p>
            {Object.entries(groups).map(([grp, items]) => (
              <div key={grp} style={{ marginBottom: "8px" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "#9CA3AF", letterSpacing: "0.1em", marginBottom: "4px" }}>{grp}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {items.map((item) => (
                    <span key={item} style={{ fontFamily: "var(--font-body)", fontSize: "11px", padding: "3px 10px", border: "1px solid #EDE0DF", color: "#2C2C2C" }}>✔ {item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ marginTop: "auto", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {!isAdmin ? (
            <>
              {/* Book Now button */}
              {pkg.bookingUrl && !isBooked ? (
                <a href={pkg.bookingUrl} style={{ display: "block", width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "13px", background: tier.color, color: "#fff", border: "none", cursor: "pointer", textAlign: "center", textDecoration: "none" }}>
                  Book Now →
                </a>
              ) : (
                <button disabled={isBooked} style={{ width: "100%", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "13px", background: isBooked ? "#D1D5DB" : tier.color, color: isBooked ? "#9CA3AF" : "#fff", border: "none", cursor: isBooked ? "not-allowed" : "pointer" }}>
                  {isBooked ? "Fully Booked" : "Select Package"}
                </button>
              )}
            </>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => onEdit(pkg)} style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "10px", background: "transparent", color: "#2C2C2C", border: "1px solid #D0B8B4", cursor: "pointer" }}
                onMouseEnter={e => e.target.style.borderColor = "#2C2C2C"}
                onMouseLeave={e => e.target.style.borderColor = "#D0B8B4"}>
                Edit
              </button>
              <button onClick={() => onDelete(pkg.id)} style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "10px", background: "#C0392B", color: "#fff", border: "none", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
