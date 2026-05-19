import StarRating from "./StarRating";

const CAT_ACCENT = {
  Photography: "#C0392B",
  Photographer: "#C0392B",
  Venue: "#2563EB",
  Catering: "#059669",
  Caterer: "#059669",
  Decoration: "#7C3AED",
  Decorator: "#7C3AED",
  Music: "#0891B2",
  Makeup: "#DB2777",
};

function getAccent(cat) {
  return CAT_ACCENT[cat] || "#C9A84C";
}

function formatDate(str) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export default function FeedbackCard({ feedback }) {
  const accent = getAccent(feedback.vendorCategory);
  const initials = (feedback.reviewerName || "A")
    .split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #EDE0DF",
        borderRadius: 2,
        padding: "22px 24px",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 28px rgba(192,57,43,0.09)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* Avatar + name + badge */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
          background: `${accent}18`, border: `1.5px solid ${accent}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-brand)", fontSize: 14, fontStyle: "italic", color: accent,
        }}>
          {initials}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 5 }}>
            <p style={{ fontFamily: "var(--font-brand)", fontSize: 15, fontStyle: "italic", color: "#2C2C2C", margin: 0 }}>
              {feedback.reviewerName || "Anonymous"}
            </p>
            {feedback.vendorCategory && (
              <span style={{
                fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.16em",
                textTransform: "uppercase", color: accent,
                background: `${accent}12`, border: `1px solid ${accent}28`,
                padding: "3px 8px", borderRadius: 2, whiteSpace: "nowrap",
              }}>
                {feedback.vendorCategory}
              </span>
            )}
          </div>
          <StarRating rating={feedback.rating} size={14} />
        </div>
      </div>

      {/* Comment */}
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 13,
        color: "rgba(44,44,44,0.75)", lineHeight: 1.7,
        margin: "0 0 14px", borderLeft: `2px solid ${accent}40`, paddingLeft: 12,
      }}>
        "{feedback.comment}"
      </p>

      {/* Date */}
      <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#bbb", margin: 0 }}>
        {formatDate(feedback.createdAt)}
      </p>
    </div>
  );
}
