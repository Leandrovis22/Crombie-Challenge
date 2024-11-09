import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from './authService';

export const useAuthRedirect = (setData: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await verifyToken(navigate);
      if (data) setData(data);
    };
    fetchData();
  }, [navigate, setData]);
};