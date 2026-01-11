import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, MenuItem, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title cannot be empty";
    if (!amount || isNaN(amount) || Number(amount) <= 0) newErrors.amount = "Amount should be greater than 0";
    if (!date) newErrors.date = "Please select a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function saveExpense(e) {
    e.preventDefault();
    if (!validate()) return;
    const userId = sessionStorage.getItem("userId");

    try {
    await axios.post(
      "http://localhost:8080/api/expenses",
      { title, category, amount, date },
      {        headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "user-id": userId
    } } 
    );

      await Swal.fire({
        icon: "success",
        title: "Expense Added",
        text: "Your expense has been saved successfully!",
        timer: 1500,
        showConfirmButton: false
      });

      navigate("/home");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while saving expense."
      });
    }
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Add Expense</Typography>
      <form onSubmit={saveExpense} noValidate>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
        />

        <TextField
          select
          label="Category"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Rent">Rent</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField
          label="Amount"
          fullWidth
          margin="normal"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={!!errors.amount}
          helperText={errors.amount}
          inputProps={{ min: 0 }}
        />

        <TextField
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={!!errors.date}
          helperText={errors.date}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={!title || !amount || !date} 
        >
          Save
        </Button>
      </form>
    </Box>
  );
}

export default AddExpense;