import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'

import PaymentList        from "./pages/payments/PaymentList"
import PaymentForm        from "./pages/payments/PaymentForm"
import PaymentDetail      from "./pages/payments/PaymentDetail"
import PackagesPage       from "./pages/packages/PackagesPage"
import AdminPackagesPage  from "./pages/packages/AdminPackagesPage.jsx"

import FeedbackPage       from "./pages/reviews/FeedbackPage"
import BookVendorPage     from "./pages/bookings/BookVendorPage.jsx"
import BookingHistory     from "./pages/bookings/BookingHistory.jsx"
import BookingConfirmation from "./pages/bookings/BookingConfirmation.jsx"

// User pages
import LoginPage          from "./pages/users/LoginPage"
import UserProfilePage    from "./pages/users/UserProfilePage"
import AdminUsersPage     from "./pages/users/AdminUsersPage"

// Vendor Pages
import VendorsPage           from "./pages/vendors/VendorsPage"
import VendorDetailsPage     from "./pages/vendors/VendorDetailsPage"
import AdminVendorDashboard  from "./pages/vendors/AdminVendorDashboard"

// Admin pages
import AdminPanel          from "./pages/admin/AdminPanel"
import ProtectedAdminRoute from "./pages/admin/ProtectedAdminRoute"
import AdminBookings       from "./pages/admin/AdminBookings"

// Auth context
import { AuthProvider, useAuth } from "./context/AuthContext"

// ✅ FIXED: correct paths (NO duplicates, NO wrong imports)
import SubmitFeedback from "./pages/reviews/SubmitFeedback"
import AdminFeedbackPage from "./pages/reviews/AdminFeedbackPage"


// ─── Home ────────────────────────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9EAE8" }}>
      <section style={{
        position: "relative",
        width: "100%",
        height: "95vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.70) 100%)",
        }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            marginBottom: "28px"
          }}>
            <span style={{ display: "block", width: "60px", height: "1px", background: "rgba(255,255,255,0.5)" }} />
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 300,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase"
            }}>
              Everglow
            </span>
            <span style={{ display: "block", width: "60px", height: "1px", background: "rgba(255,255,255,0.5)" }} />
          </div>

          <h1 style={{
            fontFamily: "var(--font-brand)",
            fontSize: "clamp(38px, 6vw, 76px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: "0.02em",
            marginBottom: "24px",
          }}>
            Where Love Stories<br />Begin to Take Shape
          </h1>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(13px, 1.5vw, 15px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "44px",
          }}>
            Your Perfect Day Awaits
          </p>

          <div style={{ display: "inline-flex", gap: "16px" }}>
            <button
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "#C0392B",
                color: "#fff",
                border: "none",
                padding: "14px 32px",
                cursor: "pointer"
              }}
              onClick={() => navigate("/vendors")}
              onMouseEnter={e => e.target.style.background = "#E74C3C"}
              onMouseLeave={e => e.target.style.background = "#C0392B"}
            >
              Explore Vendors
            </button>

            <button
              onClick={() => navigate("/packages")}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.5)",
                padding: "14px 32px",
                cursor: "pointer"
              }}
              onMouseEnter={e => e.target.style.borderColor = "rgba(255,255,255,0.9)"}
              onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.5)"}
            >
              View Packages
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-10 py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-sans font-medium mb-2" style={{ color: "#C9A84C" }}>
            Everything You Need
          </p>
          <h3 className="text-2xl font-serif" style={{ color: "#2C2C2C" }}>
            Built for Your Big Day
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Vendor Booking", desc: "Book photographers, venues, decorators easily.", icon: "🌸" },
            { title: "Smart Planning", desc: "Manage wedding schedules and budgets efficiently.", icon: "📋" },
            { title: "Real-time Tracking", desc: "Track booking status and confirmations instantly.", icon: "✨" },
          ].map((item, i) => (
            <div key={i} className="p-7 rounded-sm transition-all duration-200 hover:shadow-lg"
              style={{ border: "1px solid #EDE0DF", backgroundColor: "#ffffff" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#C9A84C"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#EDE0DF"}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold font-serif mb-2" style={{ color: "#C0392B" }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: "#2C2C2C", opacity: 0.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif">Our Gallery</h2>
            <p className="text-gray-500 mt-3">Capturing timeless moments of love & celebration</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["img01","img02","img03","img04","img05","img06"].map(img => (
              <div key={img} className="overflow-hidden shadow-md group">
                <img src={`/${img}.jpg`} alt="gallery" className="w-full object-cover"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center py-10 text-sm font-sans"
        style={{
          borderTop: "1px solid #EDE0DF",
          backgroundColor: "#F9EAE8",
          color: "#2C2C2C",
          opacity: 0.5
        }}>
        © {new Date().getFullYear()} Everglow. All rights reserved.
      </footer>
    </div>
  )
}


// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate()
  const { user, isAdmin, logout } = useAuth()

  return (
    <header className="flex justify-between items-center px-10 py-6"
      style={{ backgroundColor: "#F9EAE8", borderBottom: "1px solid #EDE0DF" }}
    >
      <Link to="/">
        <img src="/everglow_1.png" alt="Everglow"
          style={{ height: "20px", width: "auto", objectFit: "contain" }} />
      </Link>

      <nav className="space-x-7 text-sm font-sans font-medium">
        {[
          { label: "Home", to: "/" },
          { label: "Vendors", to: "/vendors" },
          { label: "Packages", to: "/packages" },
          { label: "Bookings", to: "/bookings" },
          { label: "Reviews", to: "/reviews" },
        ].map((item) => (
          <Link key={item.label} to={item.to}
            style={{ color: "#2C2C2C" }}
          >
            {item.label}
          </Link>
        ))}

        {user && isAdmin && (
          <Link to="/admin" style={{ color: "#C0392B", fontWeight: 600 }}>
            Admin Panel
          </Link>
        )}
      </nav>

      {user ? (
        <button onClick={() => { logout(); navigate("/") }}>
          Sign Out
        </button>
      ) : (
        <button onClick={() => navigate("/login")}>
          Get Started
        </button>
      )}
    </header>
  )
}


// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/packages" element={<PackagesPage />} />

          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/vendors/:id" element={<VendorDetailsPage />} />

          <Route path="/user/profile" element={<UserProfilePage />} />

          <Route path="/payments" element={<PaymentList />} />
          <Route path="/payments/create" element={<PaymentForm />} />
          <Route path="/payments/:id" element={<PaymentDetail />} />

          <Route path="/bookings" element={<BookVendorPage />} />
          <Route path="/bookings/history" element={<BookingHistory />} />
          <Route path="/bookings/confirmation" element={<BookingConfirmation />} />

          <Route path="/reviews" element={<FeedbackPage />} />
          <Route path="/reviews/submit" element={<SubmitFeedback />} />

          <Route path="/admin" element={<ProtectedAdminRoute><AdminPanel /></ProtectedAdminRoute>} />
          <Route path="/admin/users" element={<ProtectedAdminRoute><AdminUsersPage /></ProtectedAdminRoute>} />
          <Route path="/admin/packages" element={<ProtectedAdminRoute><AdminPackagesPage /></ProtectedAdminRoute>} />
          <Route path="/admin/bookings" element={<ProtectedAdminRoute><AdminBookings /></ProtectedAdminRoute>} />
          <Route path="/admin/vendors" element={<ProtectedAdminRoute><AdminVendorDashboard /></ProtectedAdminRoute>} />

          <Route path="/admin/feedback" element={
            <ProtectedAdminRoute>
              <AdminFeedbackPage />
            </ProtectedAdminRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App