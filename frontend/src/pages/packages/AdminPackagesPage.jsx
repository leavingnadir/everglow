// src/pages/packages/AdminPackagesPage.jsx — ADMIN VIEW
import { useState, useMemo } from "react";
import { usePackages } from "../../hooks/usePackages";
import PackageCard from "./PackageCard";
import PackageForm from "./PackageForm";
import { TIERS, THEMES, TIER_STYLES, AVAILABILITY_STYLES } from "../../services/packageService";

export default function AdminPackagesPage() {
  const { packages, loading, error, success, addPackage, editPackage, removePackage } = usePackages();
  const [showForm, setShowForm]       = useState(false);
  const [editTarget, setEditTarget]   = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [filterTier,  setFilterTier]  = useState("ALL");
  const [filterTheme, setFilterTheme] = useState("ALL");
  const [filterAvail, setFilterAvail] = useState("ALL");
  const [searchText,  setSearchText]  = useState("");

  const openCreate = () => { setEditTarget(null); setShowForm(true); };
  const openEdit   = (pkg) => { setEditTarget(pkg); setShowForm(true); };

  const handleSubmit = async (data) => {
    setFormLoading(true);
    try { if (editTarget) await editPackage(editTarget.id, data); else await addPackage(data); setShowForm(false); setEditTarget(null); }
    catch (_) {} finally { setFormLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    await removePackage(id);
  };

  const displayed = useMemo(() => packages.filter((p) =>
    (filterTier  === "ALL" || p.tier  === filterTier) &&
    (filterTheme === "ALL" || p.theme === filterTheme) &&
    (filterAvail === "ALL" || p.availability === filterAvail) &&
    (searchText  === ""    || p.name.toLowerCase().includes(searchText.toLowerCase()))
  ), [packages, filterTier, filterTheme, filterAvail, searchText]);

  const grouped = TIERS.map((tier) => ({ tier, items: displayed.filter((p) => p.tier === tier) }));

  const stats = [
    { label: "Total",     value: packages.length,                                       icon: "📦" },
    { label: "Silver",    value: packages.filter((p) => p.tier === "SILVER").length,    icon: "🥈" },
    { label: "Gold",      value: packages.filter((p) => p.tier === "GOLD").length,      icon: "🥇" },
    { label: "Platinum",  value: packages.filter((p) => p.tier === "PLATINUM").length,  icon: "🏆" },
    { label: "Diamond",   value: packages.filter((p) => p.tier === "DIAMOND").length,   icon: "💎" },
    { label: "Available", value: packages.filter((p) => p.availability === "AVAILABLE").length, icon: "✅" },
    { label: "Limited",   value: packages.filter((p) => p.availability === "LIMITED").length,   icon: "⚠️" },
    { label: "Booked",    value: packages.filter((p) => p.availability === "BOOKED").length,    icon: "❌" },
  ];

  const btnStyle = (active) => ({ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "7px 14px", cursor: "pointer", background: active ? "#2C2C2C" : "transparent", color: active ? "#fff" : "#2C2C2C", border: `1px solid ${active ? "#2C2C2C" : "#D0B8B4"}` });

  return (
    <div style={{ backgroundColor: "#F9EAE8", minHeight: "100vh" }}>

      {/* Dark header */}
      <div style={{ backgroundColor: "#2C2C2C", padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "4px" }}>Admin Panel</p>
          <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "28px", fontWeight: 300, fontStyle: "italic", color: "#fff", margin: 0 }}>Package Management</h1>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <a href="/packages" style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", textDecoration: "none", padding: "10px 20px", border: "1px solid rgba(255,255,255,0.2)" }}>← Customer View</a>
          <button onClick={openCreate} style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", background: "#C0392B", color: "#fff", border: "none", padding: "11px 28px", cursor: "pointer" }}
            onMouseEnter={e => e.target.style.background = "#E74C3C"} onMouseLeave={e => e.target.style.background = "#C0392B"}>
            + Add Package
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ backgroundColor: "#fff", border: "1px solid #EDE0DF", padding: "16px 18px" }}>
              <p style={{ fontSize: "22px", margin: "0 0 6px" }}>{s.icon}</p>
              <p style={{ fontFamily: "var(--font-brand)", fontSize: "28px", fontWeight: 300, color: "#2C2C2C", margin: "0 0 2px" }}>{s.value}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Notifications */}
        {error   && <div style={{ marginBottom: "16px", padding: "12px 18px", backgroundColor: "#fdf0f0", border: "1px solid #f5c6c6", color: "#C0392B", fontSize: "13px" }}>{error}</div>}
        {success && <div style={{ marginBottom: "16px", padding: "12px 18px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d", fontSize: "13px" }}>{success}</div>}

        {/* Search */}
        <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="🔍  Search packages…"
          style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: "13px", padding: "11px 16px", border: "1px solid #D0B8B4", background: "#fff", outline: "none", marginBottom: "20px", color: "#2C2C2C" }} />

        {/* Filters */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "28px", padding: "18px", background: "#fff", border: "1px solid #EDE0DF" }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "6px" }}>Tier</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["ALL", ...TIERS].map((t) => <button key={t} onClick={() => setFilterTier(t)} style={btnStyle(filterTier === t)}>{t === "ALL" ? "All" : `${TIER_STYLES[t].icon} ${t}`}</button>)}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "6px" }}>Theme</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {[{ value: "ALL", label: "All", icon: "✨" }, ...THEMES].map((t) => <button key={t.value} onClick={() => setFilterTheme(t.value)} style={btnStyle(filterTheme === t.value)}>{t.icon} {t.label}</button>)}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "6px" }}>Availability</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {[{ value: "ALL", label: "All" }, { value: "AVAILABLE", label: "✅ Available" }, { value: "LIMITED", label: "⚠️ Limited" }, { value: "BOOKED", label: "❌ Booked" }]
                .map((a) => <button key={a.value} onClick={() => setFilterAvail(a.value)} style={btnStyle(filterAvail === a.value)}>{a.label}</button>)}
            </div>
          </div>
        </div>

        {loading && !showForm && <div style={{ textAlign: "center", padding: "60px 0", opacity: 0.4, fontFamily: "var(--font-body)" }}>Loading…</div>}

        {/* Package groups */}
        {!loading && grouped.map(({ tier, items }) => {
          if (items.length === 0) return null;
          const ts = TIER_STYLES[tier];
          return (
            <section key={tier} style={{ marginBottom: "48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
                <span style={{ display: "block", width: "32px", height: "2px", background: ts.color }} />
                <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: ts.color, margin: 0 }}>
                  {ts.icon} {ts.label} — {items.length} package{items.length !== 1 ? "s" : ""}
                </p>
                <span style={{ flex: 1, height: "1px", background: "#EDE0DF", display: "block" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                {items.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} isAdmin={true} onEdit={openEdit} onDelete={handleDelete} />)}
              </div>
            </section>
          );
        })}

        {!loading && displayed.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: "40px" }}>📦</p>
            <p style={{ fontFamily: "var(--font-brand)", fontSize: "22px", fontStyle: "italic", color: "#2C2C2C", opacity: 0.45 }}>No packages found</p>
            <button onClick={openCreate} style={{ marginTop: "20px", fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", background: "#C0392B", color: "#fff", border: "none", padding: "12px 28px", cursor: "pointer" }}>Create First Package</button>
          </div>
        )}
      </div>

      {showForm && <PackageForm initialData={editTarget} loading={formLoading} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditTarget(null); }} />}
    </div>
  );
}
