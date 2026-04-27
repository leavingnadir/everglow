// src/pages/packages/PackagesPage.jsx
// CUSTOMER VIEW — read only, no edit/delete buttons

import { useState } from "react";
import { usePackages } from "../../hooks/usePackages";
import PackageCard from "./PackageCard";
import { TIERS, TIER_STYLES } from "../../services/packageService";

export default function PackagesPage() {
  const { packages, loading, error } = usePackages();
  const [filterTier, setFilterTier] = useState("ALL");

  const displayed = filterTier === "ALL" ? packages : packages.filter((p) => p.tier === filterTier);
  const groupedByTier = TIERS.map((tier) => ({ tier, items: displayed.filter((p) => p.tier === tier) }));

  return (
    <div style={{ backgroundColor: "#F9EAE8", minHeight: "100vh" }}>

      {/* Hero banner */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #EDE0DF", padding: "60px 40px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "10px" }}>
            Everglow Collection
          </p>
          <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 300, fontStyle: "italic", color: "#2C2C2C", lineHeight: 1.2, margin: 0 }}>
            Event Packages
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#2C2C2C", opacity: 0.55, marginTop: "10px", letterSpacing: "0.04em" }}>
            Curated experiences for your perfect celebration
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Error */}
        {error && (
          <div style={{ marginBottom: "20px", padding: "14px 18px", backgroundColor: "#fdf0f0", border: "1px solid #f5c6c6", color: "#C0392B", fontSize: "14px", fontFamily: "var(--font-body)" }}>
            {error}
          </div>
        )}

        {/* Tier filter tabs */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "40px", flexWrap: "wrap" }}>
          {["ALL", ...TIERS].map((t) => {
            const active = filterTier === t;
            return (
              <button
                key={t}
                onClick={() => setFilterTier(t)}
                style={{
                  fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.2em",
                  textTransform: "uppercase", padding: "9px 22px", cursor: "pointer",
                  background: active ? "#C0392B" : "transparent",
                  color: active ? "#fff" : "#2C2C2C",
                  border: active ? "1px solid #C0392B" : "1px solid #D0B8B4",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "#C0392B"; e.currentTarget.style.color = "#C0392B"; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "#D0B8B4"; e.currentTarget.style.color = "#2C2C2C"; }}}
              >
                {t === "ALL" ? "All" : `${TIER_STYLES[t].icon} ${t}`}
              </button>
            );
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0", fontFamily: "var(--font-body)", color: "#2C2C2C", opacity: 0.4 }}>
            Loading packages…
          </div>
        )}

        {/* Tier sections */}
        {!loading && groupedByTier.map(({ tier, items }) => {
          if (items.length === 0) return null;
          const style = TIER_STYLES[tier];
          return (
            <section key={tier} style={{ marginBottom: "56px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
                <span style={{ display: "block", width: "32px", height: "1px", background: "#C9A84C" }} />
                <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", margin: 0 }}>
                  {style.icon} {tier.charAt(0) + tier.slice(1).toLowerCase()}
                </p>
                <span style={{ display: "block", flex: 1, height: "1px", background: "#EDE0DF" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
                {items.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} isAdmin={false} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Empty */}
        {!loading && displayed.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>📦</p>
            <p style={{ fontFamily: "var(--font-brand)", fontSize: "24px", fontStyle: "italic", color: "#2C2C2C", opacity: 0.5 }}>No packages available</p>
          </div>
        )}
      </div>
    </div>
  );
}
