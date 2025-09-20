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

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let backendUrl = import.meta.env.VITE_API_BASE_URL;
    if (!backendUrl || window.location.hostname.endsWith('.github.dev')) {
    const currentUrl = new URL(window.location.href);
    const portToUse = currentUrl.port === '80' ? '3001' : currentUrl.port;
    backendUrl = `${currentUrl.protocol}//${currentUrl.hostname.replace(portToUse, '3001')}`;
    }
    try {
      await axios.post(`${backendUrl}/auth/login`, { username, password });
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
              Register
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  Sudah punya akun?{' '}
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    Login
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

export default RegisterPage;