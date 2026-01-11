import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Paper,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  function loadExpenses() {
    axios
      .get("http://localhost:8080/api/expenses", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err));
  }

  async function deleteExpense(id) {
    const result = await Swal.fire({
      title: "Delete Expense?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      await axios.delete(`http://localhost:8080/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      Swal.fire("Deleted!", "Expense has been removed.", "success");
      loadExpenses();
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  function sortBy(field) {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  // Filter logic
  const filteredExpenses = expenses
    .filter((e) => (category === "All" ? true : e.category === category))
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));

  // Sort logic
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (!sortField) return 0;

    let x = a[sortField];
    let y = b[sortField];

    if (sortField === "date") {
      x = new Date(x).getTime();
      y = new Date(y).getTime();
    }

    return sortOrder === "asc" ? x - y : y - x;
  });

  return (
    <Box p={2} sx={{ maxWidth: 1200, mx: "auto" }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontWeight={600}
        >
          💰 Expense Tracker
        </Typography>

        {/* Filters */}
        <Box
          mb={2}
          display="flex"
          flexWrap="wrap"
          gap={2}
          justifyContent="center"
        >
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ flex: 1, minWidth: 140 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField
            label="Search by Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 2, minWidth: 180 }}
          />
        </Box>

        {/* Responsive Table */}
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "60vh",
            overflowX: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedExpenses.map((expense) => (
                <TableRow key={expense._id} hover>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>₹{expense.amount}</TableCell>
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/edit/${expense._id}`}
                      size="small"
                      variant="outlined"
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteExpense(expense._id)}
                      size="small"
                      color="error"
                      variant="contained"
                      sx={{ ml: { xs: 0, sm: 1 }, mt: { xs: 1, sm: 0 } }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default Home;
