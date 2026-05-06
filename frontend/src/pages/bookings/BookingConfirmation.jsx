import { useLocation, useNavigate } from "react-router-dom";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#F9EAE8] font-serif flex items-center justify-center px-6 py-10">
        <div className="max-w-2xl bg-white border border-[#EDE0DF] rounded-sm shadow-sm p-10 text-center">
          <p className="text-[#C0392B] text-sm uppercase tracking-[0.2em] mb-4">Booking not found</p>
          <h1 className="text-3xl text-[#2C2C2C] font-light mb-4">No booking details were provided.</h1>
          <p className="text-sm text-[#2C2C2C]/70 mb-6">Please complete a booking request before visiting the confirmation page.</p>
          <button
            onClick={() => navigate("/bookings")}
            className="inline-flex items-center justify-center rounded-sm bg-[#C0392B] text-white px-6 py-3 text-sm font-sans font-medium hover:bg-[#E74C3C] transition-all duration-150"
          >
            Return to Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9EAE8] font-serif">
      <div className="bg-white border-b border-[#EDE0DF] px-8 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C9A84C] font-sans font-medium mb-2">
              Everglow — Booking Confirmation
            </p>
            <h1 className="text-3xl text-[#2C2C2C] font-light">Your booking is confirmed.</h1>
            <p className="mt-2 text-sm text-[#2C2C2C]/70 max-w-2xl">
              We’ve logged your reservation and prepared the event details for your review.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/bookings/history", { state: { booking } })}
              className="text-sm font-sans font-medium px-5 py-2.5 rounded-sm bg-[#C0392B] text-white hover:bg-[#E74C3C] transition-all duration-150"
            >
              Go to History
            </button>
            <button
              onClick={() => navigate("/bookings")}
              className="text-sm font-sans font-medium px-5 py-2.5 rounded-sm border border-[#EDE0DF] bg-white text-[#2C2C2C] hover:border-[#C9A84C] transition-all duration-150"
            >
              New Booking
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_0.7fr]">
          <div className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm overflow-hidden">
            <div className="px-8 py-6 bg-[#F9EAE8]/80 border-b border-[#EDE0DF]">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C] font-sans font-medium mb-2">Booking Reference</p>
              <h2 className="text-3xl text-[#2C2C2C] font-semibold">#{booking.id}</h2>
            </div>
            <div className="px-8 py-6 space-y-5">
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">Vendor</p>
                <p className="text-lg text-[#2C2C2C] font-medium">{booking.vendor}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">Event Type</p>
                  <p className="text-[#2C2C2C]">{booking.eventType}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">Event Date</p>
                  <p className="text-[#2C2C2C]">{new Date(booking.eventDate).toLocaleDateString("en-SG", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">Guest Count</p>
                  <p className="text-[#2C2C2C]">{booking.guestCount}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">Vendor Category</p>
                  <p className="text-[#2C2C2C]">{booking.type}</p>
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">Contact</p>
                <p className="text-[#2C2C2C]">{booking.clientName} · {booking.contactEmail}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.12em] text-[#2C2C2C]/60 font-sans font-medium mb-2">Notes</p>
                <p className="text-[#2C2C2C]/90">{booking.notes || "No additional notes provided."}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm overflow-hidden">
            <div className="px-8 py-6 bg-[#F9EAE8]/80 border-b border-[#EDE0DF]">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C] font-sans font-medium mb-2">Payment Preview</p>
              <h2 className="text-2xl text-[#2C2C2C] font-semibold">SGD {booking.price}</h2>
            </div>
            <div className="px-8 py-6 space-y-4">
              <div className="rounded-sm border border-[#EDE0DF] bg-[#FEF7F6] px-4 py-4">
                <p className="text-xs text-[#2C2C2C]/60 uppercase tracking-[0.12em] font-sans font-medium mb-2">Vendor Fee</p>
                <p className="text-sm text-[#2C2C2C]">Base fee for {booking.vendor} booking.</p>
              </div>
              <div className="rounded-sm border border-[#EDE0DF] bg-white px-4 py-4">
                <p className="text-xs text-[#2C2C2C]/60 uppercase tracking-[0.12em] font-sans font-medium mb-2">Estimated total</p>
                <p className="text-lg text-[#C0392B] font-semibold">SGD {booking.price}</p>
              </div>
              <p className="text-sm text-[#2C2C2C]/70">You can review payment details in the Payments section once the booking is captured by the system.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
