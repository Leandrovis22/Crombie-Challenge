import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { User } from '../types/types';
import UserInfoForm from '../components/UserInfoField';
import { useAuthRedirect } from '../auth/useAuthRedirect';

interface HomeData {
  user: User;
}

const Home = () => {
  const [data, setData] = useState<HomeData | null>(null);

  useAuthRedirect(setData);

  if (!data) return <Typography></Typography>;

  const { user } = data;

  return (
    <Box className="form-container">
      <Box className="form" role="region" aria-label="User Information">

        <Typography tabIndex={0} variant="h1" gutterBottom sx={{ fontSize: '2.25rem', fontWeight: 800, textAlign: 'center' }}>
          User Information
        </Typography>

        <UserInfoForm user={user} />

      </Box>
    </Box>
  );
};

export default Home;
