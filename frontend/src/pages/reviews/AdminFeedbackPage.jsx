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
      background: "#F9EAE8",
      padding: "40px"
    }}>
      <h2 style={{
        fontFamily: "var(--font-brand)",
        color: "#C0392B",
        marginBottom: "20px"
      }}>
        Feedback Management
      </h2>

      <div style={{
        display: "grid",
        gap: "15px",
        maxWidth: "900px"
      }}>
        {data.map((f) => (
          <div
            key={f.id}
            style={{
              background: "#fff",
              border: "1px solid #EDE0DF",
              padding: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <p style={{ fontSize: "14px", color: "#2C2C2C" }}>
              {f.comment}
            </p>

            <div style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}>
              <button
                onClick={() => handleApprove(f.id)}
                style={{
                  background: "#C0392B",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontSize: "12px",
                  textTransform: "uppercase"
                }}
              >
                Approve
              </button>

              <button
                onClick={() => handleDelete(f.id)}
                style={{
                  background: "#2C2C2C",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontSize: "12px",
                  textTransform: "uppercase"
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