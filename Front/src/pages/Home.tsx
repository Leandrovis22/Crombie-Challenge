import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { User } from '../types/types';
import UserInfoForm from '../components/UserInfoField';


interface HomeData {
  user: User;
}

const Home = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL ?
            `${process.env.REACT_APP_API_BASE_URL}/home`
            : `http://localhost:3001/home`}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verifyToken();
  }, [navigate]);

  if (!data) {
    return <Typography></Typography>;
  }

  const { user } = data;

  return (
    <>
      <Box className="form-container">
        <Box className="form" role="region" aria-label="User Information">
          <Typography tabIndex={0} variant="h1" gutterBottom sx={{ fontSize: '2.25rem', fontWeight: 800, textAlign: 'center' }}>User Information</Typography>
          
          <UserInfoForm user={user} />
          
        </Box>
      </Box>
    </>
  );
};

export default Home;

