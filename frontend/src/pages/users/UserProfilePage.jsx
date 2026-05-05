// src/pages/users/UserProfilePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { updateUser } from "../../services/userService";

export default function UserProfilePage() {
  const navigate       = useNavigate();
  const { user, login, logout } = useAuth();

  const [editing, setEditing]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState("");
  const [error, setError]       = useState("");

  const [form, setForm] = useState({
    name:        user?.name        || "",
    email:       user?.email       || "",
    phoneNumber: user?.phoneNumber || "",
    password:    "",
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const updated = await updateUser(user.id, {
        name:        form.name,
        email:       form.email,
        phoneNumber: form.phoneNumber,
        password:    form.password || undefined,
        role:        user.role,
        active:      user.active,
      });
      login(updated);        // refresh AuthContext
      setSuccess("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 13px",
    border: "1px solid #EDE0DF", borderRadius: "2px",
    fontFamily: "var(--font-body)", fontSize: "13px",
    background: editing ? "#fff" : "#F9EAE8",
    color: "#2C2C2C", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9EAE8", padding: "60px 16px" }}>
      <div style={{ maxWidth: "540px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "8px" }}>My Account</p>
          <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, fontStyle: "italic", color: "#2C2C2C" }}>
            Welcome, {user?.name?.split(" ")[0]}
          </h1>
        </div>

        {/* Role Badge */}
        <div style={{ marginBottom: "24px" }}>
          <span style={{
            display: "inline-block", padding: "4px 14px",
            background: user?.role === "ADMIN" ? "#C0392B" : "#C9A84C",
            color: "#fff", fontSize: "10px", letterSpacing: "0.2em",
            textTransform: "uppercase", fontFamily: "var(--font-body)",
          }}>
            {user?.role}
          </span>
          <span style={{ marginLeft: "10px", fontSize: "12px", color: "#999", fontFamily: "var(--font-body)" }}>
            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "—"}
          </span>
        </div>

        {/* Alerts */}
        {success && <div style={alertStyle("#D1FAE5", "#065F46")}>{success}</div>}
        {error   && <div style={alertStyle("#FEF2F2", "#C0392B")}>{error}</div>}

        {/* Card */}
        <div style={{ background: "#fff", border: "1px solid #EDE0DF", padding: "36px", borderRadius: "2px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
            <h2 style={{ fontFamily: "var(--font-body)", fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#2C2C2C" }}>
              Personal Information
            </h2>
            {!editing && (
              <button onClick={() => setEditing(true)} style={ghostBtn}>Edit</button>
            )}
          </div>

          <form onSubmit={saveProfile} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <Field label="Full Name">
              <input name="name" value={form.name} onChange={handle} disabled={!editing} style={inputStyle}
                onFocus={e => editing && (e.target.style.borderColor = "#C0392B")}
                onBlur={e => e.target.style.borderColor = "#EDE0DF"} />
            </Field>

            <Field label="Email Address">
              <input name="email" type="email" value={form.email} onChange={handle} disabled={!editing} style={inputStyle}
                onFocus={e => editing && (e.target.style.borderColor = "#C0392B")}
                onBlur={e => e.target.style.borderColor = "#EDE0DF"} />
            </Field>

            <Field label="Phone Number">
              <input name="phoneNumber" value={form.phoneNumber} onChange={handle} disabled={!editing} placeholder="Not provided" style={inputStyle}
                onFocus={e => editing && (e.target.style.borderColor = "#C0392B")}
                onBlur={e => e.target.style.borderColor = "#EDE0DF"} />
            </Field>

            {editing && (
              <Field label="New Password (leave blank to keep current)">
                <input name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#C0392B"}
                  onBlur={e => e.target.style.borderColor = "#EDE0DF"} />
              </Field>
            )}

            {editing && (
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button type="submit" disabled={loading} style={primaryBtn}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button type="button" onClick={() => { setEditing(false); setError(""); }} style={ghostBtn}>
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Logout */}
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <button
            onClick={() => { logout(); navigate("/login"); }}
            style={{ background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: "12px", color: "#C0392B", cursor: "pointer", letterSpacing: "0.1em", textDecoration: "underline" }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", marginBottom: "6px" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const primaryBtn = {
  padding: "11px 28px", background: "#C0392B", color: "#fff",
  border: "none", borderRadius: "2px", fontFamily: "var(--font-body)",
  fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
  cursor: "pointer", fontWeight: 500,
};

const ghostBtn = {
  padding: "10px 20px", background: "transparent", color: "#2C2C2C",
  border: "1px solid #EDE0DF", borderRadius: "2px", fontFamily: "var(--font-body)",
  fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
  cursor: "pointer",
};

const alertStyle = (bg, color) => ({
  padding: "12px 16px", borderRadius: "2px", marginBottom: "16px",
  background: bg, color: color, fontFamily: "var(--font-body)", fontSize: "13px",
});
