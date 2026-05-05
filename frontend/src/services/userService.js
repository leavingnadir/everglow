// src/services/userService.js
// All API calls for user management — matches UserController.java endpoints

const BASE_URL = "http://localhost:8081/api/users";

// ─── Helper ────────────────────────────────────────────────────────────────────

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

// ─── Auth ──────────────────────────────────────────────────────────────────────

/**
 * POST /api/users/login
 * Returns UserResponseDTO (id, name, email, role, ...)
 */
export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

/**
 * POST /api/users/register
 */
export async function registerUser(userData) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
}

// ─── CRUD ──────────────────────────────────────────────────────────────────────

/**
 * GET /api/users  — all users (admin)
 */
export async function getAllUsers() {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

/**
 * GET /api/users/:id
 */
export async function getUserById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
}

/**
 * PUT /api/users/:id
 */
export async function updateUser(id, userData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
}

/**
 * DELETE /api/users/:id  — hard delete
 */
export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return handleResponse(res);
}

/**
 * PATCH /api/users/:id/deactivate  — soft delete
 */
export async function deactivateUser(id) {
  const res = await fetch(`${BASE_URL}/${id}/deactivate`, { method: "PATCH" });
  return handleResponse(res);
}
