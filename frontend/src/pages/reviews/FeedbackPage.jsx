import { useState, useEffect } from "react";

const API_BASE = "http://localhost:8081/api/feedbacks";

const CATEGORY_COLORS = {
  Photographer: { accent: "#e67e22" },
  Venue: { accent: "#3498db" },
  Caterer: { accent: "#27ae60" },
  Decorator: { accent: "#9b59b6" },
  Default: { accent: "#8b4513" },
};

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            color: s <= rating ? "#f0b429" : "#4b3a33",
            fontSize: 18,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 28,
        padding: "28px",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: 6,
        }}
      >
        {value}
      </div>

      <div
        style={{
          color: "#d89e00",
          fontSize: 14,
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function FeedbackCard({ feedback }) {
  const cat =
    CATEGORY_COLORS[feedback.vendorCategory] ||
    CATEGORY_COLORS.Default;

  const initials = feedback.reviewerName
    ? feedback.reviewerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 30,
        padding: 26,
        backdropFilter: "blur(14px)",
        transition: "0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.background =
          "rgba(255,255,255,0.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.background =
          "rgba(255,255,255,0.05)";
      }}
    >
      {/* glow */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          background: `${cat.accent}22`,
          borderRadius: "50%",
          filter: "blur(30px)",
        }}
      />

      {/* top */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${cat.accent}, #8b4513)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            marginRight: 14,
            fontSize: 15,
          }}
        >
          {initials}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {feedback.reviewerName || "Anonymous"}
          </div>

          <div
            style={{
              color: "#a38f84",
              fontSize: 12,
              marginTop: 3,
            }}
          >
            {new Date(feedback.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div
          style={{
            background: `${cat.accent}22`,
            color: "#fff",
            padding: "7px 12px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {feedback.vendorCategory}
        </div>
      </div>

      {/* stars */}
      <div style={{ marginBottom: 18 }}>
        <StarRating rating={feedback.rating} />
      </div>

      {/* review */}
      <div
        style={{
          color: "#f1e8e3",
          lineHeight: 1.9,
          fontSize: 15,
          marginBottom: 24,
          fontWeight: 400,
        }}
      >
        “{feedback.comment}”
      </div>

      {/* footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            color: "#8f7d73",
            fontSize: 12,
          }}
        >
          Booking #{feedback.bookingId || "—"}
        </div>

        <div
          style={{
            color: feedback.approved
              ? "#27ae60"
              : "#f39c12",
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          {feedback.approved
            ? "✓ Verified"
            : "Pending"}
        </div>
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/approved`)
      .then((r) => r.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    ...Array.from(
      new Set(
        feedbacks
          .map((f) => f.vendorCategory)
          .filter(Boolean)
      )
    ),
  ];

  const filtered = feedbacks.filter((f) => {
    const categoryMatch =
      filter === "All" ||
      f.vendorCategory === filter;

    const searchMatch =
      !search ||
      f.comment
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      f.reviewerName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const avgRating = feedbacks.length
    ? (
        feedbacks.reduce(
          (sum, f) => sum + f.rating,
          0
        ) / feedbacks.length
      ).toFixed(1)
    : "0";

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #4a2b20 0%, #1a120f 45%, #120d0b 100%)",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />

      {/* HERO */}
      <div
        style={{
          padding: "90px 24px 50px",
          textAlign: "center",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            color: "#d4a96a",
            fontSize: 13,
            letterSpacing: 3,
            marginBottom: 18,
            textTransform: "uppercase",
          }}
        >
          EverGlow Wedding Planning
        </div>

        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 76px)",
            marginBottom: 20,
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          Client Reviews
        </h1>

        <p
          style={{
            color: "#bba79b",
            maxWidth: 650,
            margin: "0 auto",
            fontSize: 17,
            lineHeight: 1.8,
          }}
        >
          Discover real experiences from couples who trusted
          EverGlow to craft unforgettable wedding moments.
        </p>
      </div>

      {/* CONTENT */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px 70px",
        }}
      >
        {/* stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
            marginBottom: 34,
          }}
        >
          <StatCard
            value={feedbacks.length}
            label="Total Reviews"
          />

          <StatCard
            value={`${avgRating} ★`}
            label="Average Rating"
          />

          <StatCard
            value={
              feedbacks.filter((f) => f.rating === 5)
                .length
            }
            label="5 Star Reviews"
          />
        </div>

        {/* toolbar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            marginBottom: 34,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: 18,
            borderRadius: 26,
            backdropFilter: "blur(14px)",
          }}
        >
          {/* category buttons */}
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              flex: 1,
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  border: "none",
                  cursor: "pointer",
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontWeight: 600,
                  background:
                    filter === cat
                      ? "linear-gradient(135deg,#8b4513,#c27a3d)"
                      : "rgba(255,255,255,0.05)",
                  color:
                    filter === cat
                      ? "#fff"
                      : "#c9b8ad",
                  transition: "0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* search */}
          <input
            placeholder="Search reviews..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#fff",
              padding: "12px 16px",
              borderRadius: 16,
              outline: "none",
              minWidth: 220,
            }}
          />
        </div>

        {/* cards */}
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "100px 0",
              color: "#bda99d",
            }}
          >
            Loading reviews...
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(320px,1fr))",
              gap: 28,
            }}
          >
            {filtered.map((f) => (
              <FeedbackCard key={f.id} feedback={f} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}