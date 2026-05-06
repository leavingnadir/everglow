// src/pages/packages/AdminPackagesPage.jsx
<<<<<<< HEAD
// ADMIN VIEW — full CRUD, edit/delete buttons visible

import { useState } from "react";
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
import { usePackages } from "../../hooks/usePackages";
import PackageCard from "./PackageCard";
import PackageForm from "./PackageForm";
import { TIERS, TIER_STYLES } from "../../services/packageService";

export default function AdminPackagesPage() {
<<<<<<< HEAD
  const { packages, loading, error, success, addPackage, editPackage, removePackage } = usePackages();
=======
  const navigate = useNavigate();
  const { packages, loading, error, success, addPackage, editPackage, removePackage } = usePackages();

>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
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

<<<<<<< HEAD
  const displayed = filterTier === "ALL" ? packages : packages.filter((p) => p.tier === filterTier);
  const groupedByTier = TIERS.map((tier) => ({ tier, items: displayed.filter((p) => p.tier === tier) }));

  const statCards = [
    { label: "Total Packages", value: packages.length, icon: "📦" },
    { label: "Gold",     value: packages.filter(p => p.tier === "GOLD").length,     icon: "🥇" },
    { label: "Platinum", value: packages.filter(p => p.tier === "PLATINUM").length, icon: "🏆" },
    { label: "Silver",   value: packages.filter(p => p.tier === "SILVER").length,   icon: "🥈" },
=======
  const displayed      = filterTier === "ALL" ? packages : packages.filter((p) => p.tier === filterTier);
  const groupedByTier  = TIERS.map((tier) => ({ tier, items: displayed.filter((p) => p.tier === tier) }));

  const statCards = [
    { label: "Total Packages", value: packages.length,                                icon: "📦" },
    { label: "Gold",           value: packages.filter(p => p.tier === "GOLD").length,     icon: "🥇" },
    { label: "Platinum",       value: packages.filter(p => p.tier === "PLATINUM").length, icon: "🏆" },
    { label: "Silver",         value: packages.filter(p => p.tier === "SILVER").length,   icon: "🥈" },
    { label: "Diamond",        value: packages.filter(p => p.tier === "DIAMOND").length,  icon: "💎" },
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
  ];

  return (
    <div style={{ backgroundColor: "#F9EAE8", minHeight: "100vh" }}>

<<<<<<< HEAD
      {/* Admin header */}
      <div style={{ backgroundColor: "#2C2C2C", padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "4px" }}>
            Admin Panel
          </p>
          <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "28px", fontWeight: 300, fontStyle: "italic", color: "#fff", margin: 0 }}>
            Package Management
          </h1>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <a
            href="/packages"
            style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "10px 20px", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            ← Customer View
          </a>
          <button
            onClick={openCreate}
            style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", background: "#C0392B", color: "#fff", border: "none", padding: "11px 24px", cursor: "pointer" }}
            onMouseEnter={e => e.target.style.background = "#E74C3C"}
            onMouseLeave={e => e.target.style.background = "#C0392B"}
=======
      {/* ── Admin header ── */}
      <div style={{
        backgroundColor: "#2C2C2C", padding: "24px 40px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
      }}>
        <div>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "10px",
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#C9A84C", marginBottom: "4px",
          }}>
            Admin Panel
          </p>
          <h1 style={{
            fontFamily: "var(--font-brand)", fontSize: "28px",
            fontWeight: 300, fontStyle: "italic", color: "#fff", margin: 0,
          }}>
            Package Management
          </h1>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>

          {/* ✅ Back to Admin Panel */}
          <button
            onClick={() => navigate("/admin")}
            style={{
              fontFamily: "var(--font-body)", fontSize: "11px",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#C9A84C", background: "none", cursor: "pointer",
              padding: "10px 20px",
              border: "1px solid rgba(201,168,76,0.5)",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#C9A84C"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"}
          >
            ← Admin Panel
          </button>

          <a
            href="/packages"
            style={{
              fontFamily: "var(--font-body)", fontSize: "11px",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)", textDecoration: "none",
              padding: "10px 20px", border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            ← Customer View
          </a>

          <button
            onClick={openCreate}
            style={{
              fontFamily: "var(--font-body)", fontSize: "11px",
              letterSpacing: "0.18em", textTransform: "uppercase",
              background: "#C0392B", color: "#fff", border: "none",
              padding: "11px 24px", cursor: "pointer",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#E74C3C"}
            onMouseLeave={e => e.currentTarget.style.background = "#C0392B"}
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
          >
            + Add Package
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Stat cards */}
<<<<<<< HEAD
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "36px" }}>
          {statCards.map((s) => (
            <div key={s.label} style={{ backgroundColor: "#fff", border: "1px solid #EDE0DF", padding: "20px 24px" }}>
              <p style={{ fontSize: "28px", margin: "0 0 8px" }}>{s.icon}</p>
              <p style={{ fontFamily: "var(--font-brand)", fontSize: "32px", fontWeight: 300, color: "#2C2C2C", margin: "0 0 4px" }}>{s.value}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#2C2C2C", opacity: 0.5, margin: 0 }}>{s.label}</p>
=======
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px", marginBottom: "36px",
        }}>
          {statCards.map((s) => (
            <div key={s.label} style={{
              backgroundColor: "#fff", border: "1px solid #EDE0DF",
              padding: "20px 24px",
            }}>
              <p style={{ fontSize: "28px", margin: "0 0 8px" }}>{s.icon}</p>
              <p style={{
                fontFamily: "var(--font-brand)", fontSize: "32px",
                fontWeight: 300, color: "#2C2C2C", margin: "0 0 4px",
              }}>
                {s.value}
              </p>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "11px",
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "#2C2C2C", opacity: 0.5, margin: 0,
              }}>
                {s.label}
              </p>
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
            </div>
          ))}
        </div>

        {/* Notifications */}
        {error && (
<<<<<<< HEAD
          <div style={{ marginBottom: "20px", padding: "14px 18px", backgroundColor: "#fdf0f0", border: "1px solid #f5c6c6", color: "#C0392B", fontSize: "14px", fontFamily: "var(--font-body)" }}>
=======
          <div style={{
            marginBottom: "20px", padding: "14px 18px",
            backgroundColor: "#fdf0f0", border: "1px solid #f5c6c6",
            color: "#C0392B", fontSize: "14px", fontFamily: "var(--font-body)",
          }}>
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
            {error}
          </div>
        )}
        {success && (
<<<<<<< HEAD
          <div style={{ marginBottom: "20px", padding: "14px 18px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d", fontSize: "14px", fontFamily: "var(--font-body)" }}>
=======
          <div style={{
            marginBottom: "20px", padding: "14px 18px",
            backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0",
            color: "#15803d", fontSize: "14px", fontFamily: "var(--font-body)",
          }}>
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
            {success}
          </div>
        )}

        {/* Tier filter */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
          {["ALL", ...TIERS].map((t) => {
            const active = filterTier === t;
            return (
              <button
                key={t}
                onClick={() => setFilterTier(t)}
                style={{
<<<<<<< HEAD
                  fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.2em",
                  textTransform: "uppercase", padding: "9px 22px", cursor: "pointer",
=======
                  fontFamily: "var(--font-body)", fontSize: "11px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "9px 22px", cursor: "pointer",
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
                  background: active ? "#2C2C2C" : "transparent",
                  color: active ? "#fff" : "#2C2C2C",
                  border: active ? "1px solid #2C2C2C" : "1px solid #D0B8B4",
                  transition: "all 0.15s",
                }}
              >
                {t === "ALL" ? "All" : `${TIER_STYLES[t].icon} ${t}`}
              </button>
            );
          })}
        </div>

        {/* Loading */}
        {loading && !showForm && (
<<<<<<< HEAD
          <div style={{ textAlign: "center", padding: "80px 0", fontFamily: "var(--font-body)", color: "#2C2C2C", opacity: 0.4 }}>
=======
          <div style={{
            textAlign: "center", padding: "80px 0",
            fontFamily: "var(--font-body)", color: "#2C2C2C", opacity: 0.4,
          }}>
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
            Loading packages…
          </div>
        )}

        {/* Tier sections */}
        {!loading && groupedByTier.map(({ tier, items }) => {
          if (items.length === 0) return null;
          const style = TIER_STYLES[tier];
          return (
            <section key={tier} style={{ marginBottom: "48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                <span style={{ display: "block", width: "32px", height: "1px", background: "#C9A84C" }} />
<<<<<<< HEAD
                <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", margin: 0 }}>
=======
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "11px",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  color: "#C9A84C", margin: 0,
                }}>
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
                  {style.icon} {tier.charAt(0) + tier.slice(1).toLowerCase()} — {items.length} package{items.length !== 1 ? "s" : ""}
                </p>
                <span style={{ display: "block", flex: 1, height: "1px", background: "#EDE0DF" }} />
              </div>
<<<<<<< HEAD
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                {items.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} isAdmin={true} onEdit={openEdit} onDelete={handleDelete} />
=======
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}>
                {items.map((pkg) => (
                  <PackageCard
                    key={pkg.id} pkg={pkg}
                    isAdmin={true} onEdit={openEdit} onDelete={handleDelete}
                  />
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
                ))}
              </div>
            </section>
          );
        })}

<<<<<<< HEAD
        {/* Empty */}
        {!loading && displayed.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>📦</p>
            <p style={{ fontFamily: "var(--font-brand)", fontSize: "24px", fontStyle: "italic", color: "#2C2C2C", opacity: 0.5 }}>No packages yet</p>
            <button
              onClick={openCreate}
              style={{ marginTop: "24px", fontFamily: "var(--font-body)", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", background: "#C0392B", color: "#fff", border: "none", padding: "14px 32px", cursor: "pointer" }}
=======
        {/* Empty state */}
        {!loading && displayed.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>📦</p>
            <p style={{
              fontFamily: "var(--font-brand)", fontSize: "24px",
              fontStyle: "italic", color: "#2C2C2C", opacity: 0.5,
            }}>
              No packages yet
            </p>
            <button
              onClick={openCreate}
              style={{
                marginTop: "24px", fontFamily: "var(--font-body)",
                fontSize: "12px", letterSpacing: "0.18em",
                textTransform: "uppercase", background: "#C0392B",
                color: "#fff", border: "none", padding: "14px 32px", cursor: "pointer",
              }}
>>>>>>> f5b2fbfde505d405c49893dff97eeff236feb6a9
            >
              Create First Package
            </button>
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
