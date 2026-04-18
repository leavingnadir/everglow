import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import PaymentList   from "./pages/payments/PaymentList"
import PaymentForm   from "./pages/payments/PaymentForm"
import PaymentDetail from "./pages/payments/PaymentDetail"

// Landing page extracted as its own component
function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9EAE8" }}>

          {/* Hero Section */}
          <section className="text-center px-6 py-24" style={{ backgroundColor: "#F9EAE8" }}>
            <p
              className="text-xs tracking-[0.25em] uppercase font-sans font-medium mb-4"
              style={{ color: "#C9A84C" }}
            >
              Your Perfect Day Awaits
            </p>
            <h2
              className="text-5xl font-bold leading-tight font-serif"
              style={{ color: "#2C2C2C" }}
            >
              Plan Your Dream Wedding with{" "}
              <span style={{ color: "#C0392B" }}>Everglow</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-base" style={{ color: "#2C2C2C", opacity: 0.6 }}>
              A complete wedding planning and vendor booking management system.
              Manage venues, photographers, catering, and more — all in one place.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 my-8">
              <div className="h-px w-16" style={{ backgroundColor: "#C9A84C", opacity: 0.4 }} />
              <span style={{ color: "#C9A84C", opacity: 0.6 }} className="text-lg">✦</span>
              <div className="h-px w-16" style={{ backgroundColor: "#C9A84C", opacity: 0.4 }} />
            </div>

            <div className="mt-2 flex items-center justify-center gap-4">
              <button
                className="px-7 py-3 rounded-sm text-sm font-sans font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: "#C0392B" }}
                onMouseEnter={e => e.target.style.backgroundColor = "#E74C3C"}
                onMouseLeave={e => e.target.style.backgroundColor = "#C0392B"}
              >
                Explore Vendors
              </button>
              <button
                className="px-7 py-3 rounded-sm text-sm font-sans font-medium transition-all duration-200"
                style={{
                  border: "1px solid #C9A84C",
                  color: "#C9A84C",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={e => e.target.style.backgroundColor = "#C9A84C22"}
                onMouseLeave={e => e.target.style.backgroundColor = "transparent"}
              >
                View Packages
              </button>
            </div>
          </section>

          {/* Features */}
          <section
            className="px-10 py-20"
            style={{ backgroundColor: "#ffffff" }}
          >
            {/* Section heading */}
            <div className="text-center mb-12">
              <p
                className="text-xs tracking-[0.2em] uppercase font-sans font-medium mb-2"
                style={{ color: "#C9A84C" }}
              >
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

          {/* Footer */}
          <footer
            className="text-center py-10 text-sm font-sans"
            style={{
              borderTop: "1px solid #EDE0DF",
              backgroundColor: "#F9EAE8",
              color: "#2C2C2C",
              opacity: 0.5,
            }}
          >
            © {new Date().getFullYear()} Everglow. All rights reserved.
          </footer>
        </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <header className="flex justify-between items-center px-10 py-6" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #EDE0DF" }}>
        <Link to="/"
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "26px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "#C0392B",
              textDecoration: "none",
            }}>
            Everglow
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
