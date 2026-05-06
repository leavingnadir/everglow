// src/pages/users/AdminUsersPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getAllUsers, deleteUser, deactivateUser, updateUser,
} from "../../services/userService";

export default function AdminUsersPage() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const [users,      setUsers]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState("");
  const [search,     setSearch]     = useState("");

  // Edit modal state
  const [editUser,    setEditUser]    = useState(null);
  const [editForm,    setEditForm]    = useState({});
  const [editLoading, setEditLoading] = useState(false);

  // Confirm delete
  const [confirmDelete, setConfirmDelete] = useState(null);

  // ─── Guard: admin only ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!user)    { navigate("/login");        return; }
    if (!isAdmin) { navigate("/user/profile"); return; }
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ─── Delete ─────────────────────────────────────────────────────────────────
  async function handleDelete(id) {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      setSuccess("User deleted.");
      setConfirmDelete(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) { setError(err.message); }
  }

  // ─── Deactivate ─────────────────────────────────────────────────────────────
  async function handleDeactivate(id) {
    try {
      const updated = await deactivateUser(id);
      setUsers(prev => prev.map(u => u.id === id ? updated : u));
      setSuccess("User deactivated.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) { setError(err.message); }
  }

  // ─── Edit save ──────────────────────────────────────────────────────────────
  async function handleEditSave(e) {
    e.preventDefault();
    setEditLoading(true);
    setError("");
    try {
      const updated = await updateUser(editUser.id, {
        name:        editForm.name,
        email:       editForm.email,
        phoneNumber: editForm.phoneNumber,
        role:        editForm.role,
        active:      editForm.active,
        password:    editForm.password || undefined,
      });
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
      setEditUser(null);
      setSuccess("User updated.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) { setError(err.message); }
    finally { setEditLoading(false); }
  }

  function openEdit(u) {
    setEditUser(u);
    setEditForm({
      name:        u.name,
      email:       u.email,
      phoneNumber: u.phoneNumber || "",
      role:        u.role,
      active:      u.active,
      password:    "",
    });
    setError("");
  }

  // ─── Search filter ──────────────────────────────────────────────────────────
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())  ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total:  users.length,
    active: users.filter(u => u.active).length,
    admins: users.filter(u => u.role === "ADMIN").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F9EAE8" }}>

      {/* ── Admin Top Bar ─────────────────────────────────────────────────── */}
      <div style={{
        background: "#2C2C2C", padding: "14px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        {/* Left — logo + label */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src="/everglow_1.png" alt="Everglow"
            style={{ height: "16px", filter: "brightness(0) invert(1)" }}
          />
          <span style={{
            fontFamily: "var(--font-body)", fontSize: "10px",
            letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C",
          }}>
            Admin Panel — User Management
          </span>
        </div>

        {/* Right — back button + username + sign out */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

          {/* ✅ Back to Admin Panel */}
          <button
            onClick={() => navigate("/admin")}
            style={{
              background: "none",
              border: "1px solid rgba(201,168,76,0.5)",
              color: "#C9A84C",
              padding: "6px 16px",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              cursor: "pointer",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#C9A84C"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"}
          >
            ← Admin Panel
          </button>

          <span style={{
            fontFamily: "var(--font-body)", fontSize: "12px",
            color: "rgba(255,255,255,0.6)",
          }}>
            {user?.name}
          </span>

          <button
            onClick={() => { logout(); navigate("/login"); }}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)",
              padding: "6px 16px",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              cursor: "pointer",
              letterSpacing: "0.1em",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Page content ──────────────────────────────────────────────────── */}
      <div style={{ padding: "40px 32px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Page title */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "10px",
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#C9A84C", marginBottom: "6px",
          }}>
            User Management
          </p>
          <h1 style={{
            fontFamily: "var(--font-brand)", fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 300, fontStyle: "italic", color: "#2C2C2C", margin: 0,
          }}>
            All Members
          </h1>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px", marginBottom: "32px",
        }}>
          {[
            { label: "Total Users", value: stats.total,  accent: "#2C2C2C" },
            { label: "Active",      value: stats.active, accent: "#16A34A" },
            { label: "Admins",      value: stats.admins, accent: "#C0392B" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "#fff", border: "1px solid #EDE0DF",
              padding: "20px 24px", borderTop: `3px solid ${s.accent}`,
            }}>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "10px",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#999", margin: "0 0 8px",
              }}>
                {s.label}
              </p>
              <p style={{
                fontFamily: "var(--font-brand)", fontSize: "32px",
                fontWeight: 300, color: s.accent, margin: 0,
              }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Alerts */}
        {success && (
          <div style={alertStyle("#D1FAE5", "#065F46")}>{success}</div>
        )}
        {error && (
          <div style={alertStyle("#FEF2F2", "#C0392B")}>
            {error}
            <button
              onClick={() => setError("")}
              style={{
                marginLeft: "12px", background: "none",
                border: "none", cursor: "pointer", color: "#C0392B",
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Search */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "20px",
        }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email or role…"
            style={{
              padding: "10px 16px", border: "1px solid #EDE0DF",
              borderRadius: "2px", fontFamily: "var(--font-body)",
              fontSize: "13px", width: "300px", background: "#fff", outline: "none",
            }}
          />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#999" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{
            textAlign: "center", padding: "60px",
            color: "#999", fontFamily: "var(--font-body)",
          }}>
            Loading users…
          </div>
        ) : (
          <div style={{
            background: "#fff", border: "1px solid #EDE0DF",
            borderRadius: "2px", overflow: "hidden",
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #EDE0DF", background: "#F9EAE8" }}>
                  {["#", "Name", "Email", "Phone", "Role", "Status", "Joined", "Actions"].map(h => (
                    <th key={h} style={{
                      padding: "12px 16px", textAlign: "left",
                      fontFamily: "var(--font-body)", fontSize: "10px",
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: "#888", fontWeight: 600,
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr
                    key={u.id}
                    style={{ borderBottom: "1px solid #F5EDEC", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#FDF6F5"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                  >
                    <td style={td}>{i + 1}</td>
                    <td style={{ ...td, fontWeight: 500 }}>{u.name}</td>
                    <td style={{ ...td, color: "#666" }}>{u.email}</td>
                    <td style={{ ...td, color: "#666" }}>{u.phoneNumber || "—"}</td>
                    <td style={td}>
                      <span style={{
                        padding: "3px 10px", fontSize: "10px",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        fontFamily: "var(--font-body)",
                        background: u.role === "ADMIN" ? "#FEF2F2" : "#FEF9EC",
                        color:      u.role === "ADMIN" ? "#C0392B" : "#92400E",
                        borderRadius: "2px",
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={td}>
                      <span style={{
                        padding: "3px 10px", fontSize: "10px",
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        fontFamily: "var(--font-body)",
                        background: u.active ? "#ECFDF5" : "#F3F4F6",
                        color:      u.active ? "#065F46" : "#6B7280",
                        borderRadius: "2px",
                      }}>
                        {u.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ ...td, color: "#999", fontSize: "12px" }}>
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString("en-GB")
                        : "—"}
                    </td>
                    <td style={{ ...td, whiteSpace: "nowrap" }}>
                      <button onClick={() => openEdit(u)} style={actionBtn("#2C2C2C")}>
                        Edit
                      </button>
                      {u.active && u.id !== user.id && (
                        <button onClick={() => handleDeactivate(u.id)} style={actionBtn("#C9A84C")}>
                          Deactivate
                        </button>
                      )}
                      {u.id !== user.id && (
                        <button onClick={() => setConfirmDelete(u)} style={actionBtn("#C0392B")}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div style={{
                textAlign: "center", padding: "48px",
                color: "#bbb", fontFamily: "var(--font-body)", fontSize: "14px",
              }}>
                No users found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── Edit Modal ──────────────────────────────────────────────────────── */}
      {editUser && (
        <Modal title={`Edit — ${editUser.name}`} onClose={() => setEditUser(null)}>
          <form onSubmit={handleEditSave} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <ModalField label="Full Name">
              <input
                name="name" value={editForm.name} required style={modalInput}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
              />
            </ModalField>
            <ModalField label="Email">
              <input
                name="email" type="email" value={editForm.email} required style={modalInput}
                onChange={e => setEditForm({ ...editForm, email: e.target.value })}
              />
            </ModalField>
            <ModalField label="Phone">
              <input
                value={editForm.phoneNumber} style={modalInput}
                onChange={e => setEditForm({ ...editForm, phoneNumber: e.target.value })}
              />
            </ModalField>
            <ModalField label="Role">
              <select
                value={editForm.role} style={modalInput}
                onChange={e => setEditForm({ ...editForm, role: e.target.value })}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </ModalField>
            <ModalField label="Status">
              <select
                value={editForm.active} style={modalInput}
                onChange={e => setEditForm({ ...editForm, active: e.target.value === "true" })}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </ModalField>
            <ModalField label="New Password (optional)">
              <input
                type="password" value={editForm.password}
                placeholder="Leave blank to keep current" style={modalInput}
                onChange={e => setEditForm({ ...editForm, password: e.target.value })}
              />
            </ModalField>
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button type="submit" disabled={editLoading} style={primaryBtn}>
                {editLoading ? "Saving…" : "Save Changes"}
              </button>
              <button type="button" onClick={() => setEditUser(null)} style={ghostBtn}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ─── Delete Confirm Modal ────────────────────────────────────────────── */}
      {confirmDelete && (
        <Modal title="Confirm Delete" onClose={() => setConfirmDelete(null)}>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "14px",
            color: "#444", marginBottom: "24px",
          }}>
            Are you sure you want to permanently delete{" "}
            <strong>{confirmDelete.name}</strong>? This action cannot be undone.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => handleDelete(confirmDelete.id)}
              style={{ ...primaryBtn, background: "#C0392B" }}
            >
              Yes, Delete
            </button>
            <button onClick={() => setConfirmDelete(null)} style={ghostBtn}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Modal wrapper ─────────────────────────────────────────────────────────────

function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 999, padding: "16px",
    }}>
      <div style={{
        background: "#fff", width: "100%", maxWidth: "480px",
        padding: "36px", borderRadius: "2px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.15)", position: "relative",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "20px",
            background: "none", border: "none", fontSize: "20px",
            cursor: "pointer", color: "#999",
          }}
        >
          ✕
        </button>
        <h2 style={{
          fontFamily: "var(--font-body)", fontSize: "13px",
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: "#2C2C2C", marginBottom: "24px",
        }}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

function ModalField({ label, children }) {
  return (
    <div>
      <label style={{
        display: "block", fontFamily: "var(--font-body)", fontSize: "10px",
        letterSpacing: "0.15em", textTransform: "uppercase",
        color: "#888", marginBottom: "5px",
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const td = {
  padding: "13px 16px", fontFamily: "var(--font-body)",
  fontSize: "13px", color: "#2C2C2C",
};

const actionBtn = (color) => ({
  marginRight: "6px", padding: "5px 12px", background: "none",
  border: `1px solid ${color}`, color, borderRadius: "2px",
  fontFamily: "var(--font-body)", fontSize: "10px",
  letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
});

const primaryBtn = {
  padding: "11px 28px", background: "#C0392B", color: "#fff",
  border: "none", borderRadius: "2px", fontFamily: "var(--font-body)",
  fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
  cursor: "pointer", fontWeight: 500,
};

const ghostBtn = {
  padding: "10px 20px", background: "transparent", color: "#2C2C2C",
  border: "1px solid #EDE0DF", borderRadius: "2px",
  fontFamily: "var(--font-body)", fontSize: "11px",
  letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
};

const modalInput = {
  width: "100%", padding: "10px 13px", border: "1px solid #EDE0DF",
  borderRadius: "2px", fontFamily: "var(--font-body)", fontSize: "13px",
  color: "#2C2C2C", outline: "none", boxSizing: "border-box",
};

const alertStyle = (bg, color) => ({
  padding: "12px 16px", borderRadius: "2px", marginBottom: "16px",
  background: bg, color, fontFamily: "var(--font-body)", fontSize: "13px",
  display: "flex", alignItems: "center",
});
