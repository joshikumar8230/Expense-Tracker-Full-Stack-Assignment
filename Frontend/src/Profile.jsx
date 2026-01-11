import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";

function Profile() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true); 
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
   
    const fetchUser = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("token");

        const res = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsername(res.data.username);
      } catch (err) {
        console.error(err);
        setError("Failed to load user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const verifyCurrentPassword = async () => {
    setError("");
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");

      const res = await axios.post(
        `http://localhost:8080/api/users/verify-password`,
        { userId, password: currentPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.valid) {
        setPasswordVerified(true);
        Swal.fire("Verified!", "You can now set a new password.", "success");
      } else {
        setError("Current password is incorrect.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while verifying password.");
    }
  };

  const updatePassword = async () => {
    setError("");
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");

      await axios.put(
        `http://localhost:8080/api/users/${userId}/update-password`,
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success!", "Password updated successfully.", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordVerified(false);
    } catch (err) {
      console.error(err);
      setError("Failed to update password.");
    }
  };

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Paper elevation={4} sx={{ p: 4, width: 400, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Username: <strong>{username}</strong>
        </Typography>

        {!passwordVerified && (
          <>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              sx={{ mb: 2 }}
              autoComplete="current-password"
            />
            <Button
              variant="contained"
              fullWidth
              onClick={verifyCurrentPassword}
            >
              Verify Current Password
            </Button>
          </>
        )}

        {passwordVerified && (
          <>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2, mt: 2 }}
              autoComplete="new-password"
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
              autoComplete="new-password"
            />
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={updatePassword}
            >
              Update Password
            </Button>
          </>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Box>
  );
}

export default Profile;
