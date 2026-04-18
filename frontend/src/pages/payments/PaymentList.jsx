import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import paymentService from "../../services/paymentService";

const statusConfig = {
  PAID: {
    label: "Paid",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  PENDING: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },
  FAILED: {
    label: "Failed",
    bg: "bg-red-50",
    text: "text-[#C0392B]",
    dot: "bg-[#C0392B]",
  },
  REFUNDED: {
    label: "Refunded",
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
  },
};

const methodIcons = {
  CARD: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="1.5" />
      <path d="M2 10h20" strokeWidth="1.5" />
    </svg>
  ),
  BANK_TRANSFER: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  CASH: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
    </svg>
  ),
};

export default function PaymentList() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await paymentService.getAllPayments();
      setPayments(data);
    } catch (err) {
      setError("Unable to load payments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this payment record?")) return;
    try {
      await paymentService.deletePayment(id);
      setPayments((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete payment.");
    }
  };

  const filtered = payments.filter((p) => {
    const matchStatus = filterStatus === "ALL" || p.status === filterStatus;
    const matchSearch =
      searchQuery === "" ||
      p.bookingId?.toString().includes(searchQuery) ||
      p.vendorName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="min-h-screen bg-[#F9EAE8] font-serif">
      {/* Top bar */}
      <div className="bg-white border-b border-[#EDE0DF] px-8 py-5 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-[#C9A84C] font-sans font-medium">
            Everglow
          </p>
          <h1 className="text-2xl text-[#2C2C2C] mt-0.5 tracking-wide">
            Payment Records
          </h1>
        </div>
        <button
          onClick={() => navigate("/payments/create")}
          className="flex items-center gap-2 bg-[#C0392B] hover:bg-[#E74C3C] text-white text-sm font-sans font-medium px-5 py-2.5 rounded-sm transition-all duration-200 tracking-wide shadow-md hover:shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New Payment
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Collected",
              value: `$${totalRevenue.toLocaleString()}`,
              accent: "#C9A84C",
            },
            {
              label: "Total Records",
              value: payments.length,
              accent: "#C0392B",
            },
            {
              label: "Pending",
              value: payments.filter((p) => p.status === "PENDING").length,
              accent: "#C9A84C",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-[#EDE0DF] rounded-sm px-6 py-5 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-[#2C2C2C]/50 font-sans">
                {stat.label}
              </p>
              <p
                className="text-3xl mt-1 font-light"
                style={{ color: stat.accent }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[220px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2C2C]/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
              <path d="m21 21-4.35-4.35" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search by booking or vendor…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm font-sans border border-[#EDE0DF] bg-white rounded-sm focus:outline-none focus:border-[#C9A84C] text-[#2C2C2C] placeholder-[#2C2C2C]/30"
            />
          </div>
          <div className="flex gap-1.5">
            {["ALL", "PAID", "PENDING", "FAILED", "REFUNDED"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`text-xs font-sans font-medium px-3.5 py-2 rounded-sm border transition-all duration-150 tracking-wide ${
                  filterStatus === s
                    ? "bg-[#C0392B] text-white border-[#C0392B]"
                    : "bg-white text-[#2C2C2C]/60 border-[#EDE0DF] hover:border-[#C9A84C]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-[#C0392B] font-sans text-sm">
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-[#2C2C2C]/40 font-sans text-sm">
              No payment records found.
            </div>
          ) : (
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-[#EDE0DF] bg-[#F9EAE8]/60">
                  {["Booking ID", "Vendor", "Amount", "Method", "Date", "Status", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs tracking-[0.12em] uppercase text-[#2C2C2C]/50 font-medium px-5 py-3.5"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE0DF]">
                {filtered.map((payment) => {
                  const status = statusConfig[payment.status] || statusConfig.PENDING;
                  return (
                    <tr
                      key={payment.id}
                      className="hover:bg-[#F9EAE8]/40 transition-colors duration-100"
                    >
                      <td className="px-5 py-4 text-[#C0392B] font-medium">
                        #{payment.bookingId}
                      </td>
                      <td className="px-5 py-4 text-[#2C2C2C]">
                        {payment.vendorName || "—"}
                      </td>
                      <td className="px-5 py-4 font-medium text-[#2C2C2C]">
                        <span className="text-[#C9A84C] mr-0.5">$</span>
                        {payment.amount?.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 text-[#2C2C2C]/60">
                          {methodIcons[payment.paymentMethod] || methodIcons.CARD}
                          {payment.paymentMethod?.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#2C2C2C]/60">
                        {payment.paymentDate
                          ? new Date(payment.paymentDate).toLocaleDateString("en-SG", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => navigate(`/payments/${payment.id}/edit`)}
                            className="text-[#2C2C2C]/40 hover:text-[#C9A84C] transition-colors"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(payment.id)}
                            className="text-[#2C2C2C]/40 hover:text-[#C0392B] transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <p className="text-center text-xs text-[#2C2C2C]/30 font-sans mt-6 tracking-wide">
          {filtered.length} record{filtered.length !== 1 ? "s" : ""} shown
        </p>
      </div>
    </div>
  );
}
