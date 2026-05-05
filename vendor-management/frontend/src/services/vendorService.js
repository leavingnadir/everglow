import axios from 'axios';

const API_BASE_URL = 'http://localhost:7070/api/vendors';

const vendorService = {
  // Auth endpoints
  register: async (vendorData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, vendorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get vendor info
  getVendorById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getVendorByEmail: async (email) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/email/${email}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get vendors list
  getAllVendors: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getActiveVendors: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/active`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Filter vendors
  getVendorsByCity: async (city) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/filter/city/${city}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getVendorsByBusinessType: async (businessType) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/filter/business-type/${businessType}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getVendorsByStatus: async (status) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/filter/status/${status}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update vendor
  updateVendor: async (id, vendorData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, vendorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete vendor
  deleteVendor: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Admin actions
  approveVendor: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}/approve`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  rejectVendor: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}/reject`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  suspendVendor: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}/suspend`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default vendorService;
