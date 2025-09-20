import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline
} from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f4f6f8'
    }
  },
});

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Pengguna';

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Aplikasi Saya
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>        
        <Container component="main" sx={{ mt: 10, p: 3 }}>
          <Box
            sx={{
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: 'white',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Selamat Datang, {username}!
            </Typography>
            <Typography variant="body1">
              Anda telah berhasil login ke dalam sistem. Ini adalah halaman utama Anda.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
export default HomePage;