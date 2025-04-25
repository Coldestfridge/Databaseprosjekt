// backend/index.js
const express = require("express");
const cors = require("cors");
const db = require("./db.js");

const productRoutes = require("./routes/products.js");
const authRoutes = require("./routes/auth.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

db.getConnection((err, conn) => {
  if (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
  console.log("Connected to DB");
  conn.release();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
