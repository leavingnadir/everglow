import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVendors, deleteVendor } from '../../services/vendorService';
import VendorForm from '../../components/vendors/VendorForm';

const AdminVendorDashboard = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVendorId, setEditingVendorId] = useState(null);

  useEffect(() => { loadVendors(); }, []);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const data = await fetchVendors();
      setVendors(data);
    } catch (error) {
      console.error('Failed to fetch vendors', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await deleteVendor(id);
        loadVendors();
      } catch (error) {
        alert('Error deleting vendor');
      }
    }
  };

  const handleEdit = (id) => {
    setEditingVendorId(id);
    setShowForm(true);
  };

  const handleCreateNew = () => {
    setEditingVendorId(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    loadVendors();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F9EAE8" }}>

      {/* ── Admin Top Bar ── */}
      <div style={{
        background: "#2C2C2C", padding: "14px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src="/everglow_1.png" alt="Everglow"
            style={{ height: "16px", filter: "brightness(0) invert(1)" }}
          />
          <span style={{
            fontFamily: "var(--font-body)", fontSize: "10px",
            letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C",
          }}>
            Admin Panel — Vendor Management
          </span>
        </div>

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
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#C9A84C"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"}
        >
          ← Admin Panel
        </button>
      </div>

      <div className="py-10 px-6 max-w-6xl mx-auto">

        {showForm ? (
          <>
            <button
              onClick={() => setShowForm(false)}
              className="mb-6 text-sm text-gray-500 hover:text-black"
            >
              &larr; Back to Vendor List
            </button>
            <VendorForm vendorId={editingVendorId} onSuccess={handleFormSuccess} />
          </>
        ) : (
          <>
            {/* Heading */}
            <div style={{ marginBottom: "32px" }}>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "10px",
                letterSpacing: "0.25em", textTransform: "uppercase",
                color: "#C9A84C", marginBottom: "6px",
              }}>
                Vendor Management
              </p>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <h1 style={{
                  fontFamily: "var(--font-brand)", fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 300, fontStyle: "italic", color: "#2C2C2C", margin: 0,
                }}>
                  All Vendors
                </h1>
                <button
                  onClick={handleCreateNew}
                  style={{
                    padding: "11px 24px", background: "#C0392B", color: "#fff",
                    border: "none", fontFamily: "var(--font-body)", fontSize: "11px",
                    letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#E74C3C"}
                  onMouseLeave={e => e.currentTarget.style.background = "#C0392B"}
                >
                  + Add New Vendor
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center p-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div style={{
                background: "#fff", border: "1px solid #EDE0DF",
                borderRadius: "2px", overflow: "hidden",
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #EDE0DF", background: "#F9EAE8" }}>
                      {["Business Name", "Category", "Contact", "Rating", "Actions"].map(h => (
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
                    {vendors.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-gray-500">
                          No vendors found.
                        </td>
                      </tr>
                    ) : (
                      vendors.map(vendor => (
                        <tr
                          key={vendor.id}
                          style={{ borderBottom: "1px solid #F5EDEC" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#FDF6F5"}
                          onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                        >
                          {/* ✅ Business Name with thumbnail */}
                          <td style={td}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div
                                style={{
                                  width: "44px",
                                  height: "44px",
                                  backgroundImage: `url(${vendor.imageUrl || 'https://via.placeholder.com/44?text=%3F'})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  borderRadius: "2px",
                                  border: "1px solid #EDE0DF",
                                  flexShrink: 0,
                                }}
                              />
                              <strong>{vendor.businessName}</strong>
                            </div>
                          </td>

                          <td style={{ ...td, color: "#666" }}>{vendor.category}</td>

                          <td style={{ ...td, color: "#666", fontSize: "12px" }}>
                            <div>{vendor.contactEmail}</div>
                            <div style={{ color: "#999" }}>{vendor.contactPhone}</div>
                          </td>

                          <td style={td}>
                            <span style={{ color: "#C9A84C" }}>★</span> {vendor.rating?.toFixed(1) || '0.0'}
                          </td>

                          <td style={{ ...td, whiteSpace: "nowrap" }}>
                            <button onClick={() => handleEdit(vendor.id)} style={actionBtn("#2C2C2C")}>
                              Edit
                            </button>
                            <button onClick={() => handleDelete(vendor.id)} style={actionBtn("#C0392B")}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const td = {
  padding: "13px 16px",
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  color: "#2C2C2C",
};

const actionBtn = (color) => ({
  marginRight: "6px",
  padding: "5px 12px",
  background: "none",
  border: `1px solid ${color}`,
  color,
  borderRadius: "2px",
  fontFamily: "var(--font-body)",
  fontSize: "10px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
});

export default AdminVendorDashboard;
