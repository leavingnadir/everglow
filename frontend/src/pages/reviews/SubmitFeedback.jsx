import { useState } from "react";
import { createFeedback } from "../../api/feedbackApi";

export default function SubmitFeedback() {
  const [form, setForm] = useState({
    userId: "",
    vendorId: "",
    rating: 5,
    comment: "",
    reviewerName: "",
    vendorCategory: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createFeedback(form);
    alert("Review submitted!");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F9EAE8",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#fff",
          padding: "30px",
          border: "1px solid #EDE0DF",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
        }}
      >
        <h2 style={{
          fontFamily: "var(--font-brand)",
          marginBottom: "20px",
          color: "#C0392B"
        }}>
          Leave Your Feedback
        </h2>

        {[
          { key: "userId", placeholder: "User ID" },
          { key: "vendorId", placeholder: "Vendor ID" },
          { key: "reviewerName", placeholder: "Your Name" },
          { key: "vendorCategory", placeholder: "Vendor Category" }
        ].map((field) => (
          <input
            key={field.key}
            placeholder={field.placeholder}
            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              border: "1px solid #ddd",
              outline: "none"
            }}
          />
        ))}

        <textarea
          placeholder="Write your review..."
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            minHeight: "100px"
          }}
        />

        <select
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ddd"
          }}
        >
          <option value="5">★★★★★ (5)</option>
          <option value="4">★★★★ (4)</option>
          <option value="3">★★★ (3)</option>
          <option value="2">★★ (2)</option>
          <option value="1">★ (1)</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#C0392B",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.1em",
            textTransform: "uppercase"
          }}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}