import { useState } from "react";
import { createFeedback } from "../../api/feedbackApi";

export default function SubmitFeedback() {
  const [form, setForm] = useState({
    userId: "",
    vendorId: "",
    rating: 5,
    comment: "",
    reviewerName: "",
    vendorCategory: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createFeedback(form);

      alert("Review submitted!");

      setForm({
        userId: "",
        vendorId: "",
        rating: 5,
        comment: "",
        reviewerName: "",
        vendorCategory: "",
      });
    } catch (err) {
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    fontSize: "14px",
    outline: "none",
    transition: "0.2s ease",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        fontFamily:
          "Inter, system-ui, -apple-system, sans-serif",
        color: "#1f2937",
      }}
    >
      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 600,
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "20px",
          padding: "34px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: 26 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: 10,
            }}
          >
            EverGlow Reviews
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 30,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Leave Your Feedback
          </h1>

          <p
            style={{
              marginTop: 10,
              color: "#6b7280",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Share your experience to help others choose the right wedding vendors.
          </p>
        </div>

        {/* FIELDS */}
        <div
          style={{
            display: "grid",
            gap: 12,
          }}
        >
          <input
            value={form.userId}
            placeholder="User ID"
            onChange={(e) =>
              setForm({ ...form, userId: e.target.value })
            }
            style={inputStyle}
          />

          <input
            value={form.vendorId}
            placeholder="Vendor ID"
            onChange={(e) =>
              setForm({ ...form, vendorId: e.target.value })
            }
            style={inputStyle}
          />

          <input
            value={form.reviewerName}
            placeholder="Your Name"
            onChange={(e) =>
              setForm({ ...form, reviewerName: e.target.value })
            }
            style={inputStyle}
          />

          <input
            value={form.vendorCategory}
            placeholder="Vendor Category"
            onChange={(e) =>
              setForm({ ...form, vendorCategory: e.target.value })
            }
            style={inputStyle}
          />

          {/* COMMENT */}
          <textarea
            value={form.comment}
            placeholder="Write your review..."
            onChange={(e) =>
              setForm({ ...form, comment: e.target.value })
            }
            style={{
              ...inputStyle,
              minHeight: 120,
              resize: "none",
            }}
          />

          {/* RATING */}
          <select
            value={form.rating}
            onChange={(e) =>
              setForm({
                ...form,
                rating: Number(e.target.value),
              })
            }
            style={inputStyle}
          >
            <option value="5">★★★★★ Excellent</option>
            <option value="4">★★★★ Very Good</option>
            <option value="3">★★★ Good</option>
            <option value="2">★★ Fair</option>
            <option value="1">★ Poor</option>
          </select>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 10,
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              border: "none",
              background: loading
                ? "#9ca3af"
                : "#2563eb",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
              transition: "0.2s",
            }}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}