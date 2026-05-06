import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VENDORS = [
  {
    id: 1,
    name: "Luna Venue",
    type: "Venue",
    location: "Singapore",
    currency: "SGD",
    price: 4200,
    tagline: "Elegant spaces tailored for your ceremony.",
  },
  {
    id: 2,
    name: "Bloom Photo Co.",
    type: "Photography",
    location: "Singapore",
    currency: "SGD",
    price: 1250,
    tagline: "Captured moments with a romantic touch.",
  },
  {
    id: 3,
    name: "Petal & Co.",
    type: "Florist",
    location: "Singapore",
    currency: "SGD",
    price: 980,
    tagline: "Signature florals for unforgettable celebrations.",
  },
  {
    id: 4,
    name: "Harmony Catering",
    type: "Catering",
    location: "Singapore",
    currency: "SGD",
    price: 3100,
    tagline: "Cuisine crafted for memorable wedding feasts.",
  },
  {
    id: 5,
    name: "Lotus Lanka Events",
    type: "Venue",
    location: "Sri Lanka",
    currency: "LKR",
    price: 985000,
    tagline: "Enchanting Sri Lankan venues for timeless celebrations.",
  },
];

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
  const [selectedVendor, setSelectedVendor] = useState(VENDORS[0]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.eventDate) next.eventDate = "Please choose an event date.";
    if (!form.eventType) next.eventType = "Please select an event type.";
    if (!form.guestCount || Number(form.guestCount) <= 0) next.guestCount = "Please enter a valid guest count.";
    if (!form.clientName.trim()) next.clientName = "Please enter your name.";
    if (!form.contactEmail.trim()) next.contactEmail = "Please enter a contact email.";
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      userId: 1,
      vendorId: selectedVendor.id,
      eventDate: `${form.eventDate}T00:00:00`,
      amount: selectedVendor.price,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to save booking. Please try again.");
      }

      const saved = await response.json();
      navigate("/bookings/confirmation", {
        state: {
          booking: {
            ...saved,
            vendor: selectedVendor.name,
            type: selectedVendor.type,
            guestCount: form.guestCount,
            eventType: form.eventType,
            clientName: form.clientName,
            contactEmail: form.contactEmail,
            notes: form.notes,
            price: selectedVendor.price,
          },
        },
      });
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9EAE8] font-serif">
      <div className="bg-white border-b border-[#EDE0DF] px-8 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C9A84C] font-sans font-medium mb-2">
              Everglow — Bookings
            </p>
            <h1 className="text-3xl text-[#2C2C2C] font-light">
              Book Your Wedding Vendor
            </h1>
            <p className="mt-2 text-sm text-[#2C2C2C]/70 max-w-2xl">
              Add a new booking and store it through the backend.
            </p>
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
        <section className="space-y-6">
          <div className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-[#EDE0DF] bg-[#F9EAE8]/80">
              <h2 className="text-xl text-[#2C2C2C] font-medium">Select a Vendor</h2>
              <p className="text-sm text-[#2C2C2C]/70 mt-1">Choose a vendor, then submit the booking to the backend.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 p-5">
              {VENDORS.map((vendor) => {
                const isActive = selectedVendor.id === vendor.id;
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
                      <span className="text-sm uppercase tracking-[0.18em] text-[#C9A84C] font-sans font-medium">{vendor.type}</span>
                      <span className="text-sm text-[#2C2C2C]/60">{vendor.currency || "SGD"} {vendor.price}</span>
                    </div>
                    <h3 className="text-xl text-[#2C2C2C] font-semibold mb-1">{vendor.name}</h3>
                    <p className="text-sm text-[#2C2C2C]/70 leading-relaxed">{vendor.tagline}</p>
                    <p className="mt-4 text-xs text-[#2C2C2C]/50">Location: {vendor.location}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-[#EDE0DF] bg-[#F9EAE8]/80">
              <h2 className="text-xl text-[#2C2C2C] font-medium">Booking Summary</h2>
            </div>
            <div className="px-8 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm text-[#2C2C2C]/80">
                <div>
                  <p className="font-medium text-[#2C2C2C]">Vendor</p>
                  <p>{selectedVendor.name}</p>
                </div>
                <div>
                  <p className="font-medium text-[#2C2C2C]">Category</p>
                  <p>{selectedVendor.type}</p>
                </div>
                <div>
                  <p className="font-medium text-[#2C2C2C]">Price</p>
                  <p>{selectedVendor.currency || "SGD"} {selectedVendor.price}</p>
                </div>
                <div>
                  <p className="font-medium text-[#2C2C2C]">Guests</p>
                  <p>{form.guestCount || "—"}</p>
                </div>
              </div>
              <p className="text-sm text-[#2C2C2C]/70">Booking details are posted to the backend and loaded from the database in history.</p>
            </div>
          </div>
        </section>

        <section>
          <form onSubmit={handleSubmit} className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-[#EDE0DF] bg-[#F9EAE8]/80">
              <h2 className="text-xl text-[#2C2C2C] font-medium">Complete Booking Details</h2>
            </div>
            <div className="px-8 py-6 space-y-5">
              {submitError && (
                <div className="rounded-sm border border-[#C0392B] bg-[#FDF0F0] px-4 py-3 text-sm text-[#C0392B]">
                  {submitError}
                </div>
              )}

              <div className="grid gap-4">
                <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70">Event Date</label>
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => handleChange("eventDate", e.target.value)}
                  className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                />
                {errors.eventDate && <p className="text-xs text-[#C0392B]">{errors.eventDate}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70">Event Type</label>
                  <select
                    value={form.eventType}
                    onChange={(e) => handleChange("eventType", e.target.value)}
                    className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                  >
                    <option value="">Select event type</option>
                    {['Wedding', 'Engagement', 'Reception', 'Corporate'].map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.eventType && <p className="text-xs text-[#C0392B]">{errors.eventType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70">Guest Count</label>
                  <input
                    type="number"
                    min="1"
                    value={form.guestCount}
                    onChange={(e) => handleChange("guestCount", e.target.value)}
                    className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                  />
                  {errors.guestCount && <p className="text-xs text-[#C0392B]">{errors.guestCount}</p>}
                </div>
              </div>

              <div className="grid gap-4">
                <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70">Your Name</label>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={(e) => handleChange("clientName", e.target.value)}
                  placeholder="e.g. Sarah Lim"
                  className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                />
                {errors.clientName && <p className="text-xs text-[#C0392B]">{errors.clientName}</p>}
              </div>

              <div className="grid gap-4">
                <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70">Contact Email</label>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                  placeholder="hello@example.com"
                  className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                />
                {errors.contactEmail && <p className="text-xs text-[#C0392B]">{errors.contactEmail}</p>}
              </div>

              <div className="grid gap-4">
                <label className="block text-sm font-sans font-medium text-[#2C2C2C]/70">Additional Notes</label>
                <textarea
                  rows="4"
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Add event preferences or special instructions"
                  className="w-full border border-[#EDE0DF] rounded-sm px-4 py-3 text-[#2C2C2C] bg-white focus:border-[#C9A84C] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center rounded-sm bg-[#C0392B] text-white text-sm font-sans font-medium px-5 py-3 hover:bg-[#E74C3C] transition-all duration-150 shadow-md disabled:opacity-60"
              >
                {submitting ? "Saving booking…" : "Confirm Booking"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
