// src/services/bookingService.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/bookings`;

export const fetchBookings = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createBooking = async (bookingData) => {
  const res = await axios.post(API_URL, bookingData);
  return res.data;
};