const express = require("express");
const db = require("../db.js");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT u.userID, u.username, u.isPrivileged
               FROM loginDetails l
               JOIN user u ON l.username = u.username
               WHERE l.username = ? AND l.password = ?`;

  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    res.json(results[0]);
  });
});

module.exports = router;