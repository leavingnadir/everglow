import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFeedback } from "../../api/feedbackApi";
import { useAuth } from "../../context/AuthContext";
import StarRating from "../../components/StarRating";

const CATEGORIES = ["Photography", "Venue", "Catering", "Decoration", "Music", "Makeup", "Other"];
const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

export default function SubmitFeedback() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    vendorId: "",
    bookingId: "",
    rating: 0,
    comment: "",
    reviewerName: user?.name || "",
    vendorCategory: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // ── Guard: not logged in ──────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#F9EAE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-brand)", fontStyle: "italic", fontSize: 22, color: "#2C2C2C", marginBottom: 16 }}>
            Please sign in to write a review
          </p>
          <button style={s.primaryBtn} onClick={() => navigate("/login")}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#E74C3C")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#C0392B")}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // ── Success screen ────────────────────────────────────────────────────────
  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "#F9EAE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 420, padding: "0 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
          <h2 style={{ fontFamily: "var(--font-brand)", fontStyle: "italic", fontSize: 28, fontWeight: 300, color: "#2C2C2C", marginBottom: 10 }}>
            Thank you!
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#999", lineHeight: 1.6, marginBottom: 28 }}>
            Your review has been submitted and is pending admin approval. It will appear publicly once approved.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button style={s.primaryBtn} onClick={() => navigate("/reviews")}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#E74C3C")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#C0392B")}
            >
              View Reviews
            </button>
            <button
              style={{ ...s.primaryBtn, background: "transparent", color: "#C0392B", border: "1.5px solid #C0392B" }}
              onClick={() => { setSuccess(false); setForm({ vendorId: "", bookingId: "", rating: 0, comment: "", reviewerName: user?.name || "", vendorCategory: "" }); }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#C0392B"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C0392B"; }}
            >
              Write Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Validation + submit ───────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.rating)            return setError("Please select a star rating.");
    if (!form.comment.trim())    return setError("Please write a comment.");
    if (!form.vendorId)          return setError("Please enter a Vendor ID.");
    if (!form.vendorCategory)    return setError("Please select a vendor category.");

    setError(null);
    setSubmitting(true);
    try {
      await createFeedback({
        userId: user.id,
        vendorId: Number(form.vendorId),
        bookingId: form.bookingId ? Number(form.bookingId) : null,
        rating: form.rating,
        comment: form.comment.trim(),
        reviewerName: form.reviewerName.trim() || user.name,
        vendorCategory: form.vendorCategory,
      });
      setSuccess(true);
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#F9EAE8", padding: "48px 16px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        <button onClick={() => navigate("/reviews")} style={s.backBtn}>
          ← Back to Reviews
        </button>

        <p style={s.kicker}>Share Your Experience</p>
        <h1 style={s.title}>Write a Review</h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#999", marginTop: 8, marginBottom: 32 }}>
          Your feedback helps other couples plan their perfect day.
        </p>

        <div style={{ background: "#fff", border: "1px solid #EDE0DF", borderRadius: 2, padding: "32px" }}>

          <Field label="Your Name">
            <input style={s.input}
              value={form.reviewerName}
              onChange={(e) => setForm((p) => ({ ...p, reviewerName: e.target.value }))}
              placeholder="Full name"
            />
          </Field>

          <Field label="Rating">
            <div style={{ marginTop: 4 }}>
              <StarRating rating={form.rating} onRate={(r) => setForm((p) => ({ ...p, rating: r }))} size={28} />
              {form.rating > 0 && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#C9A84C", marginTop: 4, letterSpacing: "0.1em" }}>
                  {RATING_LABELS[form.rating]}
                </p>
              )}
            </div>
          </Field>

          <Field label="Vendor Category">
            <select style={s.input}
              value={form.vendorCategory}
              onChange={(e) => setForm((p) => ({ ...p, vendorCategory: e.target.value }))}
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          <Field label="Vendor ID">
            <input style={s.input} type="number" min="1"
              value={form.vendorId}
              onChange={(e) => setForm((p) => ({ ...p, vendorId: e.target.value }))}
              placeholder="Vendor ID number"
            />
          </Field>

          <Field label="Booking ID (optional)">
            <input style={s.input} type="number" min="1"
              value={form.bookingId}
              onChange={(e) => setForm((p) => ({ ...p, bookingId: e.target.value }))}
              placeholder="Your booking reference"
            />
          </Field>

          <Field label="Your Review">
            <textarea style={{ ...s.input, height: 120, resize: "vertical" }}
              value={form.comment}
              onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
              placeholder="Share your experience…"
              maxLength={1000}
            />
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#bbb", textAlign: "right", marginTop: 3 }}>
              {form.comment.length}/1000
            </p>
          </Field>

          {error && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#C0392B", marginBottom: 16 }}>
              ⚠ {error}
            </p>
          )}

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button
              style={{ ...s.primaryBtn, background: "transparent", color: "#999", border: "1.5px solid #EDE0DF" }}
              onClick={() => navigate("/reviews")}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C0392B")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#EDE0DF")}
            >
              Cancel
            </button>
            <button
              style={{ ...s.primaryBtn, opacity: submitting ? 0.6 : 1 }}
              onClick={handleSubmit}
              disabled={submitting}
              onMouseEnter={(e) => !submitting && (e.currentTarget.style.background = "#E74C3C")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#C0392B")}
            >
              {submitting ? "Submitting…" : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: 8 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const s = {
  kicker: { fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", margin: "0 0 6px" },
  title: { fontFamily: "var(--font-brand)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, fontStyle: "italic", color: "#2C2C2C", margin: 0 },
  backBtn: { fontFamily: "var(--font-body)", fontSize: 12, color: "#999", letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer", marginBottom: 28, padding: 0 },
  input: { width: "100%", fontFamily: "var(--font-body)", fontSize: 13, color: "#2C2C2C", background: "#FAFAF9", border: "1px solid #EDE0DF", borderRadius: 2, padding: "10px 14px", outline: "none", boxSizing: "border-box" },
  primaryBtn: { fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", background: "#C0392B", color: "#fff", border: "none", padding: "12px 24px", cursor: "pointer", borderRadius: 2, transition: "all 0.15s" },
};
