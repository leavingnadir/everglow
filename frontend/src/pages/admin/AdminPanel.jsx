import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SECTIONS = [
  {
    key: "users",
    title: "User Management",
    description: "View, create, edit and disable user accounts. Manage roles and permissions.",
    icon: "👤",
    route: "/admin/users",
  },
  {
    key: "vendors",
    title: "Vendor Management",
    description: "Manage vendor partners — photographers, caterers, decorators and more.",
    icon: "🏢",
    route: "/admin/vendors",
  },
  {
    key: "payments",
    title: "Payment Management",
    description: "Track transactions, refunds and revenue. Review payment history by user.",
    icon: "💳",
    route: "/payments",
  },
  {
    key: "packages",
    title: "Package Management",
    description: "Create and update packages. Control pricing, availability and details.",
    icon: "📦",
    route: "/admin/packages",
  },
  {
  key: "bookings",
  title: "Booking Management",
  description: "Review all bookings, change statuses and delete entries.",
  icon: "📅",
  route: "/admin/bookings",
  },
];

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Heading */}
        <div style={{ marginBottom: 28 }}>
          <p style={styles.kicker}>Admin Panel</p>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>
            Welcome, <span style={{ color: "#2C2C2C" }}>{user?.name || "Admin"}</span>. Select a section to manage.
          </p>
        </div>

        {/* Cards */}
        <div style={styles.grid}>
          {SECTIONS.map((s) => {
            const active = hovered === s.key;
            return (
              <div
                key={s.key}
                style={{
                  ...styles.card,
                  ...(active ? styles.cardHovered : null),
                }}
                onMouseEnter={() => setHovered(s.key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(s.route)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(s.route)}
              >
                <div style={styles.iconRow}>
                  <div style={styles.iconBubble}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={styles.cardKicker}>Manage</p>
                    <h2 style={styles.cardTitle}>{s.title}</h2>
                  </div>
                </div>

                <p style={styles.cardDesc}>{s.description}</p>

                <div style={styles.ctaRow}>
                  <button
                    type="button"
                    style={styles.ctaBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(s.route);
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#E74C3C")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#C0392B")}
                  >
                    Open
                  </button>

                  <span style={styles.ctaHint}>Go to {s.route}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F9EAE8",
    padding: "40px 16px",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  kicker: {
    fontFamily: "var(--font-body)",
    fontSize: 10,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#C9A84C",
    margin: "0 0 6px",
  },
  title: {
    fontFamily: "var(--font-brand)",
    fontSize: "clamp(28px, 3vw, 40px)",
    fontWeight: 300,
    fontStyle: "italic",
    color: "#2C2C2C",
    margin: 0,
  },
  subtitle: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    color: "#999",
    marginTop: 10,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#fff",
    border: "1px solid #EDE0DF",
    borderRadius: 2,
    padding: "22px 22px",
    cursor: "pointer",
    transition: "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
  },
  cardHovered: {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 34px rgba(192,57,43,0.10)",
    borderColor: "rgba(192,57,43,0.25)",
  },
  iconRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 2,
    background: "#FEF2F2",
    border: "1px solid #FECACA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  cardKicker: {
    fontFamily: "var(--font-body)",
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#C9A84C",
    margin: 0,
  },
  cardTitle: {
    fontFamily: "var(--font-brand)",
    fontSize: 18,
    fontWeight: 300,
    fontStyle: "italic",
    color: "#2C2C2C",
    margin: 0,
  },
  cardDesc: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    color: "rgba(44,44,44,0.65)",
    lineHeight: 1.6,
    margin: "0 0 18px",
  },
  ctaRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
  },
  ctaBtn: {
    padding: "10px 18px",
    background: "#C0392B",
    color: "#fff",
    border: "none",
    borderRadius: 2,
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  },
  ctaHint: {
    fontFamily: "var(--font-body)",
    fontSize: 12,
    color: "#999",
    whiteSpace: "nowrap",
  },
};