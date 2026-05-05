// src/pages/users/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, registerUser } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate  = useNavigate();
  const { login } = useAuth();

  const [mode, setMode]       = useState("login");   // "login" | "register"
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Form fields
  const [form, setForm] = useState({
    name: "", email: "", password: "", phoneNumber: "",
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let userData;
      if (mode === "login") {
        userData = await loginUser(form.email, form.password);
      } else {
        userData = await registerUser({
          name:        form.name,
          email:       form.email,
          password:    form.password,
          phoneNumber: form.phoneNumber,
          role:        "USER",
        });
      }

      login(userData);

      // Redirect based on role
      if (userData.role === "ADMIN") {
        navigate("/admin/users");
      } else {
        navigate("/user/profile");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Shared input style ──────────────────────────────────────────────────────
  const inputStyle = {
    width: "100%", padding: "11px 14px",
    border: "1px solid #EDE0DF", borderRadius: "2px",
    fontFamily: "var(--font-body)", fontSize: "13px",
    background: "#fff", color: "#2C2C2C",
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9EAE8", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <Link to="/">
            <img src="/everglow_1.png" alt="Everglow" style={{ height: "22px", objectFit: "contain" }} />
          </Link>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", marginTop: "12px" }}>
            {mode === "login" ? "Welcome Back" : "Create Your Account"}
          </p>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", border: "1px solid #EDE0DF", padding: "40px 36px", borderRadius: "2px", boxShadow: "0 2px 16px rgba(192,57,43,0.06)" }}>

          {/* Toggle tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #EDE0DF", marginBottom: "28px" }}>
            {["login", "register"].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                style={{
                  flex: 1, padding: "10px 0", background: "none", border: "none",
                  borderBottom: mode === m ? "2px solid #C0392B" : "2px solid transparent",
                  fontFamily: "var(--font-body)", fontSize: "12px", letterSpacing: "0.15em",
                  textTransform: "uppercase", color: mode === m ? "#C0392B" : "#999",
                  cursor: "pointer", fontWeight: mode === m ? 600 : 400,
                  transition: "all 0.2s",
                }}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "2px", padding: "10px 14px", marginBottom: "20px", color: "#C0392B", fontSize: "13px", fontFamily: "var(--font-body)" }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {mode === "register" && (
              <div>
                <label style={labelStyle}>Full Name</label>
                <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#C0392B"}
                  onBlur={e => e.target.style.borderColor = "#EDE0DF"} />
              </div>
            )}

            <div>
              <label style={labelStyle}>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handle} required placeholder="your@email.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#C0392B"}
                onBlur={e => e.target.style.borderColor = "#EDE0DF"} />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input name="password" type="password" value={form.password} onChange={handle} required placeholder="••••••••" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#C0392B"}
                onBlur={e => e.target.style.borderColor = "#EDE0DF"} />
            </div>

            {mode === "register" && (
              <div>
                <label style={labelStyle}>Phone Number <span style={{ color: "#bbb" }}>(optional)</span></label>
                <input name="phoneNumber" value={form.phoneNumber} onChange={handle} placeholder="+94 77 123 4567" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#C0392B"}
                  onBlur={e => e.target.style.borderColor = "#EDE0DF"} />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "8px", padding: "13px", background: loading ? "#E88" : "#C0392B",
                color: "#fff", border: "none", borderRadius: "2px",
                fontFamily: "var(--font-body)", fontSize: "12px", letterSpacing: "0.18em",
                textTransform: "uppercase", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => !loading && (e.target.style.background = "#E74C3C")}
              onMouseLeave={e => !loading && (e.target.style.background = "#C0392B")}
            >
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <p style={{ textAlign: "center", marginTop: "20px", fontFamily: "var(--font-body)", fontSize: "12px", color: "#999" }}>
          <Link to="/" style={{ color: "#C0392B", textDecoration: "none" }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block", fontFamily: "var(--font-body)", fontSize: "11px",
  letterSpacing: "0.15em", textTransform: "uppercase", color: "#666",
  marginBottom: "6px", fontWeight: 500,
};
