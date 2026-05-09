import { useState, useEffect } from "react";

const API_BASE = "http://localhost:8081/api/feedbacks";

const CATEGORY_COLORS = {
  Photographer: { bg: "#fdf2e9", accent: "#e67e22", text: "#7d4e00" },
  Venue:        { bg: "#eaf4fb", accent: "#2e86c1", text: "#1a4f72" },
  Caterer:      { bg: "#eafaf1", accent: "#27ae60", text: "#1a5e33" },
  Decorator:    { bg: "#f5eef8", accent: "#8e44ad", text: "#5b2c6f" },
  Default:      { bg: "#f2f3f4", accent: "#7f8c8d", text: "#424949" },
};

function StarRating({ rating, size = 18 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s <= rating ? "#f0b429" : "none"}
          stroke={s <= rating ? "#f0b429" : "#ccc"} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

function FeedbackCard({ feedback }) {
  const cat = CATEGORY_COLORS[feedback.vendorCategory] || CATEGORY_COLORS.Default;
  const initials = feedback.reviewerName
    ? feedback.reviewerName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";
  const date = feedback.createdAt
    ? new Date(feedback.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "";

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      padding: "24px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
      border: "1px solid #f0ece8",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      transition: "transform 0.18s, box-shadow 0.18s",
      cursor: "default",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.13)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)"; }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: cat.accent, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 16, fontFamily: "'Playfair Display', serif", flexShrink: 0,
        }}>{initials}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: "#1a1a1a", fontFamily: "'Playfair Display', serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {feedback.reviewerName || "Anonymous"}
          </div>
          <div style={{ fontSize: 12, color: "#aaa", marginTop: 1 }}>{date}</div>
        </div>

        {/* Category badge */}
        {feedback.vendorCategory && (
          <span style={{
            background: cat.bg, color: cat.text,
            border: `1px solid ${cat.accent}33`,
            borderRadius: 20, padding: "3px 10px",
            fontSize: 11, fontWeight: 600, letterSpacing: 0.3, whiteSpace: "nowrap",
          }}>{feedback.vendorCategory}</span>
        )}
      </div>

      {/* Stars */}
      <StarRating rating={feedback.rating} />

      {/* Comment */}
      <p style={{
        fontSize: 14, color: "#444", lineHeight: 1.65,
        margin: 0, fontStyle: "italic",
        borderLeft: `3px solid ${cat.accent}`,
        paddingLeft: 12,
      }}>"{feedback.comment}"</p>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <span style={{ fontSize: 11, color: "#bbb" }}>Booking #{feedback.bookingId || "—"}</span>
        <span style={{
          fontSize: 11, fontWeight: 600,
          color: feedback.approved ? "#27ae60" : "#e67e22",
        }}>
          {feedback.approved ? "✓ Verified" : "⏳ Pending"}
        </span>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 14,
      padding: "20px 24px", textAlign: "center",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      border: `2px solid ${accent}22`,
    }}>
      <div style={{ fontSize: 30, fontWeight: 700, color: accent, fontFamily: "'Playfair Display', serif" }}>{value}</div>
      <div style={{ fontSize: 12, color: "#888", marginTop: 4, letterSpacing: 0.4 }}>{label}</div>
    </div>
  );
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [filter, setFilter]       = useState("All");
  const [search, setSearch]       = useState("");
  const [sortBy, setSortBy]       = useState("newest");

  useEffect(() => {
  fetch(`${API_BASE}/approved`)
    .then((r) => { if (!r.ok) throw new Error("Failed to fetch feedbacks"); return r.json(); })
    .then((data) => { setFeedbacks(data); setLoading(false); })
    .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  const categories = ["All", ...Array.from(new Set(feedbacks.map((f) => f.vendorCategory).filter(Boolean)))];

  const filtered = feedbacks
    .filter((f) => filter === "All" || f.vendorCategory === filter)
    .filter((f) => !search || f.comment?.toLowerCase().includes(search.toLowerCase()) || f.reviewerName?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest")  return a.rating - b.rating;
      return 0;
    });

  const avgRating = feedbacks.length ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1) : "—";
  const fiveStars = feedbacks.filter((f) => f.rating === 5).length;

  return (
    <div style={{ minHeight: "100vh", background: "#faf8f5", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Google Fonts */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap" />

      {/* Hero header */}
      <div style={{
        background: "linear-gradient(135deg, #2c1810 0%, #5a3020 60%, #8b4513 100%)",
        padding: "56px 24px 48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative rings */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />

        <div style={{ fontSize: 13, letterSpacing: 3, color: "#d4a96a", textTransform: "uppercase", marginBottom: 12 }}>EverGlow Wedding Planning</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(28px, 5vw, 44px)", margin: "0 0 12px", fontWeight: 700 }}>
          Customer Reviews
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, margin: 0, maxWidth: 420, marginInline: "auto" }}>
          Real experiences from couples who planned their perfect day with us
        </p>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* Stats row */}
        {!loading && !error && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, margin: "32px 0 28px" }}>
            <StatCard label="Total Reviews"   value={feedbacks.length} accent="#8b4513" />
            <StatCard label="Average Rating"  value={`${avgRating} ★`} accent="#f0b429" />
            <StatCard label="5-Star Reviews"  value={fiveStars}        accent="#27ae60" />
          </div>
        )}

        {/* Filter + Search + Sort bar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24, alignItems: "center" }}>
          {/* Category filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1 }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
                background: filter === cat ? "#8b4513" : "#f0ece8",
                color: filter === cat ? "#fff" : "#555",
                transition: "all 0.15s",
              }}>{cat}</button>
            ))}
          </div>

          {/* Search */}
          <input
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px 14px", borderRadius: 20, border: "1px solid #e0d8d0",
              fontSize: 13, outline: "none", background: "#fff", color: "#333", minWidth: 160,
            }}
          />

          {/* Sort */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{
            padding: "8px 14px", borderRadius: 20, border: "1px solid #e0d8d0",
            fontSize: 13, background: "#fff", color: "#333", cursor: "pointer", outline: "none",
          }}>
            <option value="newest">Newest first</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
        </div>

        {/* States */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa", fontSize: 15 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
            Loading reviews...
          </div>
        )}

        {error && (
          <div style={{
            background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 12,
            padding: "20px 24px", color: "#c0392b", fontSize: 14, textAlign: "center",
          }}>
            ⚠️ Could not load reviews: <strong>{error}</strong>
            <br /><span style={{ color: "#888", fontSize: 12 }}>Make sure the backend is running on port 8081</span>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#bbb" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
            No reviews found.
          </div>
        )}

        {/* Cards grid */}
        {!loading && !error && filtered.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {filtered.map((f) => <FeedbackCard key={f.id} feedback={f} />)}
          </div>
        )}

        {/* Result count */}
        {!loading && !error && filtered.length > 0 && (
          <div style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: "#bbb" }}>
            Showing {filtered.length} of {feedbacks.length} reviews
          </div>
        )}
      </div>
    </div>
  );
}
