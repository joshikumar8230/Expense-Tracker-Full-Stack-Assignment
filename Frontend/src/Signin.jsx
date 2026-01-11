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

export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userId", response.data.userId);

      navigate("/home");

    } catch (error) {
     
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid username or password",
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
                Welcome Back 👋
              </Typography>

              <Typography sx={{ mb: 2, color: "gray", textAlign: "center" }}>
                Log in to track your daily expenses
              </Typography>

              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  label="Username"
                  margin="normal"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{
                    mt: 3,
                    py: 1.3,
                    borderRadius: 2,
                    fontSize: "1rem",
                    textTransform: "none"
                  }}
                >
                  Sign In
                </Button>
              </Box>

              <Typography sx={{ mt: 2 }}>
                <Link href="/signup" underline="hover" style={{ fontWeight: 500 }}>
                  Create an account
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
