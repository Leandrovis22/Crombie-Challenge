import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHomeData } from '../services/homeService';
import { HomeData } from '../types/types';

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
