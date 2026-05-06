import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVendors } from "../../services/vendorService";
import { createBooking } from "../../services/bookingService";
import { useAuth } from "../../context/AuthContext";

const initialForm = {
  eventDate: "",
  eventType: "",
  guestCount: "",
  clientName: "",
  contactEmail: "",
  notes: "",
};

export default function BookVendorPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vendors, setVendors] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [form, setForm] = useState({
    ...initialForm,
    clientName: user?.name || "",
    contactEmail: user?.email || "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Load real vendors from DB
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchVendors();
        setVendors(data);
        if (data.length > 0) setSelectedVendor(data[0]);
      } catch (err) {
        setSubmitError("Failed to load vendors.");
      } finally {
        setLoadingVendors(false);
      }
    };
    load();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const next = {};
    if (!selectedVendor) next.vendor = "Please select a vendor.";
    if (!form.eventDate) next.eventDate = "Please choose an event date.";
    if (!form.eventType) next.eventType = "Please select an event type.";
    if (!form.guestCount || Number(form.guestCount) <= 0) next.guestCount = "Enter a valid guest count.";
    if (!form.clientName.trim()) next.clientName = "Please enter your name.";
    if (!form.contactEmail.trim()) next.contactEmail = "Please enter a contact email.";
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) { setErrors(validation); return; }

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Extract numeric price from "LKR 150,000 - 500,000" → 150000
      const priceMatch = selectedVendor.priceRange?.match(/[\d,]+/);
      const amount = priceMatch ? Number(priceMatch[0].replace(/,/g, "")) : 0;

      const payload = {
        userId: user?.id || 1,
        vendorId: selectedVendor.id,
        eventDate: `${form.eventDate}T00:00:00`,
        amount,
        status: "PENDING",
      };

      const saved = await createBooking(payload);

      navigate("/bookings/confirmation", {
        state: {
          booking: {
            ...saved,
            vendor: selectedVendor.businessName,
            type: selectedVendor.category,
            guestCount: form.guestCount,
            eventType: form.eventType,
            clientName: form.clientName,
            contactEmail: form.contactEmail,
            notes: form.notes,
            price: amount,
          },
        },
      });
    } catch (error) {
      setSubmitError(error.message || "Unable to save booking.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingVendors) {
    return (
      <div className="min-h-screen bg-[#F9EAE8] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9EAE8] font-serif">
      <div className="bg-white border-b border-[#EDE0DF] px-8 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C9A84C] font-sans font-medium mb-2">
              Everglow — Bookings
            </p>
            <h1 className="text-3xl text-[#2C2C2C] font-light">Book Your Wedding Vendor</h1>
            <p className="mt-2 text-sm text-[#2C2C2C]/70">Choose a vendor and confirm your booking.</p>
          </div>
          <button
            onClick={() => navigate("/bookings/history")}
            className="text-sm font-sans font-medium px-5 py-2.5 rounded-sm bg-[#C0392B] text-white hover:bg-[#E74C3C] transition-all duration-150"
          >
            View Booking History
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">

        {/* Vendors */}
        <section className="space-y-6">
          <div className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-[#EDE0DF] bg-[#F9EAE8]/80">
              <h2 className="text-xl text-[#2C2C2C] font-medium">Select a Vendor</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 p-5">
              {vendors.length === 0 ? (
                <p className="col-span-2 text-center text-[#2C2C2C]/60 py-8">
                  No vendors available. Add some from the admin panel.
                </p>
              ) : vendors.map((vendor) => {
                const isActive = selectedVendor?.id === vendor.id;
                return (
                  <button
                    key={vendor.id}
                    type="button"
                    onClick={() => setSelectedVendor(vendor)}
                    className={`text-left p-5 rounded-sm border transition-all duration-150 ${
                      isActive ? "border-[#C0392B] bg-[#F9EAE8] shadow-md" : "border-[#EDE0DF] bg-white hover:border-[#C9A84C]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm uppercase tracking-[0.18em] text-[#C9A84C] font-sans font-medium">
                        {vendor.category}
                      </span>
                      <span className="text-sm text-[#2C2C2C]/60">
                        ★ {vendor.rating?.toFixed(1) || '0.0'}
                      </span>
                    </div>
                    <h3 className="text-xl text-[#2C2C2C] font-semibold mb-1">{vendor.businessName}</h3>
                    <p className="text-sm text-[#2C2C2C]/70 leading-relaxed">
                      {vendor.description?.substring(0, 90)}{vendor.description?.length > 90 ? '…' : ''}
                    </p>
                    <p className="mt-4 text-xs text-[#C9A84C] font-medium">
                      {vendor.priceRange || "Contact for pricing"}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Form */}
        <section>
          <form onSubmit={handleSubmit} className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-[#EDE0DF] bg-[#F9EAE8]/80">
              <h2 className="text-xl text-[#2C2C2C] font-medium">Booking Details</h2>
            </div>
            <div className="px-8 py-6 space-y-5">
              {submitError && (
                <div className="rounded-sm border border-[#C0392B] bg-[#FDF0F0] px-4 py-3 text-sm text-[#C0392B]">
                  {submitError}
                </div>
              )}

              <div>
                <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70 mb-2">Event Date</label>
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => handleChange("eventDate", e.target.value)}
                  className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                />
                {errors.eventDate && <p className="text-xs text-[#C0392B] mt-1">{errors.eventDate}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70 mb-2">Event Type</label>
                  <select
                    value={form.eventType}
                    onChange={(e) => handleChange("eventType", e.target.value)}
                    className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                  >
                    <option value="">Select type</option>
                    {['Wedding', 'Engagement', 'Reception', 'Corporate'].map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.eventType && <p className="text-xs text-[#C0392B] mt-1">{errors.eventType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70 mb-2">Guests</label>
                  <input
                    type="number" min="1"
                    value={form.guestCount}
                    onChange={(e) => handleChange("guestCount", e.target.value)}
                    className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                  />
                  {errors.guestCount && <p className="text-xs text-[#C0392B] mt-1">{errors.guestCount}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70 mb-2">Your Name</label>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={(e) => handleChange("clientName", e.target.value)}
                  className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                />
                {errors.clientName && <p className="text-xs text-[#C0392B] mt-1">{errors.clientName}</p>}
              </div>

              <div>
                <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70 mb-2">Contact Email</label>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                  className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                />
                {errors.contactEmail && <p className="text-xs text-[#C0392B] mt-1">{errors.contactEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70 mb-2">Notes</label>
                <textarea
                  rows="3"
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Special requests..."
                  className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !selectedVendor}
                className="w-full inline-flex items-center justify-center rounded-sm bg-[#C0392B] text-white text-sm font-sans font-medium px-5 py-3 hover:bg-[#E74C3C] transition-all duration-150 shadow-md disabled:opacity-60"
              >
                {submitting ? "Saving…" : "Confirm Booking"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
