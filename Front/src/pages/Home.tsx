import { Box, Typography, CircularProgress } from '@mui/material';
import { useHomeData } from '../hooks/useHomeData';
import UserInfoForm from '../components/UserInfoField';

/**
 * Home component that displays the user's information.
 * It fetches user data using the `useHomeData` hook and displays a loading indicator
 * while data is being fetched. If the data fetch fails, a message is displayed.
 * Once the data is successfully fetched, it renders the `UserInfoForm` component
 * to display the user's information.
 */

const Home = () => {

  const { data, isLoading } = useHomeData();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h3" component="p" sx={{ textAlign: 'center', fontSize: '1.5rem' }}>
          Something went wrong. <br /> Please try again later.
        </Typography>
      </Box>
    );
  }

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