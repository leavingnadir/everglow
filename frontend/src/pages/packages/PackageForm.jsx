// src/pages/packages/PackageForm.jsx
import { useState, useEffect } from "react";
import { TIERS, THEMES, VENDOR_CATEGORIES } from "../../services/packageService";

const EMPTY = { name: "", tier: "GOLD", theme: "MODERN_LUXURY", description: "", price: "", discountPercent: 0, maxGuests: "", availability: "AVAILABLE", bookingUrl: "", includedVendors: [], active: true, featured: false };

const inputStyle = (err) => ({ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-body)", fontSize: "13px", color: "#2C2C2C", border: `1px solid ${err ? "#C0392B" : "#D0B8B4"}`, padding: "10px 14px", background: "#fff", outline: "none" });
const labelStyle = { display: "block", fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "6px" };

export default function PackageForm({ initialData, onSubmit, onCancel, loading }) {
  const [form, setForm]     = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialData ? {
      name: initialData.name || "", tier: initialData.tier || "GOLD",
      theme: initialData.theme || "MODERN_LUXURY", description: initialData.description || "",
      price: initialData.price?.toString() || "", discountPercent: initialData.discountPercent || 0,
      maxGuests: initialData.maxGuests?.toString() || "",
      availability: initialData.availability || "AVAILABLE",
      bookingUrl: initialData.bookingUrl || "",
      includedVendors: initialData.includedVendors || [],
      active: initialData.active ?? true, featured: initialData.featured ?? false,
    } : EMPTY);
    setErrors({});
  }, [initialData]);

  const set = (field, val) => { setForm((p) => ({ ...p, [field]: val })); setErrors((p) => ({ ...p, [field]: "" })); };
  const toggleVendor = (v) => setForm((p) => ({ ...p, includedVendors: p.includedVendors.includes(v) ? p.includedVendors.filter((x) => x !== v) : [...p.includedVendors, v] }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Valid price required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...form, price: parseFloat(form.price), discountPercent: parseInt(form.discountPercent) || 0, maxGuests: form.maxGuests ? parseInt(form.maxGuests) : null });
  };

  const groups = {};
  VENDOR_CATEGORIES.forEach((v) => { if (!groups[v.group]) groups[v.group] = []; groups[v.group].push(v); });

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(44,44,44,0.5)", padding: "16px" }}>
      <div style={{ background: "#fff", width: "100%", maxWidth: "680px", maxHeight: "90vh", overflowY: "auto" }}>

        {/* Header */}
        <div style={{ backgroundColor: "#2C2C2C", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", margin: "0 0 4px" }}>{initialData ? "Edit Package" : "New Package"}</p>
            <h2 style={{ fontFamily: "var(--font-brand)", fontSize: "22px", fontWeight: 300, fontStyle: "italic", color: "#fff", margin: 0 }}>{initialData ? initialData.name : "Create Package"}</h2>
          </div>
          <button onClick={onCancel} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "22px", cursor: "pointer" }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Name */}
          <div>
            <label style={labelStyle}>Package Name *</label>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Diamond Royal Wedding" style={inputStyle(errors.name)} />
            {errors.name && <p style={{ color: "#C0392B", fontSize: "11px", marginTop: "4px" }}>{errors.name}</p>}
          </div>

          {/* Tier + Theme */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Tier *</label>
              <select value={form.tier} onChange={(e) => set("tier", e.target.value)} style={{ ...inputStyle(false), appearance: "none" }}>
                {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Theme *</label>
              <select value={form.theme} onChange={(e) => set("theme", e.target.value)} style={{ ...inputStyle(false), appearance: "none" }}>
                {THEMES.map((t) => <option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
              </select>
            </div>
          </div>

          {/* Price + Discount + Guests */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Price (LKR) *</label>
              <input type="number" min="0" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="1500000" style={inputStyle(errors.price)} />
              {errors.price && <p style={{ color: "#C0392B", fontSize: "11px", marginTop: "4px" }}>{errors.price}</p>}
            </div>
            <div>
              <label style={labelStyle}>Discount %</label>
              <input type="number" min="0" max="100" value={form.discountPercent} onChange={(e) => set("discountPercent", e.target.value)} placeholder="0" style={inputStyle(false)} />
            </div>
            <div>
              <label style={labelStyle}>Max Guests</label>
              <input type="number" min="0" value={form.maxGuests} onChange={(e) => set("maxGuests", e.target.value)} placeholder="200" style={inputStyle(false)} />
            </div>
          </div>

          {/* Availability + Booking URL */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Availability</label>
              <select value={form.availability} onChange={(e) => set("availability", e.target.value)} style={{ ...inputStyle(false), appearance: "none" }}>
                <option value="AVAILABLE">✅ Available</option>
                <option value="LIMITED">⚠️ Limited Slots</option>
                <option value="BOOKED">❌ Fully Booked</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Booking URL (link to booking page)</label>
              <input value={form.bookingUrl} onChange={(e) => set("bookingUrl", e.target.value)} placeholder="e.g. /bookings/create?package=gold" style={inputStyle(false)} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Describe what's included…" style={{ ...inputStyle(false), resize: "none" }} />
          </div>

          {/* Vendor Categories */}
          <div>
            <label style={labelStyle}>Included Vendors</label>
            {Object.entries(groups).map(([grp, vendors]) => (
              <div key={grp} style={{ marginBottom: "14px" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "#9CA3AF", letterSpacing: "0.1em", marginBottom: "6px" }}>{grp}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "6px" }}>
                  {vendors.map((v) => {
                    const checked = form.includedVendors.includes(v.value);
                    return (
                      <label key={v.value} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 10px", border: `1px solid ${checked ? "#C9A84C" : "#EDE0DF"}`, background: checked ? "#FFFBF0" : "#fff", cursor: "pointer" }}>
                        <input type="checkbox" checked={checked} onChange={() => toggleVendor(v.value)} style={{ accentColor: "#C9A84C" }} />
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#2C2C2C" }}>{v.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Featured toggle */}
          <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} style={{ accentColor: "#C9A84C", width: "16px", height: "16px" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#2C2C2C" }}>Mark as Featured Package</span>
          </label>

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
            <button type="button" onClick={onCancel} style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "13px", background: "transparent", color: "#2C2C2C", border: "1px solid #D0B8B4", cursor: "pointer" }}>Cancel</button>
            <button type="submit" disabled={loading} style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "13px", background: loading ? "#ccc" : "#C0392B", color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Saving…" : initialData ? "Save Changes" : "Create Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
