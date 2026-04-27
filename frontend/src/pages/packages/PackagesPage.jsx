import { useState } from "react";
import { usePackages } from "../../hooks/usePackages";
import PackageCard from "./PackageCard";
import PackageForm from "./PackageForm";
import { TIERS, TIER_STYLES } from "../../services/packageService";

const IS_ADMIN = true;

export default function PackagesPage() {
  const { packages, loading, error, success, addPackage, editPackage, removePackage } = usePackages();
  const [showForm, setShowForm]       = useState(false);
  const [editTarget, setEditTarget]   = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [filterTier, setFilterTier]   = useState("ALL");

  const openCreate = () => { setEditTarget(null); setShowForm(true); };
  const openEdit   = (pkg) => { setEditTarget(pkg); setShowForm(true); };

  const handleFormSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editTarget) await editPackage(editTarget.id, data);
      else await addPackage(data);
      setShowForm(false);
      setEditTarget(null);
    } catch (_) {}
    finally { setFormLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    await removePackage(id);
  };

  const displayed = filterTier === "ALL" ? packages : packages.filter((p) => p.tier === filterTier);
  const groupedByTier = TIERS.map((tier) => ({ tier, items: displayed.filter((p) => p.tier === tier) }));

  return (
    <div style={{ backgroundColor: "#F9EAE8", minHeight: "100vh" }}>

      {/* Hero banner */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #EDE0DF", padding: "60px 40px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div>
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
          {IS_ADMIN && (
            <button
              onClick={openCreate}
              style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", background: "#C0392B", color: "#fff", border: "none", padding: "14px 32px", cursor: "pointer" }}
              onMouseEnter={e => e.target.style.background = "#E74C3C"}
              onMouseLeave={e => e.target.style.background = "#C0392B"}
            >
              + Add Package
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Notifications */}
        {error && (
          <div style={{ marginBottom: "20px", padding: "14px 18px", backgroundColor: "#fdf0f0", border: "1px solid #f5c6c6", color: "#C0392B", fontSize: "14px", fontFamily: "var(--font-body)" }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ marginBottom: "20px", padding: "14px 18px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d", fontSize: "14px", fontFamily: "var(--font-body)" }}>
            {success}
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
                  fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 400,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "9px 22px", cursor: "pointer",
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
        {loading && !showForm && (
          <div style={{ textAlign: "center", padding: "80px 0", fontFamily: "var(--font-body)", color: "#2C2C2C", opacity: 0.4, letterSpacing: "0.1em" }}>
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
                <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", margin: 0 }}>
                  {style.icon} {tier.charAt(0) + tier.slice(1).toLowerCase()}
                </p>
                <span style={{ display: "block", flex: 1, height: "1px", background: "#EDE0DF" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
                {items.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} isAdmin={IS_ADMIN} onEdit={openEdit} onDelete={handleDelete} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Empty state */}
        {!loading && displayed.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>📦</p>
            <p style={{ fontFamily: "var(--font-brand)", fontSize: "24px", fontStyle: "italic", color: "#2C2C2C", opacity: 0.5 }}>No packages found</p>
            {IS_ADMIN && (
              <button
                onClick={openCreate}
                style={{ marginTop: "24px", fontFamily: "var(--font-body)", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", background: "#C0392B", color: "#fff", border: "none", padding: "14px 32px", cursor: "pointer" }}
              >
                Create First Package
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <PackageForm
          initialData={editTarget}
          loading={formLoading}
          onSubmit={handleFormSubmit}
          onCancel={() => { setShowForm(false); setEditTarget(null); }}
        />
      )}
    </div>
  );
}
