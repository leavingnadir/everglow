import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import PaymentList   from "./pages/payments/PaymentList"
import PaymentForm   from "./pages/payments/PaymentForm"
import PaymentDetail from "./pages/payments/PaymentDetail"
import PackagesPage from "./pages/packages/PackagesPage";

function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9EAE8" }}>
        <section style={{position: "relative",width: "100%",height: "95vh",overflow: "hidden",display: "flex",alignItems: "center",justifyContent: "center",}}>
              {/* Background Image*/}
              <div style={{position: "absolute",inset: 0,backgroundImage: "url('/hero_bg.png')",backgroundSize: "cover",backgroundPosition: "center",}} />

              {/* Dark Overlay */}
              <div style={{position: "absolute",inset: 0,background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.70) 100%)",}} />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>

                {/* Decorative divider */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "28px" }}>
                  <span style={{ display: "block", width: "60px", height: "1px", background: "rgba(255,255,255,0.5)" }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 300, letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>
                    Everglow
                  </span>
                  <span style={{ display: "block", width: "60px", height: "1px", background: "rgba(255,255,255,0.5)" }} />
                </div>

                {/* Main Heading */}
                <h1 style={{fontFamily: "var(--font-brand)",fontSize: "clamp(38px, 6vw, 76px)",fontWeight: 300,fontStyle: "italic",color: "#ffffff",lineHeight: 1.15,letterSpacing: "0.02em",marginBottom: "24px",}}>
                  Where Love Stories<br />Begin to Take Shape
                </h1>

                {/* Subtext */}
                <p style={{fontFamily: "var(--font-body)",fontSize: "clamp(13px, 1.5vw, 15px)",fontWeight: 300,color: "rgba(255,255,255,0.75)",letterSpacing: "0.18em",textTransform: "uppercase",marginBottom: "44px",}}>
                  Your Perfect Day Awaits
                </p>

                {/* CTA Buttons */}
                <div style={{ display: "inline-flex", gap: "16px" }}>
                  <button
                    style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", background: "#C0392B", color: "#fff", border: "none", padding: "14px 32px", cursor: "pointer" }}
                    onMouseEnter={e => e.target.style.background = "#E74C3C"}
                    onMouseLeave={e => e.target.style.background = "#C0392B"}
                  >
                    Explore Vendors
                  </button>
                  <button
                    style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.5)", padding: "14px 32px", cursor: "pointer" }}
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
                {
                  title: "Vendor Booking",
                  desc: "Book photographers, venues, decorators easily.",
                  icon: "🌸",
                },
                {
                  title: "Smart Planning",
                  desc: "Manage wedding schedules and budgets efficiently.",
                  icon: "📋",
                },
                {
                  title: "Real-time Tracking",
                  desc: "Track booking status and confirmations instantly.",
                  icon: "✨",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-7 rounded-sm transition-all duration-200 hover:shadow-lg"
                  style={{
                    border: "1px solid #EDE0DF",
                    backgroundColor: "#ffffff",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#C9A84C"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#EDE0DF"}
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3
                    className="text-lg font-semibold font-serif mb-2"
                    style={{ color: "#C0392B" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#2C2C2C", opacity: 0.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full py-16 bg-white">
              <div className="max-w-6xl mx-auto px-6">
                  {/* Heading */}
                  <div className="text-center mb-12">
                      <h2 className="text-4xl font-serif">Our Gallery</h2>
                      <p className="text-gray-500 mt-3">Capturing timeless moments of love & celebration</p>
                  </div>
                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="overflow-hidden shadow-md group"><img src="/img01.jpg" alt="gallery" className="w-full object-cover"/></div>
                      <div className="overflow-hidden shadow-md group"><img src="/img02.jpg" alt="gallery" className="w-full object-cover"/></div>
                      <div className="overflow-hidden shadow-md group"><img src="/img03.jpg" alt="gallery" className="w-full object-cover"/></div>
                      <div className="overflow-hidden shadow-md group"><img src="/img04.jpg" alt="gallery" className="w-full object-cover"/></div>
                      <div className="overflow-hidden shadow-md group"><img src="/img05.jpg" alt="gallery" className="w-full object-cover"/></div>
                      <div className="overflow-hidden shadow-md group"><img src="/img06.jpg" alt="gallery" className="w-full object-cover"/></div>
                  </div>
              </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-10 text-sm font-sans" style={{borderTop: "1px solid #EDE0DF", backgroundColor: "#F9EAE8",color: "#2C2C2C",opacity: 0.5,}}>
            © {new Date().getFullYear()} Everglow. All rights reserved.
          </footer>
        </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <header className="flex justify-between items-center px-10 py-6" style={{ backgroundColor: "#F9EAE8", borderBottom: "1px solid #EDE0DF" }}>
        <Link to="/">
            <img
              src="/everglow_1.png"
              alt="Everglow"
              style={{ height: "20px", width: "auto", objectFit: "contain" }}
            />
        </Link>

        <nav className="space-x-7 text-sm font-sans font-medium">
          {[
            { label: "Home",     to: "/",         isLink: true },
            { label: "Venues",   to: "#",         isLink: false },
            { label: "Vendors",  to: "#",         isLink: false },
            { label: "Bookings", to: "#",         isLink: false },
            { label: "Payments", to: "/payments", isLink: true },
          ].map((item) =>
            item.isLink ? (
              <Link key={item.label} to={item.to} className="transition-colors duration-150" style={{ color: "#2C2C2C" }} onMouseEnter={e => e.target.style.color = "#C0392B"} onMouseLeave={e => e.target.style.color = "#2C2C2C"}>
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.to}
                className="transition-colors duration-150"
                style={{ color: "#2C2C2C" }}
                onMouseEnter={e => e.target.style.color = "#C0392B"}
                onMouseLeave={e => e.target.style.color = "#2C2C2C"}
              >
                {item.label}
              </a>
            )
          )}
        </nav>
        <button
          className="px-5 py-2 rounded-sm text-sm font-sans font-medium text-white shadow-sm transition-all duration-200 hover:shadow-md"
          style={{ backgroundColor: "#C0392B" }}
          onMouseEnter={e => e.target.style.backgroundColor = "#E74C3C"}
          onMouseLeave={e => e.target.style.backgroundColor = "#C0392B"}
        >
          Get Started
        </button>
      </header>

      {/* All routes */}
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/payments"          element={<PaymentList />} />
        <Route path="/payments/create"   element={<PaymentForm />} />
        <Route path="/payments/:id/edit" element={<PaymentForm />} />
        <Route path="/payments/:id"      element={<PaymentDetail />} />
        <Route path="/packages" element={<PackagesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
