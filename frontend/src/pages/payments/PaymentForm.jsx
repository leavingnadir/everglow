import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import paymentService from "../../services/paymentService";

const PAYMENT_METHODS = ["CARD", "BANK_TRANSFER", "CASH"];
const PAYMENT_STATUSES = ["PENDING", "PAID", "FAILED", "REFUNDED"];

const defaultForm = {
  bookingId: "",
  vendorName: "",
  amount: "",
  paymentMethod: "CARD",
  status: "PENDING",
  paymentDate: new Date().toISOString().split("T")[0],
  notes: "",
};

export default function PaymentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      paymentService
        .getPaymentById(id)
        .then((data) => {
          setForm({
            bookingId: data.bookingId || "",
            vendorName: data.vendorName || "",
            amount: data.amount || "",
            paymentMethod: data.paymentMethod || "CARD",
            status: data.status || "PENDING",
            paymentDate: data.paymentDate
              ? data.paymentDate.split("T")[0]
              : defaultForm.paymentDate,
            notes: data.notes || "",
          });
        })
        .catch(() => setSubmitError("Failed to load payment data."))
        .finally(() => setFetchLoading(false));
    }
  }, [id, isEdit]);

  const validate = () => {
    const e = {};
    if (!form.bookingId) e.bookingId = "Booking ID is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount greater than 0";
    if (!form.paymentDate) e.paymentDate = "Payment date is required";
    return e;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      const payload = { ...form, amount: Number(form.amount) };
      if (isEdit) {
        await paymentService.updatePayment(id, payload);
      } else {
        await paymentService.createPayment(payload);
      }
      navigate("/payments");
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-[#F9EAE8] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9EAE8] font-serif">
      {/* Header */}
      <div className="bg-white border-b border-[#EDE0DF] px-8 py-5 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#C9A84C] font-sans font-medium">
              Everglow — Payments
            </p>
            <h1 className="text-2xl text-[#2C2C2C] mt-0.5 tracking-wide">
              {isEdit ? "Edit Payment" : "New Payment"}
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

      {/* Decorative gold line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

      <div className="max-w-3xl mx-auto px-6 py-10">
        {submitError && (
          <div className="mb-6 bg-red-50 border border-[#C0392B]/20 text-[#C0392B] text-sm font-sans px-4 py-3 rounded-sm flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <path d="M12 8v4m0 4h.01" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {submitError}
          </div>
        )}

        <div className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm overflow-hidden">
          {/* Section: Booking Details */}
          <div className="border-b border-[#EDE0DF] px-8 py-5 bg-[#F9EAE8]/30">
            <h2 className="text-xs uppercase tracking-[0.18em] text-[#C9A84C] font-sans font-medium">
              Booking Details
            </h2>
          </div>

          <div className="px-8 py-6 grid grid-cols-2 gap-5 border-b border-[#EDE0DF]">
            {/* Booking ID */}
            <div className="col-span-1">
              <label className="block text-xs uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">
                Booking ID <span className="text-[#C0392B]">*</span>
              </label>
              <input
                type="text"
                value={form.bookingId}
                onChange={(e) => handleChange("bookingId", e.target.value)}
                placeholder="e.g. 1042"
                className={`w-full border font-sans text-sm px-4 py-2.5 rounded-sm focus:outline-none transition-colors text-[#2C2C2C] placeholder-[#2C2C2C]/25 ${
                  errors.bookingId
                    ? "border-[#C0392B] bg-red-50"
                    : "border-[#EDE0DF] bg-white focus:border-[#C9A84C]"
                }`}
              />
              {errors.bookingId && (
                <p className="text-[#C0392B] text-xs font-sans mt-1">{errors.bookingId}</p>
              )}
            </div>

            {/* Vendor Name */}
            <div className="col-span-1">
              <label className="block text-xs uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">
                Vendor Name
              </label>
              <input
                type="text"
                value={form.vendorName}
                onChange={(e) => handleChange("vendorName", e.target.value)}
                placeholder="e.g. Floral Bliss Studio"
                className="w-full border border-[#EDE0DF] bg-white font-sans text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-[#C9A84C] transition-colors text-[#2C2C2C] placeholder-[#2C2C2C]/25"
              />
            </div>
          </div>

          {/* Section: Payment Details */}
          <div className="border-b border-[#EDE0DF] px-8 py-5 bg-[#F9EAE8]/30">
            <h2 className="text-xs uppercase tracking-[0.18em] text-[#C9A84C] font-sans font-medium">
              Payment Details
            </h2>
          </div>

          <div className="px-8 py-6 grid grid-cols-2 gap-5 border-b border-[#EDE0DF]">
            {/* Amount */}
            <div>
              <label className="block text-xs uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">
                Amount (SGD) <span className="text-[#C0392B]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C9A84C] font-medium text-sm font-sans">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  placeholder="0.00"
                  className={`w-full border font-sans text-sm pl-8 pr-4 py-2.5 rounded-sm focus:outline-none transition-colors text-[#2C2C2C] placeholder-[#2C2C2C]/25 ${
                    errors.amount
                      ? "border-[#C0392B] bg-red-50"
                      : "border-[#EDE0DF] bg-white focus:border-[#C9A84C]"
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="text-[#C0392B] text-xs font-sans mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-xs uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">
                Payment Date <span className="text-[#C0392B]">*</span>
              </label>
              <input
                type="date"
                value={form.paymentDate}
                onChange={(e) => handleChange("paymentDate", e.target.value)}
                className={`w-full border font-sans text-sm px-4 py-2.5 rounded-sm focus:outline-none transition-colors text-[#2C2C2C] ${
                  errors.paymentDate
                    ? "border-[#C0392B] bg-red-50"
                    : "border-[#EDE0DF] bg-white focus:border-[#C9A84C]"
                }`}
              />
              {errors.paymentDate && (
                <p className="text-[#C0392B] text-xs font-sans mt-1">{errors.paymentDate}</p>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">
                Payment Method
              </label>
              <div className="flex gap-2">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => handleChange("paymentMethod", method)}
                    className={`flex-1 text-xs font-sans py-2.5 rounded-sm border transition-all duration-150 tracking-wide font-medium ${
                      form.paymentMethod === method
                        ? "bg-[#C0392B] text-white border-[#C0392B]"
                        : "bg-white text-[#2C2C2C]/60 border-[#EDE0DF] hover:border-[#C9A84C]"
                    }`}
                  >
                    {method.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full border border-[#EDE0DF] bg-white font-sans text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-[#C9A84C] text-[#2C2C2C] transition-colors"
              >
                {PAYMENT_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="px-8 py-6">
            <label className="block text-xs uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">
              Notes
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any additional notes…"
              className="w-full border border-[#EDE0DF] bg-white font-sans text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#C9A84C] text-[#2C2C2C] placeholder-[#2C2C2C]/25 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => navigate("/payments")}
            className="text-sm font-sans text-[#2C2C2C]/50 hover:text-[#2C2C2C] transition-colors px-4 py-2.5"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-[#C0392B] hover:bg-[#E74C3C] disabled:bg-[#C0392B]/50 text-white text-sm font-sans font-medium px-8 py-2.5 rounded-sm transition-all duration-200 shadow-md hover:shadow-lg tracking-wide"
          >
            {loading && (
              <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {isEdit ? "Save Changes" : "Create Payment"}
          </button>
        </div>

        {/* Decorative footer */}
        <div className="text-center mt-10">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-[#C9A84C]/30" />
            <span className="text-[#C9A84C]/50 text-lg">✦</span>
            <div className="h-px w-16 bg-[#C9A84C]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
