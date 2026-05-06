import axios from 'axios';

const API_URL = 'http://localhost:8080/api/vendors';

export const fetchVendors = async (category = '') => {
  try {
    const url = category ? `${API_URL}?category=${encodeURIComponent(category)}` : API_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
};

export const fetchVendorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vendor with id ${id}:`, error);
    throw error;
  }
};

export const createVendor = async (vendorData) => {
  try {
    const response = await axios.post(API_URL, vendorData);
    return response.data;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error;
  }
};

export const updateVendor = async (id, vendorData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, vendorData);
    return response.data;
  } catch (error) {
    console.error(`Error updating vendor with id ${id}:`, error);
    throw error;
  }
};

export const deleteVendor = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting vendor with id ${id}:`, error);
    throw error;
  }
};
