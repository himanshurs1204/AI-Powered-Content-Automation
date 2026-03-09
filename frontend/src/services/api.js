// src/services/api.js
// Centralized API service for all backend calls
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }),
  login: (email, password) => api.post("/auth/login", { email, password }),
  getMe: () => api.get("/auth/me"),
};

// AI Generation APIs
export const aiAPI = {
  generateBlogTitles: (topic, audience) =>
    api.post("/ai/blog-titles", { topic, audience }),
  generateYoutubeScript: (topic, videoLength) =>
    api.post("/ai/youtube-script", { topic, videoLength }),
  generateThumbnail: (videoTitle, style) =>
    api.post("/ai/thumbnail", { videoTitle, style }),
};

// Content APIs
export const contentAPI = {
  getAllContent: (type) => api.get("/content", { params: { type } }),
  getContentById: (id) => api.get(`/content/${id}`),
  deleteContent: (id) => api.delete(`/content/${id}`),
  getContentStats: () => api.get("/content/stats"),
};

// Calendar APIs
export const calendarAPI = {
  createEntry: (data) => api.post("/calendar", data),
  getEntries: (startDate, endDate) =>
    api.get("/calendar", { params: { startDate, endDate } }),
  updateEntry: (id, data) => api.put(`/calendar/${id}`, data),
  deleteEntry: (id) => api.delete(`/calendar/${id}`),
};

export default api;
