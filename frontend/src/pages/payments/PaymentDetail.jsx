import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import paymentService from "../../services/paymentService";

const statusConfig = {
  PAID: { label: "Paid", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  PENDING: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-400" },
  FAILED: { label: "Failed", bg: "bg-red-50", text: "text-[#C0392B]", border: "border-red-200", dot: "bg-[#C0392B]" },
  REFUNDED: { label: "Refunded", bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200", dot: "bg-slate-400" },
};

function InfoRow({ label, value, highlight }) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-[#EDE0DF] last:border-0">
      <span className="text-xs uppercase tracking-[0.12em] text-[#2C2C2C]/50 font-sans font-medium pt-0.5 w-36 flex-shrink-0">
        {label}
      </span>
      <span className={`text-sm font-sans text-right ${highlight ? "text-[#C9A84C] font-semibold text-lg" : "text-[#2C2C2C]"}`}>
        {value || "—"}
      </span>
    </div>
  );
}

export default function PaymentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    paymentService
      .getPaymentById(id)
      .then(setPayment)
      .catch(() => setError("Payment record not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Permanently delete this payment record?")) return;
    setDeleteLoading(true);
    try {
      await paymentService.deletePayment(id);
      navigate("/payments");
    } catch {
      alert("Failed to delete payment.");
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9EAE8] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9EAE8] flex items-center justify-center font-serif">
        <div className="text-center">
          <p className="text-[#C0392B] text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate("/payments")}
            className="text-sm font-sans text-[#2C2C2C]/60 hover:text-[#2C2C2C] transition-colors"
          >
            ← Back to Payments
          </button>
        </div>
      </div>
    );
  }

  const status = statusConfig[payment?.status] || statusConfig.PENDING;

  return (
    <div className="min-h-screen bg-[#F9EAE8] font-serif">
      {/* Header */}
      <div className="bg-white border-b border-[#EDE0DF] shadow-sm">
        <div className="max-w-3xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#C9A84C] font-sans font-medium">
              Everglow — Payments
            </p>
            <h1 className="text-2xl text-[#2C2C2C] mt-0.5 tracking-wide">
              Payment Details
            </h1>
          </div>
          <button
            onClick={() => navigate("/payments")}
            className="flex items-center gap-1.5 text-sm font-sans text-[#2C2C2C]/50 hover:text-[#2C2C2C] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        </div>
      </div>

      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-5">
        {/* Hero card */}
        <div className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-[#2C2C2C] to-[#3d3d3d] px-8 py-8 relative overflow-hidden">
            {/* Decorative rings */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full border border-[#C9A84C]/10" />
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-[#C9A84C]/10" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-[#C9A84C]/70 font-sans">
                  Payment Reference
                </p>
                <p className="text-3xl text-white mt-1 font-light tracking-wider">
                  #PAY-{String(payment.id).padStart(5, "0")}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-sans border ${status.bg} ${status.text} ${status.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs tracking-[0.15em] uppercase text-[#C9A84C]/70 font-sans">
                Total Amount
              </p>
              <p className="text-5xl font-light text-white mt-1">
                <span className="text-[#C9A84C] text-2xl align-top mt-2 inline-block mr-1">$</span>
                {payment.amount?.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Info rows */}
          <div className="px-8 py-2">
            <InfoRow label="Booking ID" value={`#${payment.bookingId}`} />
            <InfoRow label="Vendor" value={payment.vendorName} />
            <InfoRow
              label="Method"
              value={payment.paymentMethod?.replace("_", " ")}
            />
            <InfoRow
              label="Date"
              value={
                payment.paymentDate
                  ? new Date(payment.paymentDate).toLocaleDateString("en-SG", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : null
              }
            />
            {payment.notes && <InfoRow label="Notes" value={payment.notes} />}
          </div>
        </div>

        {/* Metadata card */}
        <div className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm px-8 py-5">
          <h3 className="text-xs uppercase tracking-[0.18em] text-[#C9A84C] font-sans font-medium mb-4">
            Record Info
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm font-sans">
            {[
              {
                label: "Created",
                value: payment.createdAt
                  ? new Date(payment.createdAt).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })
                  : "—",
              },
              {
                label: "Last Updated",
                value: payment.updatedAt
                  ? new Date(payment.updatedAt).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })
                  : "—",
              },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs uppercase tracking-[0.1em] text-[#2C2C2C]/40 mb-1">
                  {item.label}
                </p>
                <p className="text-[#2C2C2C]/70">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className="flex items-center gap-1.5 text-sm font-sans text-[#2C2C2C]/40 hover:text-[#C0392B] transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {deleteLoading ? "Deleting…" : "Delete Record"}
          </button>

          <button
            onClick={() => navigate(`/payments/${id}/edit`)}
            className="flex items-center gap-2 bg-[#C0392B] hover:bg-[#E74C3C] text-white text-sm font-sans font-medium px-6 py-2.5 rounded-sm transition-all duration-200 shadow-md hover:shadow-lg tracking-wide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Edit Payment
          </button>
        </div>

        <div className="text-center pt-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-[#C9A84C]/30" />
            <span className="text-[#C9A84C]/40 text-lg">✦</span>
            <div className="h-px w-16 bg-[#C9A84C]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
