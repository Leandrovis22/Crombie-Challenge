import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from './authService';
import { User } from '../types/types';

interface HomeData {
  user: User;
}

export const useAuthRedirect = (setData: (data: HomeData | null) => void) => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await verifyToken(navigate);
      if (data) setData(data);
    };
    fetchData();
  }, [navigate, setData]);
};
