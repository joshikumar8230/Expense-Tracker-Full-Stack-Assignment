import { 
  Avatar, Button, CssBaseline, TextField, Toolbar,
  Box, Typography, Container, Paper, Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";
import Swal from 'sweetalert2';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1f2c4c",
    },
  },
});

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8080/signup", {
        username,
        password,
      });

      Swal.fire({
        icon: 'success',
        title: 'Signup Successful!',
        text: 'You can now log in to start tracking your expenses.',
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/"); 
      });

    } catch (error) {
    
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.response?.data?.message || 'Server error or username already exists',
        confirmButtonColor: "#3085d6",
      });
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#1f2c4c",
          pt: 4,
        }}
      >
        <Toolbar sx={{ color: "white" }}>
          <Avatar sx={{ mr: 2, bgcolor: "white", color: "#1f2c4c" }}>💰</Avatar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Expense Tracker
          </Typography>
        </Toolbar>

        <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "rgba(255,255,255,0.95)",
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">

              <Avatar sx={{ mb: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>

              <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
                Create Account ✨
              </Typography>

              <Typography sx={{ mb: 2, color: "gray", textAlign: "center" }}>
                Sign up to start tracking your expenses
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  margin="normal"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  margin="normal"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.3,
                    borderRadius: 2,
                    fontSize: "1rem",
                    textTransform: "none",
                  }}
                >
                  Sign Up
                </Button>
              </Box>

              <Typography sx={{ mt: 2 }}>
                <Link href="/" underline="hover" style={{ fontWeight: 500 }}>
                  Already have an account? Sign in
                </Link>
              </Typography>

            </Box>
          </Paper>
        </Container>

      </Box>
    </ThemeProvider>
  );
}
