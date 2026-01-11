Expense Tracker – Full Stack Web Application

This repository contains a full-stack Expense Tracker web application built as part of a Frontend Developer Intern assignment. The project demonstrates modern frontend development with React, secure backend APIs with Node.js/Express, and proper authentication, authorization, and CRUD functionality.

🚀 Project Overview

The Expense Tracker allows users to:

Create an account and log in securely

Access a protected dashboard

Manage personal expenses (Create, Read, Update, Delete)

Search and filter expenses by category

View and manage their profile

Log out securely

The application is designed with scalability, security, and clean architecture in mind.

🧩 Tech Stack Frontend

React.js

Material UI (MUI) for responsive UI

React Router for routing & protected routes

Axios for API communication

SweetAlert2 for user-friendly alerts

Backend

Node.js

Express.js

MongoDB with Mongoose

JWT (JSON Web Tokens) for authentication

bcrypt for password hashing

dotenv for environment configuration

🔐 Authentication & Security

Passwords are hashed using bcrypt before storage

JWT-based authentication

Protected routes on both frontend and backend

Token validation middleware

Secure logout by clearing tokens

Proper error handling and validation

📊 Dashboard Features

Fetch and display logged-in user profile

Expense CRUD operations

Search expenses by keyword

Filter expenses by category

Responsive layout for mobile, tablet, and desktop

🧪 API Endpoints

Authentication

POST /signup – Register user
POST /login – Login user (JWT issued)

User Profile

GET /api/users/:id – Fetch logged-in user profile
PUT /api/users/:id/update-password – Update password
POST /api/users/verify-password – Verify current password

Expenses

POST /api/expenses – Create expense
GET /api/expenses – Get all expenses
GET /api/expenses/:id – Get single expense
PUT /api/expenses/:id – Update expense
DELETE /api/expenses/:id – Delete expense

🧾 Environment Variables (.env)

PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

▶️ Running the Project Locally

Backend

PS K:\Expense Tracker – Full Stack Assignment\Expense Tracker – Full Stack Assignment\Backend> node app.mjs 
[dotenv@17.2.3] injecting env (3) from .env -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops
Server running on http://localhost:8080
MongoDB connected

Frontend

PS K:\Expense Tracker – Full Stack Assignment\Expense Tracker – Full Stack Assignment\Frontend\src> npm run dev
> expense@0.0.0 dev
> vite
  VITE v7.2.4  ready in 475 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

📈 Scalability Notes (Production Readiness)

To scale this application for production:

Separate frontend and backend deployments

Use environment-based configs

Move to cloud-managed DB (MongoDB Atlas)

📬 Submission Notes

This project satisfies all assignment requirements:

Secure authentication

Protected dashboard

CRUD-enabled entity

Responsive UI

Clean and scalable architecture

Thank you for reviewing this assignment 🙌