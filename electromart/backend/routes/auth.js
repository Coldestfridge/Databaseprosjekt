const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db.js");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const { username, password, firstname, lastname, address } = req.body;

    const hash = await bcrypt.hash(password, 12);
    
    const sqlLogin =
      "INSERT INTO loginDetails (username, password) VALUES (?, ?)";
    await db.promise().execute(sqlLogin, [username, hash]);

    const sqlUser = "INSERT INTO user (username) VALUES (?)";
    const [result] = await db.promise().execute(sqlUser, [username]);
    const userID = result.insertId;
    
    const sqlInfo =
      "INSERT INTO userInfo (userID, firstname, lastname, address) VALUES (?, ?, ?, ?)";
    await db.promise().execute(sqlInfo, [userID, firstname, lastname, address]);

    res.status(201).json({ message: "Account created", userID });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const sql = `SELECT u.userID, u.username, u.isPrivileged, l.password AS hash
                 FROM loginDetails l
                 JOIN user u ON l.username = u.username
                 WHERE l.username = ?`;

    const [rows] = await db.promise().execute(sql, [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.hash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        userID: user.userID,
        username: user.username,
        isPrivileged: user.isPrivileged,
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      userID: user.userID,
      username: user.username,
      isPrivileged: user.isPrivileged,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
