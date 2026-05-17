import { useEffect, useState } from "react";
import {
  getAllFeedbacks,
  deleteFeedback,
  approveFeedback,
} from "../../api/feedbackApi";

export default function AdminFeedbackPage() {
  const [data, setData] = useState([]);

  const load = () => {
    getAllFeedbacks().then(setData);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteFeedback(id);
    load();
  };

  const handleApprove = async (id) => {
    await approveFeedback(id);
    load();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8f9fb 0%, #eef1f5 100%)",
        fontFamily:
          "Inter, system-ui, -apple-system, sans-serif",
        padding: "50px 20px",
        color: "#1f2937",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto 40px",
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#6b7280",
            marginBottom: 10,
          }}
        >
          EverGlow Admin
        </div>

        <h1
          style={{
            fontSize: "40px",
            margin: 0,
            fontWeight: 700,
          }}
        >
          Feedback Management
        </h1>

        <p
          style={{
            marginTop: 10,
            color: "#6b7280",
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          Review and manage customer feedback with a clean approval workflow.
        </p>
      </div>

      {/* GRID */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gap: 16,
        }}
      >
        {data.map((f) => (
          <div
            key={f.id}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 18,
              padding: 22,
              boxShadow:
                "0 6px 18px rgba(15, 23, 42, 0.05)",
              transition: "0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(15, 23, 42, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 6px 18px rgba(15, 23, 42, 0.05)";
            }}
          >
            {/* TOP */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  letterSpacing: 1.5,
                }}
              >
                FEEDBACK #{f.id}
              </div>

              <span
                style={{
                  fontSize: 12,
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: f.approved
                    ? "#ecfdf5"
                    : "#fff7ed",
                  color: f.approved
                    ? "#059669"
                    : "#d97706",
                  border: "1px solid #e5e7eb",
                  fontWeight: 600,
                }}
              >
                {f.approved
                  ? "Approved"
                  : "Pending"}
              </span>
            </div>

            {/* COMMENT */}
            <p
              style={{
                fontSize: 15,
                color: "#374151",
                lineHeight: 1.7,
                marginBottom: 18,
              }}
            >
              “{f.comment}”
            </p>

            {/* ACTIONS */}
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {!f.approved && (
                <button
                  onClick={() =>
                    handleApprove(f.id)
                  }
                  style={{
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding:
                      "10px 14px",
                    borderRadius: 10,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Approve
                </button>
              )}

              <button
                onClick={() =>
                  handleDelete(f.id)
                }
                style={{
                  background: "#f3f4f6",
                  color: "#111827",
                  border: "1px solid #e5e7eb",
                  padding:
                    "10px 14px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}