import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-white">

            {/* Navbar */}
            <header className="flex justify-between items-center px-10 py-6 border-b">
              <h1 className="text-2xl font-bold text-primary">
                Everglow
              </h1>

              <nav className="space-x-6 text-sm font-medium">
                <a href="#" className="hover:text-primary">Home</a>
                <a href="#" className="hover:text-primary">Venues</a>
                <a href="#" className="hover:text-primary">Vendors</a>
                <a href="#" className="hover:text-primary">Bookings</a>
              </nav>

              <button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-secondary transition">
                Get Started
              </button>
            </header>

            {/* Hero Section */}
            <section className="text-center px-6 py-24 bg-soft">
              <h2 className="text-5xl font-bold leading-tight">
                Plan Your Dream Wedding with <span className="text-primary">Everglow</span>
              </h2>

              <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
                A complete wedding planning and vendor booking management system.
                Manage venues, photographers, catering, and more — all in one place.
              </p>

              <div className="mt-8 space-x-4">
                <button className="bg-primary text-white px-6 py-3 rounded-xl">
                  Explore Vendors
                </button>
                <button className="border border-primary text-primary px-6 py-3 rounded-xl">
                  View Packages
                </button>
              </div>
            </section>

            {/* Features */}
            <section className="grid md:grid-cols-3 gap-6 px-10 py-20">
              {[
                {
                  title: "Vendor Booking",
                  desc: "Book photographers, venues, decorators easily.",
                },
                {
                  title: "Smart Planning",
                  desc: "Manage wedding schedules and budgets efficiently.",
                },
                {
                  title: "Real-time Tracking",
                  desc: "Track booking status and confirmations instantly.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 border rounded-2xl hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{item.desc}</p>
                </div>
              ))}
            </section>

            {/* Footer */}
            <footer className="text-center py-10 border-t text-gray-500">
              © {new Date().getFullYear()} Everglow. All rights reserved.
            </footer>
      </div>
    </>
  )
}

export default App
