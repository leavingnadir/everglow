import { useEffect, useState } from "react";
import {
  getAllFeedbacks,
  deleteFeedback,
  approveFeedback
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
    <div style={{
      minHeight: "100vh",
      background: "#F7F7F8",
      padding: "50px 20px",
      fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
    }}>

      {/* Header */}
      <div style={{
        maxWidth: "900px",
        margin: "0 auto 30px auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "end"
      }}>
        <div>
          <h1 style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: 600,
            letterSpacing: "-0.5px",
            color: "#111827"
          }}>
            Feedback
          </h1>
          <p style={{
            margin: "6px 0 0",
            fontSize: "13px",
            color: "#6B7280"
          }}>
            Manage and review user submissions
          </p>
        </div>

        <div style={{
          fontSize: "11px",
          padding: "6px 12px",
          borderRadius: "999px",
          border: "1px solid #E5E7EB",
          color: "#374151",
          background: "#fff"
        }}>
          Admin Panel
        </div>
      </div>

      {/* Cards */}
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        display: "grid",
        gap: "14px"
      }}>
        {data.map((f) => (
          <div
            key={f.id}
            style={{
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "14px",
              padding: "18px 20px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#D1D5DB";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E5E7EB";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >

            {/* Top row */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px"
            }}>
              <span style={{
                fontSize: "11px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: f.approved ? "#065F46" : "#92400E",
                background: f.approved ? "#ECFDF5" : "#FFFBEB",
                padding: "4px 10px",
                borderRadius: "999px",
                border: "1px solid #E5E7EB"
              }}>
                {f.approved ? "Approved" : "Pending"}
              </span>

              <span style={{
                fontSize: "11px",
                color: "#9CA3AF"
              }}>
                #{f.id}
              </span>
            </div>

            {/* Comment */}
            <p style={{
              margin: 0,
              fontSize: "14px",
              lineHeight: "1.6",
              color: "#111827"
            }}>
              {f.comment}
            </p>

            {/* Actions */}
            <div style={{
              display: "flex",
              gap: "10px",
              marginTop: "14px"
            }}>

              {!f.approved && (
                <button
                  onClick={() => handleApprove(f.id)}
                  style={{
                    fontSize: "12px",
                    padding: "7px 12px",
                    borderRadius: "10px",
                    border: "1px solid #E5E7EB",
                    background: "#111827",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                >
                  Approve
                </button>
              )}

              <button
                onClick={() => handleDelete(f.id)}
                style={{
                  fontSize: "12px",
                  padding: "7px 12px",
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  background: "#fff",
                  color: "#111827",
                  cursor: "pointer"
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