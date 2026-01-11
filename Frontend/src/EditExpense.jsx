import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";

function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const expenseData = res.data;

        setExpense({
          title: expenseData.title || "",
          category: expenseData.category || "",
          amount: expenseData.amount || "",
          date: expenseData.date
            ? new Date(expenseData.date).toISOString().split("T")[0]
            : "",
        });
      })
      .catch(() => {
        Swal.fire("Error", "Expense not found!", "error");
        navigate("/home");
      });
  }, [id, navigate]);


  function handleChange(e) {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors = {};

    if (!expense.title.trim()) {
      newErrors.title = "Title cannot be empty";
    }

    if (!expense.amount || isNaN(expense.amount) || Number(expense.amount) <= 0) {
      newErrors.amount = "Amount should be greater than 0";
    }

    if (!expense.date) {
      newErrors.date = "Please select a date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function updateExpense() {
    if (!validate()) 
      return;

    axios
      .put(`http://localhost:8080/api/expenses/${id}`, expense, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: "Updated Successfully!",
          text: "Your expense details are updated.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => navigate("/home"));
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update expense", "error");
      });
  }

  return (
    <Box p={3}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          ✏️ Edit Expense
        </Typography>

        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={expense.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
        />

        <TextField
          select
          label="Category"
          name="category"
          fullWidth
          margin="normal"
          value={expense.category}
          onChange={handleChange}
        >
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Rent">Rent</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField
          label="Amount"
          name="amount"
          fullWidth
          margin="normal"
          value={expense.amount}
          onChange={handleChange}
          error={!!errors.amount}
          helperText={errors.amount}
        />

        <TextField
          type="date"
          name="date"
          fullWidth
          margin="normal"
          value={expense.date}
          onChange={handleChange}
          error={!!errors.date}
          helperText={errors.date}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={updateExpense}
        >
          Update Expense
        </Button>
      </Paper>
    </Box>
  );
}

export default EditExpense;