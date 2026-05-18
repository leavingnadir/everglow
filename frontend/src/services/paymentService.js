import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/payments`;

const paymentService = {
  getAllPayments: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },

  getPaymentById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  createPayment: async (data) => {
    const res = await axios.post(API_URL, data);
    return res.data;
  },

  updatePayment: async (id, data) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  },

  deletePayment: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },
};

export default paymentService;