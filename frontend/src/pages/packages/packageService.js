
const PACKAGES_URL = `${API_BASE}/api/packages`;
const API = "http://localhost:8081/api/packages";
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || "Something went wrong");
  }
  if (response.status === 204) return null;
  return response.json();
}

const defaultHeaders = { "Content-Type": "application/json" };

export async function getAllPackages() {
  const res = await fetch(PACKAGES_URL, { headers: defaultHeaders });
  return handleResponse(res);
}

export async function getPackageById(id) {
  const res = await fetch(`${PACKAGES_URL}/${id}`, { headers: defaultHeaders });
  return handleResponse(res);
}

export async function getPackagesByTier(tier) {
  const res = await fetch(`${PACKAGES_URL}/tier/${tier}`, { headers: defaultHeaders });
  return handleResponse(res);
}

export async function createPackage(packageData) {
  const res = await fetch(PACKAGES_URL, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(packageData),
  });
  return handleResponse(res);
}

export async function updatePackage(id, packageData) {
  const res = await fetch(`${PACKAGES_URL}/${id}`, {
    method: "PUT",
    headers: defaultHeaders,
    body: JSON.stringify(packageData),
  });
  return handleResponse(res);
}

export async function deletePackage(id) {
  const res = await fetch(`${PACKAGES_URL}/${id}`, {
    method: "DELETE",
    headers: defaultHeaders,
  });
  return handleResponse(res);
}

export const TIERS = ["GOLD", "PLATINUM", "SILVER"];

export const VENDOR_CATEGORIES = [
  { value: "VIDEOGRAPHY",         label: "Videography" },
  { value: "FLORA",               label: "Flora" },
  { value: "CATERING",            label: "Catering" },
  { value: "PHOTOGRAPHY",         label: "Photography" },
  { value: "SOUNDS_AND_LIGHTING", label: "Sounds & Lighting" },
  { value: "DANCING_TEAM",        label: "Dancing Team" },
];

export const TIER_STYLES = {
  GOLD:     { bg: "bg-yellow-50", border: "border-yellow-400", badge: "bg-yellow-400 text-yellow-900", icon: "🥇" },
  PLATINUM: { bg: "bg-slate-50",  border: "border-slate-400",  badge: "bg-slate-400 text-slate-900",   icon: "🏆" },
  SILVER:   { bg: "bg-gray-50",   border: "border-gray-400",   badge: "bg-gray-300 text-gray-800",     icon: "🥈" },
};
