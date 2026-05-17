// src/pages/packages/PackageDetailModal.jsx
// Full package detail page shown when a card is clicked
import { TIER_STYLES, THEMES, VENDOR_CATEGORIES, AVAILABILITY_STYLES, formatLKR } from "../../services/packageService";

const TIER_IMAGES = {
  SILVER:   "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=85",
  GOLD:     "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1400&q=85",
  PLATINUM: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1400&q=85",
  DIAMOND:  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1400&q=85",
};

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=600&q=80",
  "https://images.unsplash.com/photo-1528958782920-5c17b7e0afa9?w=600&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
  "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=600&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
  "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=600&q=80",
];

const SERVICE_ICONS = {
  DJ: "🎵", LIVE_BAND: "🎸", TRADITIONAL_DANCERS: "💃", FIREWORKS: "🎆",
  FLORAL_DESIGN: "🌸", THEME_COLORS: "🎨", STAGE_DESIGN: "✨",
  PHOTOGRAPHY: "📸", VIDEOGRAPHY: "🎬", DRONE_SHOOT: "🚁",
  BUFFET_CATERING: "🍽️", SET_MENU_CATERING: "🍽️", DESSERT_TABLE: "🍰",
  HOTEL_VENUE: "🏨", GARDEN_VENUE: "🌿", BEACH_VENUE: "🌊",
  MAKEUP_ARTIST: "💄", BRIDAL_DRESSING: "👗", GROOM_DRESSING: "🤵",
  WEDDING_CAR: "🚗", GUEST_TRANSPORT: "🚌",
  WEDDING_WEBSITE: "💻", DIGITAL_INVITATION: "📨", GUEST_MANAGEMENT: "📋",
};

const SERVICE_GROUPS = {
  "🎵 Entertainment":  ["DJ","LIVE_BAND","TRADITIONAL_DANCERS","FIREWORKS"],
  "🌸 Decoration":     ["FLORAL_DESIGN","THEME_COLORS","STAGE_DESIGN"],
  "📸 Media":          ["PHOTOGRAPHY","VIDEOGRAPHY","DRONE_SHOOT"],
  "🍽️ Catering":      ["BUFFET_CATERING","SET_MENU_CATERING","DESSERT_TABLE"],
  "👗 Bridal":         ["MAKEUP_ARTIST","BRIDAL_DRESSING","GROOM_DRESSING"],
  "🚗 Transport":      ["WEDDING_CAR","GUEST_TRANSPORT"],
  "🎁 Extras":         ["WEDDING_WEBSITE","DIGITAL_INVITATION","GUEST_MANAGEMENT"],
};

export default function PackageDetailModal({ pkg, onClose }) {
  const tier  = TIER_STYLES[pkg.tier]  || TIER_STYLES.SILVER;
  const theme = THEMES.find((t) => t.value === pkg.theme);
  const avail = AVAILABILITY_STYLES[pkg.availability] || AVAILABILITY_STYLES.AVAILABLE;
  const isBooked   = pkg.availability === "BOOKED";
  const finalPrice = (pkg.discountedPrice && pkg.discountPercent > 0) ? pkg.discountedPrice : pkg.price;

  const vendorLabel = (v) => VENDOR_CATEGORIES.find(x => x.value === v)?.label || v.replace(/_/g, " ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        .modal-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(20,12,8,0.75);
          display: flex; align-items: flex-start; justify-content: center;
          padding: 24px; overflow-y: auto;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .modal-box {
          background: #FFFDF7;
          width: 100%; max-width: 860px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(20,12,8,0.3);
          animation: slideUp 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .modal-hero { position: relative; height: 380px; overflow: hidden; }
        .modal-hero img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .modal-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(20,12,8,0.65) 100%);
        }
        .modal-hero-content {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 32px;
        }
        .modal-close {
          position: absolute; top: 20px; right: 20px;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.3); color: #fff;
          font-size: 18px; cursor: pointer; display: flex;
          align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .modal-close:hover { background: rgba(255,255,255,0.25); }
        .modal-body { padding: 40px; }
        .modal-section-title {
          font-family: 'Jost', sans-serif; font-size: 10px;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #C9A84C; margin: 0 0 18px;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px; margin-bottom: 40px;
        }
        .gallery-img {
          width: 100%; aspect-ratio: 4/3;
          object-fit: cover; border-radius: 2px;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .gallery-img:hover { transform: scale(1.02); }
        .service-group { margin-bottom: 20px; }
        .service-group-title {
          font-family: 'Jost', sans-serif; font-size: 10px;
          letter-spacing: 0.15em; color: #9C8B78; margin-bottom: 10px;
        }
        .service-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .service-chip {
          font-family: 'Jost', sans-serif; font-size: 11px;
          padding: 5px 14px; border: 1px solid #E8D5B8;
          color: #5A4A3A; border-radius: 2px; letter-spacing: 0.04em;
          display: flex; align-items: center; gap: 6px;
        }
        .book-now-btn {
          display: block; width: 100%; font-family: 'Jost', sans-serif;
          font-size: 12px; font-weight: 500; letter-spacing: 0.3em;
          text-transform: uppercase; padding: 18px;
          border: none; cursor: pointer; text-align: center;
          text-decoration: none; border-radius: 2px;
          transition: all 0.3s ease;
        }
      `}</style>

      <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="modal-box">

          {/* Hero Image */}
          <div className="modal-hero">
            <img src={TIER_IMAGES[pkg.tier] || TIER_IMAGES.SILVER} alt={pkg.name} />
            <div className="modal-hero-overlay" />
            <button className="modal-close" onClick={onClose}>✕</button>
            <div className="modal-hero-content">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <span style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", background: `${tier.color}99`, padding: "3px 12px", borderRadius: "2px" }}>
                  {tier.icon} {tier.label}
                </span>
                {theme && <span style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>{theme.icon} {theme.label}</span>}
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, fontStyle: "italic", color: "#fff", margin: "0 0 8px", lineHeight: 1.2 }}>
                {pkg.name}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="modal-body">

            {/* Price + Availability row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                {pkg.discountPercent > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <span style={{ fontFamily: "Jost", fontSize: "13px", color: "#9C8B78", textDecoration: "line-through" }}>{formatLKR(pkg.price)}</span>
                    <span style={{ fontFamily: "Jost", fontSize: "10px", background: "#C0392B", color: "#fff", padding: "2px 10px", letterSpacing: "0.1em" }}>{pkg.discountPercent}% OFF</span>
                  </div>
                )}
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 300, color: tier.color, margin: 0, lineHeight: 1 }}>{formatLKR(finalPrice)}</p>
                {pkg.maxGuests && <p style={{ fontFamily: "Jost", fontSize: "12px", color: "#9C8B78", margin: "6px 0 0", letterSpacing: "0.05em" }}>👥 Up to {pkg.maxGuests} guests</p>}
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontFamily: "Jost", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: avail.color, background: avail.bg, padding: "6px 14px", border: `1px solid ${avail.color}44`, display: "inline-block" }}>
                  {avail.label}
                </span>
              </div>
            </div>

            {/* Description */}
            {pkg.description && (
              <div style={{ marginBottom: "36px" }}>
                <p className="modal-section-title">About This Package</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: 400, color: "#3A2A20", lineHeight: 1.85, margin: 0 }}>{pkg.description}</p>
              </div>
            )}

            {/* Divider */}
            <div style={{ height: "1px", background: "linear-gradient(90deg, #C9A84C, #E8D5B8, transparent)", marginBottom: "36px" }} />

            {/* Included Services */}
            {pkg.includedVendors && pkg.includedVendors.length > 0 && (
              <div style={{ marginBottom: "36px" }}>
                <p className="modal-section-title">Included Services</p>
                {Object.entries(SERVICE_GROUPS).map(([grpLabel, grpKeys]) => {
                  const included = pkg.includedVendors.filter(v => grpKeys.includes(v));
                  if (included.length === 0) return null;
                  return (
                    <div key={grpLabel} className="service-group">
                      <p className="service-group-title">{grpLabel}</p>
                      <div className="service-chips">
                        {included.map(v => (
                          <span key={v} className="service-chip">
                            <span>{SERVICE_ICONS[v] || "✦"}</span>
                            {vendorLabel(v)}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Gallery */}
            <div style={{ marginBottom: "36px" }}>
              <p className="modal-section-title">Gallery Preview</p>
              <div className="gallery-grid">
                {GALLERY_IMAGES.map((src, i) => (
                  <img key={i} src={src} alt={`Gallery ${i + 1}`} className="gallery-img" />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "linear-gradient(90deg, #C9A84C, #E8D5B8, transparent)", marginBottom: "32px" }} />

            {/* CTA */}
            {isBooked ? (
              <button disabled className="book-now-btn" style={{ background: "#E8E0D4", color: "#9C8B78", cursor: "not-allowed" }}>
                Fully Booked
              </button>
            ) : (
              <a href={pkg.bookingUrl || "/bookings"} className="book-now-btn"
                style={{ background: tier.color, color: "#fff" }}
                onMouseEnter={e => { e.target.style.opacity = "0.88"; e.target.style.letterSpacing = "0.38em"; }}
                onMouseLeave={e => { e.target.style.opacity = "1"; e.target.style.letterSpacing = "0.3em"; }}>
                Go to Bookings
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
