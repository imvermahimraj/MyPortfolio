import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const apiService = {
  // Contact API
  submitContactMessage: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Contact submission error:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to send message. Please try again.',
      };
    }
  },

  // Analytics API
  trackPageView: async (section = null) => {
    try {
      await api.post('/analytics/view', { section });
      return { success: true };
    } catch (error) {
      console.error('Analytics tracking error:', error);
      // Don't throw error for analytics - fail silently
      return { success: false };
    }
  },

  getAnalyticsStats: async () => {
    try {
      const response = await api.get('/analytics/stats');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Analytics fetch error:', error);
      return {
        success: false,
        data: { total_views: 0, contact_messages: 0, unique_visitors: 0 },
      };
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Health check error:', error);
      return {
        success: false,
        error: 'Backend service unavailable',
      };
    }
  },
};

export default api;