// src/pages/packages/PackageCard.jsx — LUXURY EVERGLOW DESIGN
import { TIER_STYLES, THEMES, VENDOR_CATEGORIES, AVAILABILITY_STYLES, formatLKR } from "../../services/packageService";

// Premium wedding images per tier (Unsplash)
const TIER_IMAGES = {
  SILVER:   "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  GOLD:     "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  PLATINUM: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
  DIAMOND:  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
};

const CORE_SERVICES = [
  "PHOTOGRAPHY", "VIDEOGRAPHY", "BUFFET_CATERING",
  "FLORAL_DESIGN", "MAKEUP_ARTIST", "DJ", "LIVE_BAND",
];

export default function PackageCard({ pkg, isAdmin, onEdit, onDelete, onClick }) {
  const tier   = TIER_STYLES[pkg.tier]  || TIER_STYLES.SILVER;
  const theme  = THEMES.find((t) => t.value === pkg.theme);
  const avail  = AVAILABILITY_STYLES[pkg.availability] || AVAILABILITY_STYLES.AVAILABLE;
  const isBooked = pkg.availability === "BOOKED";
  const finalPrice = (pkg.discountedPrice && pkg.discountPercent > 0) ? pkg.discountedPrice : pkg.price;

  const displayVendors = (pkg.includedVendors || []).filter(v => CORE_SERVICES.includes(v)).slice(0, 6);
  const vendorLabel = (v) => {
    const map = {
      PHOTOGRAPHY: "Photography", VIDEOGRAPHY: "Videography",
      BUFFET_CATERING: "Catering", FLORAL_DESIGN: "Floral Decoration",
      MAKEUP_ARTIST: "Makeup Artist", DJ: "Music & DJ", LIVE_BAND: "Live Band",
      SET_MENU_CATERING: "Catering", DRONE_SHOOT: "Drone Shoot",
      TRADITIONAL_DANCERS: "Traditional Dancers", BRIDAL_DRESSING: "Bridal Dressing",
    };
    return map[v] || VENDOR_CATEGORIES.find(x => x.value === v)?.label || v;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        .pkg-card {
          background: #fff;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 20px rgba(44,24,16,0.06);
          transition: transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          border: 1px solid #EDE0CE;
        }
        .pkg-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(44,24,16,0.13);
        }
        .pkg-card-img {
          width: 100%; height: 240px; object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.23,1,0.32,1);
          display: block;
        }
        .pkg-card:hover .pkg-card-img { transform: scale(1.04); }
        .pkg-card-img-wrap { overflow: hidden; position: relative; }
        .pkg-avail-badge {
          position: absolute; top: 14px; right: 14px;
          font-family: 'Jost', sans-serif; font-size: 10px;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 2px;
          backdrop-filter: blur(8px);
        }
        .pkg-tier-bar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 20px;
          font-family: 'Jost', sans-serif; font-size: 10px;
          letter-spacing: 0.25em; text-transform: uppercase; color: #fff;
        }
        .pkg-body { padding: 24px 24px 28px; flex: 1; display: flex; flex-direction: column; gap: 14px; }
        .pkg-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 300; font-style: italic;
          color: #2C1810; line-height: 1.25; margin: 0;
        }
        .pkg-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px; font-weight: 300; line-height: 1;
        }
        .pkg-service-item {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Jost', sans-serif; font-size: 12px;
          color: #5A4A3A; letter-spacing: 0.04em;
        }
        .pkg-service-dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
        }
        .pkg-book-btn {
          width: 100%; font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 500; letter-spacing: 0.25em;
          text-transform: uppercase; padding: 14px;
          border: none; cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none; display: block; text-align: center;
        }
      `}</style>

      <div className="pkg-card" onClick={!isAdmin ? onClick : undefined} style={{ opacity: isBooked ? 0.72 : 1 }}>

        {/* Image */}
        <div className="pkg-card-img-wrap">
          <img src={TIER_IMAGES[pkg.tier] || TIER_IMAGES.SILVER} alt={pkg.name} className="pkg-card-img" />
          {/* Availability badge */}
          <span className="pkg-avail-badge" style={{ background: `${avail.bg}ee`, color: avail.color, border: `1px solid ${avail.color}44` }}>
            {avail.label}
          </span>
        </div>

        {/* Tier bar */}
        <div className="pkg-tier-bar" style={{ background: tier.color }}>
          <span>{tier.icon} {tier.label}</span>
          {pkg.featured && <span style={{ background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "2px", fontSize: "9px" }}>★ FEATURED</span>}
        </div>

        {/* Body */}
        <div className="pkg-body">
          {/* Theme */}
          {theme && (
            <span style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: tier.color }}>
              {theme.icon} {theme.label}
            </span>
          )}

          {/* Name */}
          <h3 className="pkg-name">{pkg.name}</h3>

          {/* Price */}
          <div>
            {pkg.discountPercent > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <span style={{ fontFamily: "Jost", fontSize: "12px", color: "#9C8B78", textDecoration: "line-through" }}>{formatLKR(pkg.price)}</span>
                <span style={{ fontFamily: "Jost", fontSize: "10px", background: "#C0392B", color: "#fff", padding: "2px 8px", letterSpacing: "0.1em" }}>{pkg.discountPercent}% OFF</span>
              </div>
            )}
            <p className="pkg-price" style={{ color: tier.color, margin: 0 }}>{formatLKR(finalPrice)}</p>
          </div>

          {/* Guests */}
          {pkg.maxGuests && (
            <p style={{ fontFamily: "Jost", fontSize: "12px", color: "#9C8B78", margin: 0, letterSpacing: "0.05em" }}>
              👥 Up to {pkg.maxGuests} guests
            </p>
          )}

          {/* Divider */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, #E8D5B8, transparent)", margin: "4px 0" }} />

          {/* Services */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {displayVendors.map((v) => (
              <div key={v} className="pkg-service-item">
                <span className="pkg-service-dot" style={{ background: tier.color }} />
                {vendorLabel(v)}
              </div>
            ))}
          </div>

          {/* Action */}
          <div style={{ marginTop: "auto", paddingTop: "16px" }}>
            {!isAdmin ? (
              isBooked ? (
                <button disabled className="pkg-book-btn" style={{ background: "#E8E0D4", color: "#9C8B78", cursor: "not-allowed" }}>Fully Booked</button>
              ) : (
                <button className="pkg-book-btn" onClick={(e) => { e.stopPropagation(); window.location.href = "/bookings"; }}
                  style={{ background: tier.color, color: "#fff" }}
                  onMouseEnter={e => { e.target.style.opacity = "0.88"; e.target.style.letterSpacing = "0.3em"; }}
                  onMouseLeave={e => { e.target.style.opacity = "1"; e.target.style.letterSpacing = "0.25em"; }}>
                  Go to Bookings
                </button>
              )
            ) : (
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={(e) => { e.stopPropagation(); onEdit(pkg); }}
                  style={{ flex: 1, fontFamily: "Jost", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "10px", background: "transparent", color: "#2C1810", border: "1px solid #D4B896", cursor: "pointer", borderRadius: "2px" }}>
                  Edit
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(pkg.id); }}
                  style={{ flex: 1, fontFamily: "Jost", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "10px", background: "#C0392B", color: "#fff", border: "none", cursor: "pointer", borderRadius: "2px" }}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
