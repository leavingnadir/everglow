// src/pages/packages/PackagesPage.jsx — CUSTOMER VIEW
import { useState, useMemo } from "react";
import { usePackages } from "../../hooks/usePackages";
import PackageCard from "./PackageCard";
import { TIERS, THEMES, TIER_STYLES, formatLKR } from "../../services/packageService";

const PRICE_RANGES = [
  { label: "All Prices",         min: 0,       max: Infinity },
  { label: "Under 500K",         min: 0,       max: 500000 },
  { label: "500K – 1M",          min: 500000,  max: 1000000 },
  { label: "1M – 2M",            min: 1000000, max: 2000000 },
  { label: "Above 2M",           min: 2000000, max: Infinity },
];

export default function PackagesPage() {
  const { packages, loading, error } = usePackages();
  const [filterTier,   setFilterTier]   = useState("ALL");
  const [filterTheme,  setFilterTheme]  = useState("ALL");
  const [filterPrice,  setFilterPrice]  = useState(0); // index into PRICE_RANGES
  const [filterAvail,  setFilterAvail]  = useState("ALL");
  const [searchText,   setSearchText]   = useState("");

  const displayed = useMemo(() => {
    const range = PRICE_RANGES[filterPrice];
    return packages.filter((p) => {
      const price = p.discountedPrice || p.price;
      return (
        (filterTier  === "ALL" || p.tier  === filterTier) &&
        (filterTheme === "ALL" || p.theme === filterTheme) &&
        (filterAvail === "ALL" || p.availability === filterAvail) &&
        price >= range.min && price <= range.max &&
        (searchText === "" || p.name.toLowerCase().includes(searchText.toLowerCase()))
      );
    });
  }, [packages, filterTier, filterTheme, filterPrice, filterAvail, searchText]);

  const grouped = TIERS.map((tier) => ({ tier, items: displayed.filter((p) => p.tier === tier) }));

  const btnStyle = (active, color = "#C0392B") => ({
    fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.15em",
    textTransform: "uppercase", padding: "8px 16px", cursor: "pointer",
    background: active ? color : "transparent",
    color: active ? "#fff" : "#2C2C2C",
    border: `1px solid ${active ? color : "#D0B8B4"}`,
    transition: "all 0.15s",
  });

  return (
    <div style={{ backgroundColor: "#F9EAE8", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #EDE0DF", padding: "60px 40px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "10px" }}>Everglow Collection</p>
          <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 300, fontStyle: "italic", color: "#2C2C2C", margin: "0 0 10px" }}>Wedding Packages</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#2C2C2C", opacity: 0.55 }}>From intimate celebrations to diamond luxury — find your perfect package</p>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>

        {error && <div style={{ marginBottom: "20px", padding: "14px 18px", backgroundColor: "#fdf0f0", border: "1px solid #f5c6c6", color: "#C0392B", fontSize: "14px" }}>{error}</div>}

        {/* 🔥 Search bar */}
        <div style={{ marginBottom: "24px" }}>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="🔍  Search packages by name…"
            style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: "14px", padding: "12px 18px", border: "1px solid #D0B8B4", background: "#fff", outline: "none", color: "#2C2C2C" }}
          />
        </div>

        {/* Filters row */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px", padding: "20px", background: "#fff", border: "1px solid #EDE0DF" }}>

          {/* Tier */}
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "8px" }}>Tier</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["ALL", ...TIERS].map((t) => {
                const s = t !== "ALL" ? TIER_STYLES[t] : null;
                return <button key={t} onClick={() => setFilterTier(t)} style={btnStyle(filterTier === t, s?.color)}>{t === "ALL" ? "All Tiers" : `${s.icon} ${t}`}</button>;
              })}
            </div>
          </div>

          {/* Theme */}
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "8px" }}>Theme</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[{ value: "ALL", label: "All Themes", icon: "✨" }, ...THEMES].map((t) => (
                <button key={t.value} onClick={() => setFilterTheme(t.value)} style={btnStyle(filterTheme === t.value)}>{t.icon} {t.label}</button>
              ))}
            </div>
          </div>

          {/* 🔥 Price range */}
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "8px" }}>Price Range</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {PRICE_RANGES.map((r, i) => (
                <button key={r.label} onClick={() => setFilterPrice(i)} style={btnStyle(filterPrice === i, "#C9A84C")}>{r.label}</button>
              ))}
            </div>
          </div>

          {/* 🔥 Availability */}
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "8px" }}>Availability</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { value: "ALL",       label: "All",           color: "#2C2C2C" },
                { value: "AVAILABLE", label: "✅ Available",   color: "#15803d" },
                { value: "LIMITED",   label: "⚠️ Limited",    color: "#b45309" },
                { value: "BOOKED",    label: "❌ Fully Booked",color: "#991b1b" },
              ].map((a) => (
                <button key={a.value} onClick={() => setFilterAvail(a.value)} style={btnStyle(filterAvail === a.value, a.color)}>{a.label}</button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#9CA3AF", margin: 0 }}>
            Showing {displayed.length} of {packages.length} packages
          </p>
        </div>

        {loading && <div style={{ textAlign: "center", padding: "80px 0", fontFamily: "var(--font-body)", opacity: 0.4 }}>Loading packages…</div>}

        {/* Tier sections */}
        {!loading && grouped.map(({ tier, items }) => {
          if (items.length === 0) return null;
          const ts = TIER_STYLES[tier];
          return (
            <section key={tier} style={{ marginBottom: "56px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
                <span style={{ display: "block", width: "32px", height: "2px", background: ts.color }} />
                <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: ts.color, margin: 0 }}>
                  {ts.icon} {ts.label} — {ts.subtitle}
                </p>
                <span style={{ flex: 1, height: "1px", background: "#EDE0DF", display: "block" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
                {items.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} isAdmin={false} />)}
              </div>
            </section>
          );
        })}

        {!loading && displayed.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: "48px" }}>📦</p>
            <p style={{ fontFamily: "var(--font-brand)", fontSize: "24px", fontStyle: "italic", color: "#2C2C2C", opacity: 0.5 }}>No packages match your filters</p>
            <button onClick={() => { setFilterTier("ALL"); setFilterTheme("ALL"); setFilterPrice(0); setFilterAvail("ALL"); setSearchText(""); }}
              style={{ marginTop: "16px", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", background: "transparent", color: "#C0392B", border: "1px solid #C0392B", padding: "10px 24px", cursor: "pointer" }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
