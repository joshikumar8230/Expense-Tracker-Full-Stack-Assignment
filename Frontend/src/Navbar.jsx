import { AppBar, Toolbar, Button, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PaymentsIcon from "@mui/icons-material/Payments";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Expenses", path: "/home" },
    { label: "PieChart", path: "/PieChart" },
    { label: "Add Expense", path: "/add" },
    { label: "Profile", path: "/profile" },
    { label: "Sign Out", action: handleLogout },
  ];

  return (
    <AppBar position="sticky" sx={{ background: "#1f2c4c" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PaymentsIcon />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Expense Tracker
          </Typography>
        </Box>

        {/* Desktop Buttons */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: 2,
            alignItems: "center",
          }}
        >
          {menuItems.map((item, idx) =>
            item.path ? (
              <Button
                key={idx}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ "&:hover": { background: "rgba(255,255,255,0.15)" } }}
              >
                {item.label}
              </Button>
            ) : (
              <Button
                key={idx}
                color="inherit"
                onClick={item.action}
                sx={{ "&:hover": { background: "rgba(255,255,255,0.15)" } }}
              >
                {item.label}
              </Button>
            )
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {menuItems.map((item, idx) =>
              item.path ? (
                <MenuItem
                  key={idx}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                >
                  {item.label}
                </MenuItem>
              ) : (
                <MenuItem key={idx} onClick={() => { item.action(); handleMenuClose(); }}>
                  {item.label}
                </MenuItem>
              )
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
