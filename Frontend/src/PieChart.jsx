import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { Paper, Typography, Box } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

function ExpensePieChart() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    axios
      .get("http://localhost:8080/api/expenses", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "user-id": userId,
        },
      })
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("PieChart fetch error:", err));
  }, []);

  const categoryMap = {};
  expenses.forEach((exp) => {
    categoryMap[exp.category] =
      (categoryMap[exp.category] || 0) + exp.amount;
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  if (data.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
        No expense data to display
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        mt: 12,
      }}
    >
      <Paper
        sx={{
          p: 3,
          width: "600px",
           height: "400px",
          textAlign: "center",
          borderRadius: 3,
        }}
        elevation={4}
      >
        <Typography variant="h6" gutterBottom>
          📊 Expense Distribution
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
      </Paper>
    </Box>
  );
}

export default ExpensePieChart;