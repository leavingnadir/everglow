// src/services/packageService.js
const PACKAGES_URL = `/api/packages`;

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || "Something went wrong");
  }
  if (response.status === 204) return null;
  return response.json();
}

const h = { "Content-Type": "application/json" };

export const getAllPackages  = () => fetch(PACKAGES_URL, { headers: h }).then(handleResponse);
export const getPackageById = (id) => fetch(`${PACKAGES_URL}/${id}`, { headers: h }).then(handleResponse);
export const getByTier      = (tier) => fetch(`${PACKAGES_URL}/tier/${tier}`, { headers: h }).then(handleResponse);
export const getByTheme     = (theme) => fetch(`${PACKAGES_URL}/theme/${theme}`, { headers: h }).then(handleResponse);
export const getFeatured    = () => fetch(`${PACKAGES_URL}/featured`, { headers: h }).then(handleResponse);

export const createPackage = (data) => fetch(PACKAGES_URL, { method: "POST", headers: h, body: JSON.stringify(data) }).then(handleResponse);
export const updatePackage = (id, data) => fetch(`${PACKAGES_URL}/${id}`, { method: "PUT", headers: h, body: JSON.stringify(data) }).then(handleResponse);
export const deletePackage = (id) => fetch(`${PACKAGES_URL}/${id}`, { method: "DELETE", headers: h }).then(handleResponse);

// ── Constants ──────────────────────────────────────────────────────────────

export const TIERS  = ["SILVER", "GOLD", "PLATINUM", "DIAMOND"];
export const THEMES = [
  { value: "DESTINATION",   label: "Destination Wedding", icon: "🌴", desc: "Beach / Mountain — Bentota / Ella style" },
  { value: "TRADITIONAL",   label: "Traditional Wedding", icon: "🌸", desc: "Poruwa, cultural, Jayamangala gatha" },
  { value: "MODERN_LUXURY", label: "Modern Luxury",       icon: "🎉", desc: "DJ, live band, LED screens" },
  { value: "INTIMATE",      label: "Intimate Wedding",    icon: "💑", desc: "50–100 guests, minimal, trending" },
  { value: "BUDGET_SMART",  label: "Budget Smart",        icon: "💸", desc: "Low cost, essential vendors" },
];

export const VENDOR_CATEGORIES = [
  { value: "DJ",                  label: "DJ",                  group: "🎵 Entertainment" },
  { value: "LIVE_BAND",           label: "Live Band",            group: "🎵 Entertainment" },
  { value: "TRADITIONAL_DANCERS", label: "Traditional Dancers",  group: "🎵 Entertainment" },
  { value: "FIREWORKS",           label: "Fireworks",            group: "🎵 Entertainment" },
  { value: "FLORAL_DESIGN",       label: "Floral Design",        group: "🌸 Decoration" },
  { value: "THEME_COLORS",        label: "Theme Colors",         group: "🌸 Decoration" },
  { value: "STAGE_DESIGN",        label: "Stage Design",         group: "🌸 Decoration" },
  { value: "PHOTOGRAPHY",         label: "Photography",          group: "📸 Media" },
  { value: "VIDEOGRAPHY",         label: "Videography",          group: "📸 Media" },
  { value: "DRONE_SHOOT",         label: "Drone Shoot",          group: "📸 Media" },
  { value: "BUFFET_CATERING",     label: "Buffet Catering",      group: "🍽️ Catering" },
  { value: "SET_MENU_CATERING",   label: "Set Menu Catering",    group: "🍽️ Catering" },
  { value: "DESSERT_TABLE",       label: "Dessert Table",        group: "🍽️ Catering" },
  { value: "HOTEL_VENUE",         label: "Hotel Venue",          group: "🏨 Venue" },
  { value: "GARDEN_VENUE",        label: "Garden Venue",         group: "🏨 Venue" },
  { value: "BEACH_VENUE",         label: "Beach Venue",          group: "🏨 Venue" },
  { value: "MAKEUP_ARTIST",       label: "Makeup Artist",        group: "👗 Bridal" },
  { value: "BRIDAL_DRESSING",     label: "Bridal Dressing",      group: "👗 Bridal" },
  { value: "GROOM_DRESSING",      label: "Groom Dressing",       group: "👗 Bridal" },
  { value: "WEDDING_CAR",         label: "Wedding Car",          group: "🚗 Transport" },
  { value: "GUEST_TRANSPORT",     label: "Guest Transport",      group: "🚗 Transport" },
  { value: "WEDDING_WEBSITE",     label: "Wedding Website",      group: "🎁 Extras" },
  { value: "DIGITAL_INVITATION",  label: "Digital Invitation",   group: "🎁 Extras" },
  { value: "GUEST_MANAGEMENT",    label: "Guest Management",     group: "🎁 Extras" },
];

export const AVAILABILITY_STYLES = {
  AVAILABLE:   { label: "Available",    color: "#15803d", bg: "#f0fdf4", dot: "#22c55e" },
  LIMITED:     { label: "Limited Slots",color: "#b45309", bg: "#fffbeb", dot: "#f59e0b" },
  BOOKED:      { label: "Fully Booked", color: "#991b1b", bg: "#fef2f2", dot: "#ef4444" },
};

export const TIER_STYLES = {
  SILVER:   { color: "#6B7280", bg: "#F9FAFB", border: "#D1D5DB", icon: "🥈", label: "Silver",   subtitle: "Budget Wedding" },
  GOLD:     { color: "#C9A84C", bg: "#FFFBF0", border: "#C9A84C", icon: "🥇", label: "Gold",     subtitle: "Standard Wedding" },
  PLATINUM: { color: "#7C8DB5", bg: "#F0F4FF", border: "#7C8DB5", icon: "🏆", label: "Platinum", subtitle: "Luxury Wedding" },
  DIAMOND:  { color: "#C0392B", bg: "#FFF5F5", border: "#C0392B", icon: "💎", label: "Diamond",  subtitle: "High-End Wedding" },
};

export const formatLKR = (amount) =>
  new Intl.NumberFormat("si-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(amount);

/** Calculate EMI options */
export const calcEMI = (price) => [
  { months: 6,  amount: Math.ceil(price / 6) },
  { months: 12, amount: Math.ceil(price / 12) },
  { months: 24, amount: Math.ceil(price / 24) },
];
