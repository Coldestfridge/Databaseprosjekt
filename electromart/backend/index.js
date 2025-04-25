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

const connectToDatabase = () => {
  db.getConnection((err, conn) => {
    if (err) {
      console.error("DB connection failed, please wait while it starts:", err.message);
      setTimeout(connectToDatabase, 5000);
    } else {
      console.log("Connected to DB");
      conn.release();
    }
  });
};

connectToDatabase();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
