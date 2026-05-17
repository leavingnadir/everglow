// src/pages/packages/PackagesPage.jsx — EVERGLOW LUXURY CUSTOMER VIEW
import { useState, useMemo } from "react";
import { usePackages } from "../../hooks/usePackages";
import PackageCard from "./PackageCard";
import PackageDetailModal from "./PackageDetailModal";
import { TIERS, THEMES, TIER_STYLES } from "../../services/packageService";

const PRICE_RANGES = [
  { label: "All Prices",  min: 0,       max: Infinity },
  { label: "1M – 2M",    min: 1000000,  max: 2000000 },
  { label: "2M – 3M",    min: 2000000,  max: 3000000 },
  { label: "3M+",        min: 3000000,  max: Infinity },
];

const DISPLAY_THEMES = THEMES.filter(t => t.value !== "BUDGET_SMART");

export default function PackagesPage() {
  const { packages, loading, error } = usePackages();
  const [filterTier,   setFilterTier]   = useState("ALL");
  const [filterTheme,  setFilterTheme]  = useState("ALL");
  const [filterPrice,  setFilterPrice]  = useState(0);
  const [filterAvail,  setFilterAvail]  = useState("ALL");
  const [selectedPkg,  setSelectedPkg]  = useState(null);

  const displayed = useMemo(() => {
    const range = PRICE_RANGES[filterPrice];
    return packages.filter((p) => {
      if (p.theme === "BUDGET_SMART") return false;
      const price = p.discountedPrice || p.price;
      return (
        (filterTier  === "ALL" || p.tier  === filterTier) &&
        (filterTheme === "ALL" || p.theme === filterTheme) &&
        (filterAvail === "ALL" || p.availability === filterAvail) &&
        price >= range.min && price <= range.max
      );
    });
  }, [packages, filterTier, filterTheme, filterPrice, filterAvail]);

  const grouped = TIERS.map((tier) => ({ tier, items: displayed.filter((p) => p.tier === tier) }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .pkg-page { font-family: 'Jost', sans-serif; }
        .pkg-hero-bg {
          background: linear-gradient(135deg,
            rgba(245,236,220,0.97) 0%,
            rgba(255,248,235,0.95) 40%,
            rgba(240,228,210,0.97) 100%
          );
          position: relative;
          overflow: hidden;
        }
        .pkg-hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 40%);
          pointer-events: none;
        }
        .pkg-main-bg {
          background:
            linear-gradient(180deg, rgba(250,243,230,1) 0%, rgba(255,251,242,1) 100%);
          min-height: 100vh;
        }
        .filter-pill {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 9px 20px;
          cursor: pointer;
          border: 1px solid #D4B896;
          background: transparent;
          color: #6B5A45;
          transition: all 0.25s ease;
          border-radius: 2px;
        }
        .filter-pill:hover { border-color: #C9A84C; color: #C9A84C; }
        .filter-pill.active { background: #C9A84C; color: #fff; border-color: #C9A84C; }
        .filter-pill.active-tier-silver { background: #8E9BA8; border-color: #8E9BA8; color: #fff; }
        .filter-pill.active-tier-gold   { background: #C9A84C; border-color: #C9A84C; color: #fff; }
        .filter-pill.active-tier-platinum { background: #7C8DB5; border-color: #7C8DB5; color: #fff; }
        .filter-pill.active-tier-diamond  { background: #2C2C2C; border-color: #2C2C2C; color: #fff; }
        .section-rule {
          display: flex; align-items: center; gap: 16px; margin-bottom: 32px;
        }
        .section-rule-line { flex: 1; height: 1px; background: linear-gradient(90deg, #C9A84C44, transparent); }
        .section-rule-label {
          font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 0.3em;
          text-transform: uppercase; color: #C9A84C;
        }
        .clear-btn {
          font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 0.15em;
          text-transform: uppercase; background: transparent; color: #C0392B;
          border: 1px solid #C0392B; padding: 10px 24px; cursor: pointer;
          transition: all 0.2s;
        }
        .clear-btn:hover { background: #C0392B; color: #fff; }
      `}</style>

      <div className="pkg-page pkg-main-bg">

        {/* ── Hero ── */}
        <div className="pkg-hero-bg" style={{ padding: "80px 48px 64px", borderBottom: "1px solid #E8D5B8" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {/* Decorative top line */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <span style={{ width: "48px", height: "1px", background: "#C9A84C" }} />
              <span style={{ fontFamily: "Jost", fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A84C" }}>Everglow Collection</span>
              <span style={{ width: "48px", height: "1px", background: "#C9A84C" }} />
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 300, fontStyle: "italic", color: "#2C1810", lineHeight: 1.1, margin: "0 0 16px" }}>
              Wedding Packages
            </h1>
            <p style={{ fontFamily: "Jost", fontSize: "15px", fontWeight: 300, color: "#6B5A45", letterSpacing: "0.06em", maxWidth: "480px", lineHeight: 1.8 }}>
              Bespoke celebrations crafted for every love story — from intimate gatherings to grand diamond affairs.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>

          {error && <div style={{ marginBottom: "24px", padding: "14px 20px", background: "#FDF0F0", border: "1px solid #F5C6C6", color: "#C0392B", fontFamily: "Jost", fontSize: "13px", borderRadius: "2px" }}>{error}</div>}

          {/* ── Filter Panel ── */}
          <div style={{ background: "rgba(255,252,245,0.9)", border: "1px solid #E8D5B8", padding: "32px", marginBottom: "56px", backdropFilter: "blur(8px)" }}>
            <p style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "28px" }}>Refine Your Search</p>

            {/* Tier */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9C8B78", marginBottom: "10px" }}>Tier</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["ALL", ...TIERS].map((t) => {
                  const isActive = filterTier === t;
                  const tierKey = t.toLowerCase();
                  return (
                    <button key={t} onClick={() => setFilterTier(t)}
                      className={`filter-pill ${isActive ? (t === "ALL" ? "active" : `active-tier-${tierKey}`) : ""}`}>
                      {t === "ALL" ? "All Tiers" : `${TIER_STYLES[t]?.icon || ""} ${t}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9C8B78", marginBottom: "10px" }}>Theme</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {[{ value: "ALL", label: "All Themes", icon: "✦" }, ...DISPLAY_THEMES].map((t) => (
                  <button key={t.value} onClick={() => setFilterTheme(t.value)}
                    className={`filter-pill ${filterTheme === t.value ? "active" : ""}`}>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9C8B78", marginBottom: "10px" }}>Price Range</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {PRICE_RANGES.map((r, i) => (
                  <button key={r.label} onClick={() => setFilterPrice(i)}
                    className={`filter-pill ${filterPrice === i ? "active" : ""}`}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9C8B78", marginBottom: "10px" }}>Availability</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {[
                  { value: "ALL",       label: "All" },
                  { value: "AVAILABLE", label: "✦ Available" },
                  { value: "LIMITED",   label: "◈ Limited Slots" },
                  { value: "BOOKED",    label: "✕ Fully Booked" },
                ].map((a) => (
                  <button key={a.value} onClick={() => setFilterAvail(a.value)}
                    className={`filter-pill ${filterAvail === a.value ? "active" : ""}`}>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <p style={{ fontFamily: "Jost", fontSize: "12px", color: "#9C8B78", marginTop: "8px" }}>
              Showing <strong style={{ color: "#2C1810" }}>{displayed.length}</strong> of <strong style={{ color: "#2C1810" }}>{packages.filter(p => p.theme !== "BUDGET_SMART").length}</strong> packages
            </p>
          </div>

          {loading && (
            <div style={{ textAlign: "center", padding: "100px 0", fontFamily: "Jost", color: "#9C8B78", letterSpacing: "0.15em" }}>
              Curating your packages…
            </div>
          )}

          {/* ── Tier Sections ── */}
          {!loading && grouped.map(({ tier, items }) => {
            if (items.length === 0) return null;
            const ts = TIER_STYLES[tier];
            return (
              <section key={tier} style={{ marginBottom: "72px" }}>
                <div className="section-rule">
                  <span style={{ width: "40px", height: "1px", background: ts.color, display: "block" }} />
                  <span className="section-rule-label">{ts.icon} {ts.label} — {ts.subtitle}</span>
                  <span className="section-rule-line" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px" }}>
                  {items.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} isAdmin={false} onClick={() => setSelectedPkg(pkg)} />
                  ))}
                </div>
              </section>
            );
          })}

          {!loading && displayed.length === 0 && (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontStyle: "italic", color: "#2C1810", opacity: 0.4, marginBottom: "20px" }}>No packages found</p>
              <button className="clear-btn" onClick={() => { setFilterTier("ALL"); setFilterTheme("ALL"); setFilterPrice(0); setFilterAvail("ALL"); }}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPkg && <PackageDetailModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
    </>
  );
}
