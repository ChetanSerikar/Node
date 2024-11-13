// const express = require("express");
// const app = express();
// const port = 3000;
// require("dotenv").config();

// app.get("/", (req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.end("Hello World!");
// });
// app.get("/api", () => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.end("Hello api!");
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// server.js

const express = require('express');
const connectDB = require('./config/database');
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
