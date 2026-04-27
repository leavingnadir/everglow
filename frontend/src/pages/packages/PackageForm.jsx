import { useState, useEffect } from "react";
import { TIERS, VENDOR_CATEGORIES } from "../../services/packageService";

const EMPTY_FORM = { name: "", tier: "GOLD", description: "", price: "", includedVendors: [], active: true };

export default function PackageForm({ initialData, onSubmit, onCancel, loading }) {
  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({ name: initialData.name || "", tier: initialData.tier || "GOLD", description: initialData.description || "", price: initialData.price?.toString() || "", includedVendors: initialData.includedVendors || [], active: initialData.active ?? true });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleVendor = (v) => {
    setForm((prev) => ({
      ...prev,
      includedVendors: prev.includedVendors.includes(v) ? prev.includedVendors.filter((x) => x !== v) : [...prev.includedVendors, v],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Package name is required.";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Enter a valid positive price.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit({ ...form, price: parseFloat(form.price) });
  };

  const inputStyle = (hasError) => ({
    width: "100%", boxSizing: "border-box",
    fontFamily: "var(--font-body)", fontSize: "13px", color: "#2C2C2C",
    border: `1px solid ${hasError ? "#C0392B" : "#D0B8B4"}`,
    padding: "10px 14px", background: "#fff", outline: "none",
  });

  const labelStyle = {
    display: "block", fontFamily: "var(--font-body)", fontSize: "10px",
    fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase",
    color: "#C9A84C", marginBottom: "8px",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(44,44,44,0.45)", padding: "16px" }}>
      <div style={{ background: "#fff", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto", padding: "40px 36px" }}>

        {/* Title */}
        <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "8px" }}>
          {initialData ? "Edit Package" : "New Package"}
        </p>
        <h2 style={{ fontFamily: "var(--font-brand)", fontSize: "28px", fontWeight: 300, fontStyle: "italic", color: "#2C2C2C", marginBottom: "32px" }}>
          {initialData ? initialData.name : "Create Package"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Name */}
          <div>
            <label style={labelStyle}>Package Name *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Gold Wedding Package" style={inputStyle(errors.name)} />
            {errors.name && <p style={{ color: "#C0392B", fontSize: "12px", marginTop: "4px", fontFamily: "var(--font-body)" }}>{errors.name}</p>}
          </div>

          {/* Tier + Price row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Tier *</label>
              <select name="tier" value={form.tier} onChange={handleChange} style={{ ...inputStyle(false), appearance: "none" }}>
                {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Price (USD) *</label>
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="e.g. 2500" style={inputStyle(errors.price)} />
              {errors.price && <p style={{ color: "#C0392B", fontSize: "12px", marginTop: "4px", fontFamily: "var(--font-body)" }}>{errors.price}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="What's included in this package…" style={{ ...inputStyle(false), resize: "none" }} />
          </div>

          {/* Vendors */}
          <div>
            <label style={labelStyle}>Included Vendors</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {VENDOR_CATEGORIES.map((vendor) => {
                const checked = form.includedVendors.includes(vendor.value);
                return (
                  <label
                    key={vendor.value}
                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", border: `1px solid ${checked ? "#C9A84C" : "#EDE0DF"}`, background: checked ? "#FFFBF0" : "#fff", cursor: "pointer", transition: "all 0.15s" }}
                  >
                    <input type="checkbox" checked={checked} onChange={() => toggleVendor(vendor.value)} style={{ accentColor: "#C9A84C" }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#2C2C2C" }}>{vendor.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
            <button
              type="button"
              onClick={onCancel}
              style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "13px", background: "transparent", color: "#2C2C2C", border: "1px solid #D0B8B4", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "13px", background: loading ? "#ccc" : "#C0392B", color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Saving…" : initialData ? "Save Changes" : "Create Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
