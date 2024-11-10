import { Box, Typography, CircularProgress } from '@mui/material';
import { useHomeData } from '../hooks/useHomeData';
import UserInfoForm from '../components/UserInfoField';

const Home = () => {
  const { data, isLoading } = useHomeData();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!data) return null;

  const user = data;

  return (
    <Box className="form-container">
      <Box className="form" role="region" aria-label="User Information">
        <Typography 
          tabIndex={0} 
          variant="h1" 
          gutterBottom 
          sx={{ 
            fontSize: '2.25rem', 
            fontWeight: 800, 
            textAlign: 'center' 
          }}
        >
          User Information
        </Typography>
        <UserInfoForm user={user} />
      </Box>
    </Box>
  );
};

export default Home;