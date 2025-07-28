import { useEffect, useState } from 'react';
import { apiService } from '../services/api';

// Custom hook for page view tracking
export const usePageView = (sectionName) => {
  useEffect(() => {
    const trackView = async () => {
      try {
        await apiService.trackPageView(sectionName);
      } catch (error) {
        // Silently fail - analytics shouldn't break user experience
        console.debug('Analytics tracking failed:', error);
      }
    };

    // Track view after a short delay to ensure proper loading
    const timeoutId = setTimeout(trackView, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [sectionName]);
};

// Hook for fetching analytics stats
export const useAnalyticsStats = () => {
  const [stats, setStats] = useState({
    total_views: 0,
    contact_messages: 0,
    unique_visitors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await apiService.getAnalyticsStats();
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch analytics stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};