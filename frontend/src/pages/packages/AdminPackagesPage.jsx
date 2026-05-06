// src/pages/packages/AdminPackagesPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePackages } from "../../hooks/usePackages";
import PackageCard from "./PackageCard";
import PackageForm from "./PackageForm";
import { TIERS, TIER_STYLES } from "../../services/packageService";

export default function AdminPackagesPage() {
  const navigate = useNavigate();

  const {
    packages,
    loading,
    error,
    success,
    addPackage,
    editPackage,
    removePackage,
  } = usePackages();

  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [filterTier, setFilterTier] = useState("ALL");

  const openCreate = () => {
    setEditTarget(null);
    setShowForm(true);
  };

  const openEdit = (pkg) => {
    setEditTarget(pkg);
    setShowForm(true);
  };

  const handleFormSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editTarget) {
        await editPackage(editTarget.id, data);
      } else {
        await addPackage(data);
      }
      setShowForm(false);
      setEditTarget(null);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    await removePackage(id);
  };

  const displayed =
    filterTier === "ALL"
      ? packages
      : packages.filter((p) => p.tier === filterTier);

  const groupedByTier = TIERS.map((tier) => ({
    tier,
    items: displayed.filter((p) => p.tier === tier),
  }));

  const statCards = [
    { label: "Total Packages", value: packages.length, icon: "📦" },
    { label: "Gold", value: packages.filter((p) => p.tier === "GOLD").length, icon: "🥇" },
    { label: "Platinum", value: packages.filter((p) => p.tier === "PLATINUM").length, icon: "🏆" },
    { label: "Silver", value: packages.filter((p) => p.tier === "SILVER").length, icon: "🥈" },
    { label: "Diamond", value: packages.filter((p) => p.tier === "DIAMOND").length, icon: "💎" },
  ];

  return (
    <div style={{ backgroundColor: "#F9EAE8", minHeight: "100vh" }}>
      {/* HEADER */}
      <div
        style={{
          backgroundColor: "#2C2C2C",
          padding: "24px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: "#C9A84C",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Admin Panel
          </p>
          <h1 style={{ color: "#fff", fontSize: 28, margin: 0 }}>
            Package Management
          </h1>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => navigate("/admin")}
            style={{
              color: "#C9A84C",
              border: "1px solid rgba(201,168,76,0.5)",
              padding: "10px 20px",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            ← Admin Panel
          </button>

          <a
            href="/packages"
            style={{
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "10px 20px",
              textDecoration: "none",
            }}
          >
            ← Customer View
          </a>

          <button
            onClick={openCreate}
            style={{
              background: "#C0392B",
              color: "#fff",
              border: "none",
              padding: "11px 24px",
              cursor: "pointer",
            }}
          >
            + Add Package
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 30,
          }}
        >
          {statCards.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                border: "1px solid #EDE0DF",
                padding: 20,
              }}
            >
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <h2 style={{ margin: "8px 0" }}>{s.value}</h2>
              <p style={{ fontSize: 12, opacity: 0.6 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* FILTER */}
        <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
          {["ALL", ...TIERS].map((t) => (
            <button
              key={t}
              onClick={() => setFilterTier(t)}
              style={{
                padding: "8px 18px",
                border: "1px solid #ccc",
                background: filterTier === t ? "#2C2C2C" : "transparent",
                color: filterTier === t ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {groupedByTier.map(({ tier, items }) =>
          items.length === 0 ? null : (
            <div key={tier} style={{ marginBottom: 40 }}>
              <h3 style={{ marginBottom: 10 }}>
                {TIER_STYLES[tier]?.icon} {tier}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 20,
                }}
              >
                {items.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    isAdmin
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )
        )}

        {/* EMPTY */}
        {!loading && displayed.length === 0 && (
          <div style={{ textAlign: "center", padding: 80 }}>
            <h2>No packages found</h2>
            <button
              onClick={openCreate}
              style={{
                marginTop: 20,
                background: "#C0392B",
                color: "#fff",
                padding: "12px 24px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Create Package
            </button>
          </div>
        )}
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <PackageForm
          initialData={editTarget}
          loading={formLoading}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditTarget(null);
          }}
        />
      )}
    </div>
  );
}