import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import { Box } from '@mui/material';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Box className="main-container">
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Box>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
