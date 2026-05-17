require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Remove any existing CORS headers and set correct ones
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// CORS middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/admin/auth", require("./routes/admin/adminAuthRoutes"));
app.use("/api/admin/labs", require("./routes/admin/labRoutes"));
app.use("/api/admin/tests", require("./routes/admin/testRoutes"));

// Health check
app.get("/", (req, res) => {
  res.send("API Running");
});

// Start server
const PORT = process.env.PORT || 5300;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});