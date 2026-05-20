import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApprovedFeedbacks } from "../../api/feedbackApi";
import FeedbackCard from "../../components/FeedbackCard";
import { useAuth } from "../../context/AuthContext";

const CATEGORIES = ["All", "Photography", "Venue", "Catering", "Decoration", "Music", "Makeup"];

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getApprovedFeedbacks()
      .then(setFeedbacks)
      .catch(() => setError("Could not load reviews. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = feedbacks
    .filter((f) => filter === "All" || f.vendorCategory === filter)
    .filter((f) =>
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
    : "–";

  const fiveStars = feedbacks.filter((f) => f.rating === 5).length;

  return (
    <div style={{ minHeight: "100vh", background: "#F9EAE8", padding: "48px 16px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 36 }}>
          <div>
            <p style={s.kicker}>Client Reviews</p>
            <h1 style={s.title}>What Couples Say</h1>
            <p style={s.subtitle}>Genuine experiences from real weddings</p>
          </div>

          {isLoggedIn ? (
            <button style={s.primaryBtn}
              onClick={() => navigate("/reviews/submit")}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#E74C3C")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#C0392B")}
            >
              + Write a Review
            </button>
          ) : (
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#bbb", marginBottom: 8 }}>
                Want to share your experience?
              </p>
              <button
                style={{ ...s.primaryBtn, background: "transparent", color: "#C0392B", border: "1.5px solid #C0392B" }}
                onClick={() => navigate("/login")}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#C0392B"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C0392B"; }}
              >
                Sign In to Review
              </button>
            </div>
          )}
        </div>

        {/* ── Stats ── */}
        {!loading && !error && feedbacks.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 32 }}>
            {[
              { label: "Total Reviews", value: feedbacks.length },
              { label: "Average Rating", value: `${avgRating} ★` },
              { label: "5-Star Reviews", value: fiveStars },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "#fff", border: "1px solid #EDE0DF", borderRadius: 2, padding: "16px 20px", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-brand)", fontStyle: "italic", fontSize: 26, color: "#C9A84C", margin: "0 0 4px" }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#bbb", margin: 0 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Filters ── */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 28 }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.16em",
              textTransform: "uppercase", padding: "8px 14px", borderRadius: 2,
              border: filter === cat ? "1.5px solid #C0392B" : "1.5px solid #DDD6CE",
              background: filter === cat ? "#C0392B" : "transparent",
              color: filter === cat ? "#fff" : "#999", cursor: "pointer", transition: "all 0.15s",
            }}>
              {cat}
            </button>
          ))}

          <input
            placeholder="Search reviews…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              fontFamily: "var(--font-body)", fontSize: 12, color: "#2C2C2C",
              border: "1.5px solid #DDD6CE", background: "#fff", borderRadius: 2,
              padding: "8px 14px", outline: "none", marginLeft: "auto",
            }}
          />

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{
            fontFamily: "var(--font-body)", fontSize: 12, color: "#999",
            border: "1.5px solid #DDD6CE", background: "#fff", borderRadius: 2,
            padding: "8px 10px", outline: "none", cursor: "pointer",
          }}>
            <option value="newest">Newest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        {/* ── Content ── */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={s.subtitle}>Loading reviews…</p>
          </div>
        )}

        {error && (
          <p style={{ fontFamily: "var(--font-body)", color: "#C0392B", fontSize: 13 }}>{error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontFamily: "var(--font-brand)", fontStyle: "italic", fontSize: 22, color: "#C9A84C", marginBottom: 8 }}>
              No reviews found
            </p>
            <p style={s.subtitle}>
              {isLoggedIn ? "Be the first to share your experience." : "Sign in to write the first review."}
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {filtered.map((f) => <FeedbackCard key={f.id} feedback={f} />)}
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  kicker: {
    fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.25em",
    textTransform: "uppercase", color: "#C9A84C", margin: "0 0 6px",
  },
  title: {
    fontFamily: "var(--font-brand)", fontSize: "clamp(28px, 3vw, 40px)",
    fontWeight: 300, fontStyle: "italic", color: "#2C2C2C", margin: 0,
  },
  subtitle: { fontFamily: "var(--font-body)", fontSize: 13, color: "#999", marginTop: 8 },
  primaryBtn: {
    fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.18em",
    textTransform: "uppercase", background: "#C0392B", color: "#fff",
    border: "none", padding: "12px 24px", cursor: "pointer", borderRadius: 2,
    transition: "all 0.15s",
  },
};
