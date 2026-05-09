import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ── Your Spring Boot backend base URL ─────────────────────────────────────────
const API = "http://localhost:8081/api/bookings";

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "CANCELLED"];

const STATUS_META = {
  PENDING:   { bgColor: "#FFFBEB", textColor: "#B45309", borderColor: "#FDE68A", dotColor: "#F59E0B" },
  CONFIRMED: { bgColor: "#F0FDF4", textColor: "#15803D", borderColor: "#BBF7D0", dotColor: "#22C55E" },
  CANCELLED: { bgColor: "#FEF2F2", textColor: "#B91C1C", borderColor: "#FECACA", dotColor: "#EF4444" },
};

export default function AdminBookings() {
  const { user, token } = useAuth();   // make sure your AuthContext exposes `token`
  const navigate = useNavigate();

  const [bookings,      setBookings]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [filterStatus,  setFilterStatus]  = useState("ALL");
  const [search,        setSearch]        = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast,         setToast]         = useState(null);

  // ── auth headers ────────────────────────────────────────────────────────────
  // If your backend uses JWT, pass the token. If it uses session cookies, remove the Authorization header.
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // ── fetch all bookings from Neon via Spring Boot ─────────────────────────────
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API, { headers });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // ── admin guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (user && user.role !== "ADMIN") navigate("/", { replace: true });
  }, [user, navigate]);

  // ── change status → PATCH /api/bookings/{id}/status ─────────────────────────
  async function changeStatus(id, newStatus) {
    // optimistic update
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b));
    try {
      const res = await fetch(`${API}/${id}/status`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error(`Failed to update status (${res.status})`);
      showToast(`Booking #${id} → ${newStatus}`, "success");
    } catch (err) {
      showToast(err.message, "error");
      fetchBookings(); // revert on failure
    }
  }

  // ── delete → DELETE /api/bookings/{id} ──────────────────────────────────────
  async function deleteBooking(id) {
    setConfirmDelete(null);
    setBookings((prev) => prev.filter((b) => b.id !== id)); // optimistic
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE", headers });
      if (!res.ok) throw new Error(`Failed to delete (${res.status})`);
      showToast(`Booking #${id} deleted`, "error");
    } catch (err) {
      showToast(err.message, "error");
      fetchBookings(); // revert on failure
    }
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  // ── derived list ─────────────────────────────────────────────────────────────
  const visible = bookings.filter((b) => {
    const matchStatus = filterStatus === "ALL" || b.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      String(b.id).includes(q) ||
      String(b.userId).includes(q) ||
      String(b.vendorId).includes(q);
    return matchStatus && matchSearch;
  });

  // ── stats ────────────────────────────────────────────────────────────────────
  const total     = bookings.length;
  const pending   = bookings.filter((b) => b.status === "PENDING").length;
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;
  const cancelled = bookings.filter((b) => b.status === "CANCELLED").length;
  const revenue   = bookings
    .filter((b) => b.status === "CONFIRMED")
    .reduce((s, b) => s + (b.amount || 0), 0);

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#F9EAE8", padding: "40px 16px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* back */}
        <button
          onClick={() => navigate("/admin")}
          style={s.backBtn}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C0392B")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
        >
          ← Back to Admin Panel
        </button>

        {/* heading */}
        <div style={{ marginBottom: 28 }}>
          <p style={s.kicker}>Admin Panel</p>
          <h1 style={s.title}>Booking Management</h1>
          <p style={s.subtitle}>
            Welcome, <span style={{ color: "#2C2C2C" }}>{user?.name || "Admin"}</span>.
            {" "}Review, update, and manage all bookings from Neon.
          </p>
        </div>

        {/* stat cards */}
        <div style={s.statGrid}>
          {[
            { label: "Total",                value: total,                          color: "#2C2C2C" },
            { label: "Pending",              value: pending,                        color: "#D97706" },
            { label: "Confirmed",            value: confirmed,                      color: "#16A34A" },
            { label: "Cancelled",            value: cancelled,                      color: "#C0392B" },
            { label: "Revenue (Confirmed)",  value: `$${revenue.toLocaleString()}`, color: "#C9A84C" },
          ].map((stat) => (
            <div key={stat.label} style={s.statCard}>
              <p style={{ ...s.kicker, marginBottom: 4 }}>{stat.label}</p>
              <p style={{ fontFamily: "var(--font-brand)", fontSize: 28, fontWeight: 300, fontStyle: "italic", color: stat.color, margin: 0 }}>
                {loading ? "—" : stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* filters + refresh */}
        <div style={s.filterRow}>
          <input
            type="text"
            placeholder="Search by booking / user / vendor ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.searchInput}
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["ALL", ...STATUS_OPTIONS].map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterStatus(opt)}
                style={{
                  ...s.filterBtn,
                  background:  filterStatus === opt ? "#C0392B" : "#fff",
                  color:       filterStatus === opt ? "#fff"    : "#555",
                  borderColor: filterStatus === opt ? "#C0392B" : "#EDE0DF",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            onClick={fetchBookings}
            style={s.refreshBtn}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C0392B", e.currentTarget.style.color = "#C0392B")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#EDE0DF", e.currentTarget.style.color = "#999")}
          >
            ↻ Refresh
          </button>
        </div>

        {/* loading / error states */}
        {loading && (
          <div style={s.stateBox}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#999" }}>Loading bookings from database…</p>
          </div>
        )}
        {error && !loading && (
          <div style={{ ...s.stateBox, background: "#FEF2F2", border: "1px solid #FECACA" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#B91C1C", margin: "0 0 8px" }}>
              ⚠ Could not connect to backend: {error}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#999", margin: 0 }}>
              Make sure Spring Boot is running on <strong>localhost:8081</strong> and CORS is enabled.
            </p>
          </div>
        )}

        {/* table */}
        {!loading && !error && (
          <div style={s.tableWrap}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FEF2F2", borderBottom: "1px solid #EDE0DF" }}>
                  {["ID", "User ID", "Vendor ID", "Event Date", "Amount", "Status", "Created At", "Actions"].map((h) => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: 32, color: "#aaa", fontFamily: "var(--font-body)", fontSize: 13 }}>
                      No bookings found.
                    </td>
                  </tr>
                )}
                {visible.map((b, i) => {
                  const meta = STATUS_META[b.status] || STATUS_META.PENDING;
                  return (
                    <tr key={b.id} style={{ background: i % 2 === 0 ? "#fff" : "#fdf8f8" }}>
                      <td style={s.td}>#{b.id}</td>
                      <td style={s.td}>{b.userId}</td>
                      <td style={s.td}>{b.vendorId}</td>
                      <td style={s.td}>
                        {b.eventDate
                          ? new Date(b.eventDate).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
                          : "—"}
                      </td>
                      <td style={{ ...s.td, fontWeight: 600, color: "#2C2C2C" }}>
                        ${(b.amount || 0).toLocaleString()}
                      </td>

                      {/* status badge + change dropdown */}
                      <td style={s.td}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            padding: "3px 8px", borderRadius: 3, fontSize: 11,
                            fontFamily: "var(--font-body)", fontWeight: 500, whiteSpace: "nowrap",
                            background: meta.bgColor, color: meta.textColor, border: `1px solid ${meta.borderColor}`,
                          }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: meta.dotColor, display: "inline-block" }} />
                            {b.status}
                          </span>
                          <select
                            value={b.status}
                            onChange={(e) => changeStatus(b.id, e.target.value)}
                            style={s.select}
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      </td>

                      <td style={{ ...s.td, color: "#999", fontSize: 12 }}>
                        {b.createdAt
                          ? new Date(b.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })
                          : "—"}
                      </td>

                      <td style={s.td}>
                        <button
                          onClick={() => setConfirmDelete(b.id)}
                          style={s.deleteBtn}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#C0392B"; e.currentTarget.style.color = "#fff"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C0392B"; }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#bbb", marginTop: 12 }}>
          Showing {visible.length} of {bookings.length} bookings
        </p>
      </div>

      {/* delete confirm modal */}
      {confirmDelete !== null && (
        <div style={s.modalOverlay} onClick={() => setConfirmDelete(null)}>
          <div style={s.modalBox} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "var(--font-brand)", fontWeight: 300, fontStyle: "italic", fontSize: 22, color: "#2C2C2C", margin: "0 0 8px" }}>
              Delete Booking #{confirmDelete}?
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#777", margin: "0 0 24px" }}>
              This will permanently remove it from the Neon database.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => deleteBooking(confirmDelete)}
                style={s.confirmBtn}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#A93226")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C0392B")}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                style={s.cancelBtn}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C0392B"; e.currentTarget.style.color = "#C0392B"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#EDE0DF"; e.currentTarget.style.color = "#555"; }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24,
          background: toast.type === "error" ? "#C0392B" : "#16A34A",
          color: "#fff", padding: "12px 20px", borderRadius: 2,
          fontFamily: "var(--font-body)", fontSize: 13,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 9999,
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ── styles ────────────────────────────────────────────────────────────────────
const s = {
  kicker:      { fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", margin: "0 0 6px" },
  title:       { fontFamily: "var(--font-brand)", fontSize: "clamp(24px,3vw,38px)", fontWeight: 300, fontStyle: "italic", color: "#2C2C2C", margin: 0 },
  subtitle:    { fontFamily: "var(--font-body)", fontSize: 13, color: "#999", marginTop: 10 },
  statGrid:    { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24 },
  statCard:    { background: "#fff", border: "1px solid #EDE0DF", borderRadius: 2, padding: "16px 20px" },
  filterRow:   { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 16 },
  searchInput: { flex: 1, minWidth: 220, padding: "9px 14px", border: "1px solid #EDE0DF", borderRadius: 2, fontFamily: "var(--font-body)", fontSize: 13, color: "#2C2C2C", outline: "none", background: "#fff" },
  filterBtn:   { fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", padding: "7px 14px", border: "1px solid", borderRadius: 2, cursor: "pointer", transition: "all 0.15s" },
  refreshBtn:  { fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.12em", padding: "7px 14px", border: "1px solid #EDE0DF", borderRadius: 2, background: "#fff", color: "#999", cursor: "pointer", transition: "all 0.15s" },
  stateBox:    { background: "#fff", border: "1px solid #EDE0DF", borderRadius: 2, padding: "24px", marginBottom: 16, textAlign: "center" },
  tableWrap:   { background: "#fff", border: "1px solid #EDE0DF", borderRadius: 2, overflowX: "auto" },
  th:          { fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", padding: "12px 14px", textAlign: "left", whiteSpace: "nowrap" },
  td:          { fontFamily: "var(--font-body)", fontSize: 13, color: "#444", padding: "12px 14px", borderBottom: "1px solid #F5ECEA", verticalAlign: "middle" },
  select:      { padding: "4px 8px", border: "1px solid #EDE0DF", borderRadius: 2, fontFamily: "var(--font-body)", fontSize: 12, color: "#555", background: "#fff", cursor: "pointer" },
  backBtn:     { fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.1em", color: "#999", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 20, transition: "color 0.15s" },
  deleteBtn:   { fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", padding: "6px 12px", border: "1px solid #C0392B", borderRadius: 2, background: "transparent", color: "#C0392B", cursor: "pointer", transition: "all 0.15s" },
  modalOverlay:{ position: "fixed", inset: 0, background: "rgba(44,44,44,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9000 },
  modalBox:    { background: "#fff", border: "1px solid #EDE0DF", borderRadius: 2, padding: "32px 36px", maxWidth: 400, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" },
  confirmBtn:  { fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", padding: "10px 20px", background: "#C0392B", color: "#fff", border: "none", borderRadius: 2, cursor: "pointer", transition: "background 0.15s" },
  cancelBtn:   { fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", padding: "10px 20px", background: "#fff", color: "#555", border: "1px solid #EDE0DF", borderRadius: 2, cursor: "pointer", transition: "all 0.15s" },
};

