import { TIER_STYLES, VENDOR_CATEGORIES } from "../../services/packageService";

export default function PackageCard({ pkg, onEdit, onDelete, isAdmin }) {
  const style = TIER_STYLES[pkg.tier] || TIER_STYLES.SILVER;
  const vendorLabel = (value) => VENDOR_CATEGORIES.find((v) => v.value === value)?.label || value;

  const tierAccent = pkg.tier === "GOLD" ? "#C9A84C" : pkg.tier === "PLATINUM" ? "#7E8A97" : "#9CA3AF";

  return (
    <div
      style={{ backgroundColor: "#ffffff", border: "1px solid #EDE0DF", padding: "32px 28px", transition: "border-color 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = tierAccent; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDE0DF"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Tier badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: tierAccent }}>
          {style.icon} {pkg.tier}
        </span>
        <span style={{ fontFamily: "var(--font-brand)", fontSize: "22px", fontStyle: "italic", fontWeight: 300, color: "#2C2C2C" }}>
          ${Number(pkg.price).toLocaleString()}
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#EDE0DF", marginBottom: "20px" }} />

      {/* Name */}
      <h3 style={{ fontFamily: "var(--font-brand)", fontSize: "22px", fontWeight: 300, fontStyle: "italic", color: "#2C2C2C", marginBottom: "10px", lineHeight: 1.3 }}>
        {pkg.name}
      </h3>

      {/* Description */}
      {pkg.description && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#2C2C2C", opacity: 0.6, lineHeight: 1.7, marginBottom: "20px" }}>
          {pkg.description}
        </p>
      )}

      {/* Vendors */}
      {pkg.includedVendors && pkg.includedVendors.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "10px" }}>
            Included Services
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {pkg.includedVendors.map((v) => (
              <span
                key={v}
                style={{ fontFamily: "var(--font-body)", fontSize: "11px", padding: "4px 12px", border: "1px solid #EDE0DF", color: "#2C2C2C", opacity: 0.75 }}
              >
                {vendorLabel(v)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Admin actions */}
      {isAdmin && (
        <div style={{ display: "flex", gap: "10px", paddingTop: "20px", borderTop: "1px solid #EDE0DF" }}>
          <button
            onClick={() => onEdit(pkg)}
            style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "10px", background: "transparent", color: "#2C2C2C", border: "1px solid #D0B8B4", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.target.style.borderColor = "#C0392B"; e.target.style.color = "#C0392B"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#D0B8B4"; e.target.style.color = "#2C2C2C"; }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(pkg.id)}
            style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "10px", background: "#C0392B", color: "#fff", border: "1px solid #C0392B", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.target.style.background = "#E74C3C"; }}
            onMouseLeave={e => { e.target.style.background = "#C0392B"; }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
