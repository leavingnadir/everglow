import { useState, useEffect } from "react";

const API_BASE = "http://localhost:8081/api/feedbacks";

/* NEW MODERN LUXURY PALETTE */
const CATEGORY_COLORS = {
  Photographer: { bg: "#fff7ed", accent: "#f59e0b", text: "#92400e" },
  Venue:        { bg: "#eff6ff", accent: "#3b82f6", text: "#1e3a8a" },
  Caterer:      { bg: "#ecfdf5", accent: "#10b981", text: "#065f46" },
  Decorator:    { bg: "#f5f3ff", accent: "#8b5cf6", text: "#4c1d95" },
  Default:      { bg: "#f9fafb", accent: "#6b7280", text: "#111827" },
};

function StarRating({ rating, size = 18 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={s <= rating ? "#f59e0b" : "none"}
          stroke={s <= rating ? "#f59e0b" : "#d1d5db"}
          strokeWidth="1.5"
        >
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
    ? new Date(feedback.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        border: "1px solid #eef2f7",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition: "transform 0.18s, box-shadow 0.18s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: cat.accent,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          {initials}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>
            {feedback.reviewerName || "Anonymous"}
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>{date}</div>
        </div>

        <span
          style={{
            background: cat.bg,
            color: cat.text,
            borderRadius: 20,
            padding: "3px 10px",
            fontSize: 11,
            fontWeight: 600,
            border: `1px solid ${cat.accent}30`,
          }}
        >
          {feedback.vendorCategory}
        </span>
      </div>

      <StarRating rating={feedback.rating} />

      <p
        style={{
          fontSize: 14,
          color: "#374151",
          lineHeight: 1.65,
          margin: 0,
          borderLeft: `3px solid ${cat.accent}`,
          paddingLeft: 12,
        }}
      >
        "{feedback.comment}"
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <span style={{ fontSize: 11, color: "#9ca3af" }}>
          Booking #{feedback.bookingId || "—"}
        </span>

        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: feedback.approved ? "#10b981" : "#f59e0b",
          }}
        >
          {feedback.approved ? "✓ Verified" : "⏳ Pending"}
        </span>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 14,
        padding: "20px 24px",
        textAlign: "center",
        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
        border: `1px solid ${accent}30`,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: accent,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetch(`${API_BASE}/approved`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch feedbacks");
        return r.json();
      })
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(feedbacks.map((f) => f.vendorCategory).filter(Boolean))),
  ];

  const filtered = feedbacks
    .filter((f) => filter === "All" || f.vendorCategory === filter)
    .filter(
      (f) =>
        !search ||
        f.comment?.toLowerCase().includes(search.toLowerCase()) ||
        f.reviewerName?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      return 0;
    });

  const avgRating = feedbacks.length
    ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)
    : "—";

  const fiveStars = feedbacks.filter((f) => f.rating === 5).length;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "DM Sans, sans-serif" }}>
      {/* HEADER (unchanged structure, only lighter tone) */}
      <div style={{ background: "#ffffff", padding: 40, textAlign: "center", borderBottom: "1px solid #eee" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "#f59e0b" }}>
          EverGlow Wedding Planning
        </div>
        <h1 style={{ fontSize: 36, color: "#111827", marginTop: 10 }}>
          Customer Reviews
        </h1>
        <p style={{ color: "#6b7280" }}>
          Real experiences from couples who planned with us
        </p>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px 60px" }}>
        {/* stats */}
        {!loading && !error && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, margin: "30px 0" }}>
            <StatCard label="Total" value={feedbacks.length} accent="#f59e0b" />
            <StatCard label="Avg Rating" value={`${avgRating} ★`} accent="#3b82f6" />
            <StatCard label="5 Stars" value={fiveStars} accent="#10b981" />
          </div>
        )}

        {/* filters */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: "7px 14px",
                borderRadius: 20,
                border: "1px solid #e5e7eb",
                background: filter === cat ? "#111827" : "#fff",
                color: filter === cat ? "#fff" : "#111827",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "7px 12px",
              borderRadius: 20,
              border: "1px solid #e5e7eb",
            }}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "7px 12px",
              borderRadius: 20,
              border: "1px solid #e5e7eb",
            }}
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        </div>

        {/* cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: 20,
          }}
        >
          {filtered.map((f) => (
            <FeedbackCard key={f.id} feedback={f} />
          ))}
        </div>
      </div>
    </div>
  );
}