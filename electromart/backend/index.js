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

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// --- Asynkron database‐kobling med promise‐API ---
async function connectToDatabase() {
  try {
    // db er nå en mysql2/promise‐pool
    const conn = await db.getConnection();
    console.log("Connected to DB");
    conn.release();
  } catch (err) {
    console.log("DB connection failed, retry in 5s:", err.message);
    setTimeout(connectToDatabase, 5000);
  }
}

+connectToDatabase();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
