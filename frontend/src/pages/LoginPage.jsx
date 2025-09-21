import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Grid
} from '@mui/material';
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f4f6f8'
    }
  },
});
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/login`, { username, password });
      alert('Login berhasil!');
      navigate('/home', { state: { username: username } }); 
    } catch (error) {
      alert('Login gagal: ' + (error.response?.data?.message || 'Server tidak merespon'));
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Login
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  Belum punya akun?{' '}
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    Register
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
export default LoginPage;