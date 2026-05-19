import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFeedbacks, approveFeedback, deleteFeedback, updateFeedback } from "../../api/feedbackApi";
import StarRating from "../../components/StarRating";
import { useAuth } from "../../context/AuthContext";

function formatDate(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function StatusBadge({ approved }) {
  return (
    <span style={{
      fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.14em",
      textTransform: "uppercase", padding: "3px 9px", borderRadius: 2,
      background: approved ? "#ECFDF5" : "#FFF7ED",
      color: approved ? "#059669" : "#D97706",
      border: `1px solid ${approved ? "#6EE7B750" : "#FCD34D50"}`,
    }}>
      {approved ? "Approved" : "Pending"}
    </span>
  );
}

export default function AdminFeedbackPage() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("all");         // all | pending | approved
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!isAdmin) { navigate("/"); return; }
    load();
  }, []);

  function load() {
    setLoading(true);
    getAllFeedbacks()
      .then(setFeedbacks)
      .catch(() => setError("Failed to load feedback."))
      .finally(() => setLoading(false));
  }

  async function handleApprove(fb) {
    try {
      const updated = await approveFeedback(fb.id);
      setFeedbacks((prev) => prev.map((f) => f.id === fb.id ? updated : f));
    } catch { alert("Failed to approve."); }
  }

  async function handleDelete(id) {
    if (!window.confirm("Permanently delete this review?")) return;
    setDeletingId(id);
    try {
      await deleteFeedback(id);
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    } catch { alert("Failed to delete."); }
    finally { setDeletingId(null); }
  }

  function startEdit(fb) {
    setEditingId(fb.id);
    setEditComment(fb.comment);
    setEditRating(fb.rating);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditComment("");
    setEditRating(0);
  }

  async function saveEdit(fb) {
    if (!editComment.trim()) return alert("Comment cannot be empty.");
    if (!editRating) return alert("Please set a rating.");
    setSaving(true);
    try {
      const updated = await updateFeedback(fb.id, {
        userId: fb.userId, vendorId: fb.vendorId, bookingId: fb.bookingId,
        rating: editRating, comment: editComment.trim(),
        reviewerName: fb.reviewerName, vendorCategory: fb.vendorCategory,
      });
      setFeedbacks((prev) => prev.map((f) => f.id === fb.id ? updated : f));
      cancelEdit();
    } catch { alert("Failed to save changes."); }
    finally { setSaving(false); }
  }

  const pendingCount = feedbacks.filter((f) => !f.approved).length;
  const approvedCount = feedbacks.filter((f) => f.approved).length;

  const visible = feedbacks.filter((f) => {
    if (tab === "pending") return !f.approved;
    if (tab === "approved") return f.approved;
    return true;
  });

  const avgRating = feedbacks.length
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : "–";

  return (
    <div style={{ minHeight: "100vh", background: "#F9EAE8", padding: "48px 16px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <div>
            <p style={s.kicker}>Admin · Reviews</p>
            <h1 style={s.title}>Feedback Management</h1>
            <p style={s.subtitle}>{feedbacks.length} total · {pendingCount} awaiting approval</p>
          </div>
          <button style={s.outlineBtn} onClick={() => navigate("/admin")}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C0392B")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#EDE0DF")}
          >
            ← Admin Panel
          </button>
        </div>

        {/* ── Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Total",    value: feedbacks.length, icon: "💬" },
            { label: "Approved", value: approvedCount,    icon: "✅" },
            { label: "Pending",  value: pendingCount,     icon: "⏳" },
            { label: "Avg Rating", value: avgRating + " ★", icon: "⭐" },
          ].map((st) => (
            <div key={st.label} style={{ background: "#fff", border: "1px solid #EDE0DF", borderRadius: 2, padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", margin: 0 }}>{st.label}</p>
                <span style={{ fontSize: 15 }}>{st.icon}</span>
              </div>
              <p style={{ fontFamily: "var(--font-brand)", fontStyle: "italic", fontSize: 24, color: "#2C2C2C", margin: "8px 0 0" }}>{st.value}</p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", borderBottom: "1.5px solid #EDE0DF", marginBottom: 24 }}>
          {[
            { key: "all",      label: `All (${feedbacks.length})` },
            { key: "pending",  label: `Pending (${pendingCount})` },
            { key: "approved", label: `Approved (${approvedCount})` },
          ].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.18em",
              textTransform: "uppercase", padding: "10px 20px",
              border: "none", background: "none", cursor: "pointer",
              borderBottom: tab === t.key ? "2px solid #C0392B" : "2px solid transparent",
              color: tab === t.key ? "#C0392B" : "#999",
              marginBottom: -1.5, transition: "color 0.15s",
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        {loading && <p style={s.subtitle}>Loading…</p>}
        {error   && <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#C0392B" }}>{error}</p>}
        {!loading && visible.length === 0 && <p style={s.subtitle}>No reviews in this category.</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {visible.map((fb) => {
            const isEditing  = editingId === fb.id;
            const isDeleting = deletingId === fb.id;

            return (
              <div key={fb.id} style={{
                background: "#fff", border: "1px solid #EDE0DF", borderRadius: 2,
                borderLeft: `3px solid ${fb.approved ? "#10B981" : "#F59E0B"}`,
                padding: "22px 24px", opacity: isDeleting ? 0.4 : 1, transition: "opacity 0.2s",
              }}>

                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                      <p style={{ fontFamily: "var(--font-brand)", fontStyle: "italic", fontSize: 16, color: "#2C2C2C", margin: 0 }}>
                        {fb.reviewerName || "Anonymous"}
                      </p>
                      <StatusBadge approved={fb.approved} />
                      {fb.vendorCategory && (
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9A84C" }}>
                          {fb.vendorCategory}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
                      <StarRating rating={fb.rating} size={14} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#bbb" }}>
                        Vendor #{fb.vendorId} · User #{fb.userId} · {formatDate(fb.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
                    {!fb.approved && (
                      <button onClick={() => handleApprove(fb)} style={{ ...s.actionBtn, background: "#ECFDF5", color: "#059669", border: "1px solid #6EE7B740" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#D1FAE5")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#ECFDF5")}
                      >
                        ✓ Approve
                      </button>
                    )}
                    {!isEditing && (
                      <button onClick={() => startEdit(fb)} style={{ ...s.actionBtn, background: "#FFF7ED", color: "#D97706", border: "1px solid #FCD34D40" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#FEEBC8")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#FFF7ED")}
                      >
                        ✎ Edit
                      </button>
                    )}
                    <button onClick={() => handleDelete(fb.id)} disabled={isDeleting}
                      style={{ ...s.actionBtn, background: "#FEF2F2", color: "#C0392B", border: "1px solid #FECACA40" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FEE2E2")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#FEF2F2")}
                    >
                      ✕ Delete
                    </button>
                  </div>
                </div>

                {/* Comment / Edit area */}
                {isEditing ? (
                  <div>
                    <div style={{ marginBottom: 12 }}>
                      <label style={s.fieldLabel}>Rating</label>
                      <StarRating rating={editRating} onRate={setEditRating} size={22} />
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <label style={s.fieldLabel}>Comment</label>
                      <textarea
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        maxLength={1000}
                        style={{ width: "100%", fontFamily: "var(--font-body)", fontSize: 13, color: "#2C2C2C", border: "1px solid #C9A84C", borderRadius: 2, padding: "10px 14px", boxSizing: "border-box", height: 100, resize: "vertical", outline: "none" }}
                      />
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#bbb", textAlign: "right", margin: "2px 0 0" }}>
                        {editComment.length}/1000
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={() => saveEdit(fb)} disabled={saving}
                        style={{ ...s.actionBtn, background: "#2C2C2C", color: "#fff", border: "none", opacity: saving ? 0.6 : 1 }}
                      >
                        {saving ? "Saving…" : "Save Changes"}
                      </button>
                      <button onClick={cancelEdit}
                        style={{ ...s.actionBtn, background: "transparent", color: "#999", border: "1px solid #EDE0DF" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(44,44,44,0.72)", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                    "{fb.comment}"
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const s = {
  kicker: { fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", margin: "0 0 6px" },
  title: { fontFamily: "var(--font-brand)", fontSize: "clamp(28px,3vw,40px)", fontWeight: 300, fontStyle: "italic", color: "#2C2C2C", margin: 0 },
  subtitle: { fontFamily: "var(--font-body)", fontSize: 13, color: "#999", marginTop: 8 },
  outlineBtn: { fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", background: "transparent", color: "#999", border: "1.5px solid #EDE0DF", padding: "10px 18px", cursor: "pointer", borderRadius: 2, transition: "border-color 0.15s" },
  actionBtn: { fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 14px", borderRadius: 2, cursor: "pointer", transition: "background 0.15s" },
  fieldLabel: { fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: 6 },
};
