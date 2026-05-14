// src/pages/packages/AdminPackagesPage.jsx — ADMIN VIEW (luxury styled)
import { useState, useMemo } from "react";
import { usePackages } from "../../hooks/usePackages";
import PackageCard from "./PackageCard";
import PackageForm from "./PackageForm";
import { TIERS, THEMES, TIER_STYLES } from "../../services/packageService";

const DISPLAY_THEMES = THEMES.filter(t => t.value !== "BUDGET_SMART");

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
  const handleDelete = async (id) => { if (!window.confirm("Delete this package?")) return; await removePackage(id); };

  const displayed = useMemo(() => packages.filter((p) =>
    (filterTier  === "ALL" || p.tier  === filterTier) &&
    (filterTheme === "ALL" || p.theme === filterTheme) &&
    (filterAvail === "ALL" || p.availability === filterAvail) &&
    (searchText  === ""    || p.name.toLowerCase().includes(searchText.toLowerCase()))
  ), [packages, filterTier, filterTheme, filterAvail, searchText]);

  const grouped = TIERS.map((tier) => ({ tier, items: displayed.filter((p) => p.tier === tier) }));

  const stats = [
    { label: "Total",     value: packages.length,                                             icon: "📦" },
    { label: "Silver",    value: packages.filter(p => p.tier === "SILVER").length,            icon: "🥈" },
    { label: "Gold",      value: packages.filter(p => p.tier === "GOLD").length,              icon: "🥇" },
    { label: "Platinum",  value: packages.filter(p => p.tier === "PLATINUM").length,          icon: "🏆" },
    { label: "Diamond",   value: packages.filter(p => p.tier === "DIAMOND").length,           icon: "💎" },
    { label: "Available", value: packages.filter(p => p.availability === "AVAILABLE").length, icon: "✅" },
    { label: "Limited",   value: packages.filter(p => p.availability === "LIMITED").length,   icon: "⚠️" },
    { label: "Booked",    value: packages.filter(p => p.availability === "BOOKED").length,    icon: "❌" },
  ];

  const pill = (active) => ({
    fontFamily: "Jost, sans-serif", fontSize: "10px", letterSpacing: "0.18em",
    textTransform: "uppercase", padding: "7px 16px", cursor: "pointer",
    background: active ? "#2C1810" : "transparent",
    color: active ? "#fff" : "#5A4A3A",
    border: `1px solid ${active ? "#2C1810" : "#D4B896"}`,
    borderRadius: "2px", transition: "all 0.2s",
  });

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Jost:wght@300;400;500&display=swap');`}</style>
      <div style={{ background: "linear-gradient(180deg,#FAF3E6,#FFF9F0)", minHeight: "100vh", fontFamily: "Jost, sans-serif" }}>

        {/* Header */}
        <div style={{ background: "#2C1810", padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "4px" }}>Admin Panel — EverGlow</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 300, fontStyle: "italic", color: "#FFF9F0", margin: 0 }}>Package Management</h1>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <a href="/packages" style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,249,240,0.55)", textDecoration: "none", padding: "10px 20px", border: "1px solid rgba(255,249,240,0.2)", borderRadius: "2px" }}>
              ← Customer View
            </a>
            <button onClick={openCreate} style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", background: "#C9A84C", color: "#2C1810", border: "none", padding: "11px 28px", cursor: "pointer", fontWeight: 500, borderRadius: "2px" }}
              onMouseEnter={e => e.target.style.background = "#D4B862"}
              onMouseLeave={e => e.target.style.background = "#C9A84C"}>
              + Add Package
            </button>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px,1fr))", gap: "12px", marginBottom: "28px" }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: "#fff", border: "1px solid #E8D5B8", padding: "18px", borderRadius: "2px" }}>
                <p style={{ fontSize: "22px", margin: "0 0 6px" }}>{s.icon}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", fontWeight: 300, color: "#2C1810", margin: "0 0 2px" }}>{s.value}</p>
                <p style={{ fontFamily: "Jost", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9C8B78", margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {error   && <div style={{ marginBottom: "16px", padding: "12px 18px", background: "#FDF0F0", border: "1px solid #F5C6C6", color: "#C0392B", fontSize: "13px", borderRadius: "2px" }}>{error}</div>}
          {success && <div style={{ marginBottom: "16px", padding: "12px 18px", background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#15803d", fontSize: "13px", borderRadius: "2px" }}>{success}</div>}

          {/* Search */}
          <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search packages…"
            style={{ width: "100%", boxSizing: "border-box", fontFamily: "Jost", fontSize: "13px", padding: "12px 18px", border: "1px solid #D4B896", background: "#fff", outline: "none", marginBottom: "20px", color: "#2C1810", borderRadius: "2px" }} />

          {/* Filters */}
          <div style={{ background: "#fff", border: "1px solid #E8D5B8", padding: "24px", marginBottom: "32px", borderRadius: "2px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {[
              { label: "Tier",  items: ["ALL",...TIERS].map(t => ({ value: t, label: t === "ALL" ? "All" : `${TIER_STYLES[t]?.icon} ${t}` })), active: filterTier,  set: setFilterTier },
              { label: "Theme", items: [{value:"ALL",label:"All"},...DISPLAY_THEMES.map(t=>({value:t.value,label:`${t.icon} ${t.label}`}))], active: filterTheme, set: setFilterTheme },
              { label: "Avail", items: [{value:"ALL",label:"All"},{value:"AVAILABLE",label:"✅ Available"},{value:"LIMITED",label:"⚠️ Limited"},{value:"BOOKED",label:"❌ Booked"}], active: filterAvail, set: setFilterAvail },
            ].map(f => (
              <div key={f.label}>
                <p style={{ fontFamily: "Jost", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9C8B78", marginBottom: "8px" }}>{f.label}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {f.items.map(item => <button key={item.value} onClick={() => f.set(item.value)} style={pill(f.active === item.value)}>{item.label}</button>)}
                </div>
              </div>
            ))}
          </div>

          {loading && !showForm && <div style={{ textAlign: "center", padding: "60px 0", opacity: 0.4 }}>Loading…</div>}

          {!loading && grouped.map(({ tier, items }) => {
            if (items.length === 0) return null;
            const ts = TIER_STYLES[tier];
            return (
              <section key={tier} style={{ marginBottom: "48px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                  <span style={{ width: "32px", height: "2px", background: ts.color, display: "block" }} />
                  <p style={{ fontFamily: "Jost", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: ts.color, margin: 0 }}>{ts.icon} {ts.label} — {items.length} package{items.length !== 1 ? "s" : ""}</p>
                  <span style={{ flex: 1, height: "1px", background: "#E8D5B8", display: "block" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "20px" }}>
                  {items.map(pkg => <PackageCard key={pkg.id} pkg={pkg} isAdmin={true} onEdit={openEdit} onDelete={handleDelete} />)}
                </div>
              </section>
            );
          })}

          {!loading && displayed.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "28px", fontStyle: "italic", color: "#2C1810", opacity: 0.4 }}>No packages found</p>
              <button onClick={openCreate} style={{ marginTop: "20px", fontFamily: "Jost", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", background: "#C9A84C", color: "#2C1810", border: "none", padding: "12px 28px", cursor: "pointer", borderRadius: "2px" }}>Create Package</button>
            </div>
          )}
        </div>

        {showForm && <PackageForm initialData={editTarget} loading={formLoading} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditTarget(null); }} />}
      </div>
    </>
  );
}
