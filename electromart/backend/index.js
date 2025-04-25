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

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
