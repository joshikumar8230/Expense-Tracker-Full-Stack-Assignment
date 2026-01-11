import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense.jsx";
import Signin from "./Signin.jsx";
import Signup from "./Signup.jsx";
import Navbar from "./Navbar";
import ExpensePieChart from "./PieChart";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import { Container } from "@mui/material";

function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/signup"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname.toLowerCase());

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
       
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditExpense />
              </ProtectedRoute>
            }
          />

          <Route
            path="/piechart"
            element={
              <ProtectedRoute>
                <ExpensePieChart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;