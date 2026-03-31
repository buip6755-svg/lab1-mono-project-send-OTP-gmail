const express = require("express");
const app = express(); // 👈 QUAN TRỌNG

const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");

// Middleware
app.use(express.json());
// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
module.exports = app;