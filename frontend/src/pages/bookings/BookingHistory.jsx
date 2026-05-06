import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VENDOR_NAMES = {
  1: "Luna Venue",
  2: "Bloom Photo Co.",
  3: "Petal & Co.",
  4: "Harmony Catering",
};

export default function BookingHistory() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) {
          throw new Error("Failed to load bookings from backend.");
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9EAE8] font-serif">
      <div className="bg-white border-b border-[#EDE0DF] px-8 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C9A84C] font-sans font-medium mb-2">
              Everglow — Booking History
            </p>
            <h1 className="text-3xl text-[#2C2C2C] font-light">Booking History</h1>
            <p className="mt-2 text-sm text-[#2C2C2C]/70 max-w-2xl">
              All booking records are retrieved directly from the backend database.
            </p>
          </div>
          <button
            onClick={() => navigate("/bookings")}
            className="text-sm font-sans font-medium px-5 py-2.5 rounded-sm border border-[#EDE0DF] bg-white text-[#2C2C2C] hover:border-[#C9A84C] transition-all duration-150"
          >
            New Booking
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white border border-[#EDE0DF] rounded-sm shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-[#C0392B] font-sans text-sm">
              {error}
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-20 text-[#2C2C2C]/60 font-sans text-sm">
              No bookings were found in the backend.
            </div>
          ) : (
            <table className="w-full text-sm font-sans">
              <thead className="bg-[#F9EAE8]/80">
                <tr className="text-left text-xs uppercase tracking-[0.12em] text-[#2C2C2C]/60">
                  {['Booking ID', 'Vendor', 'Amount', 'Event Date', 'Status', 'Created'].map((heading) => (
                    <th key={heading} className="px-5 py-4">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE0DF]">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-[#F9EAE8]/40 transition-colors duration-150">
                    <td className="px-5 py-4 text-[#C0392B] font-medium">#{booking.id}</td>
                    <td className="px-5 py-4">{VENDOR_NAMES[booking.vendorId] || `Vendor ${booking.vendorId}`}</td>
                    <td className="px-5 py-4">SGD {booking.amount?.toLocaleString() || '—'}</td>
                    <td className="px-5 py-4">
                      {booking.eventDate
                        ? new Date(booking.eventDate).toLocaleDateString("en-SG", {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="px-5 py-4 text-[#2C2C2C]/70">{booking.status || 'REQUESTED'}</td>
                    <td className="px-5 py-4 text-[#2C2C2C]/70">
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString("en-SG", {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
