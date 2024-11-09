import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { User } from '../types/types';
import { UserInfoField } from '../components/UserInfoField';


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
        <Box className="form">
          <Typography variant="h1" gutterBottom sx={{ fontSize: '2.25rem', fontWeight: 800, textAlign: 'center' }}>User Information</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingTop: '0.8rem' }}>
            <UserInfoField label="ID" value={String(user.id)} />
            <UserInfoField label="First Name" value={user.first_name} />
            <UserInfoField label="Last Name" value={user.last_name} />
            <UserInfoField label="Email" value={user.email} />
            <UserInfoField label="Address" value={user.address} />
            <UserInfoField label="Loan Amount" value={String(user.loan_amount)} />
            <UserInfoField label="Date of Birth" value={dayjs(user.date_of_birth).format('YYYY-MM-DD')} />
            <UserInfoField label="Phone Number" value={user.phone_number} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;

