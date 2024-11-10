import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHomeData } from '../services/homeService';
import { HomeData } from '../types/types';

/**
 * Fetch home data for the authenticated user. It manages the state of the fetched home data and loading status.
 * It automatically triggers the data fetch on mount and handles redirection to the login page in case of an error.
 */

export const useHomeData = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchHomeData();
        setData(result);
      } catch (error) {
        console.error('Error loading home data:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeData();
  }, [navigate]);

  return { data, isLoading };
};
