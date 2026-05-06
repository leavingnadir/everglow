// src/services/paymentService.js
// Connects Spring Boot backend

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";

const paymentService = {
  getAllPayments: async () => {
    const res = await fetch(`${BASE_URL}/payments`);
    if (!res.ok) throw new Error("Failed to fetch payments");
    return res.json();
  },

  getPaymentById: async (id) => {
    const res = await fetch(`${BASE_URL}/payments/${id}`);
    if (!res.ok) throw new Error("Failed to fetch payment");
    return res.json();
  },

  createPayment: async (data) => {
    const res = await fetch(`${BASE_URL}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create payment");
    return res.json();
  },

  updatePayment: async (id, data) => {
    const res = await fetch(`${BASE_URL}/payments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update payment");
    return res.json();
  },

  deletePayment: async (id) => {
    const res = await fetch(`${BASE_URL}/payments/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete payment");
    return true;
  },
};

export default paymentService;
