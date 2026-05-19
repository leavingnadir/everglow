import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/vendors`;

export const fetchVendors = async (category = "") => {
  const url = category
    ? `${API_URL}?category=${encodeURIComponent(category)}`
    : API_URL;

  const res = await axios.get(url);
  return res.data;
};

export const fetchVendorById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createVendor = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateVendor = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteVendor = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};