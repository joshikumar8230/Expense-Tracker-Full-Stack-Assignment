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