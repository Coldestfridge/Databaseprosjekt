import express from 'express';
import pool from '../db/db.js';

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { username, password, firstName, lastName, address } = req.body;
  try {
    const [loginResult] = await pool.query('INSERT INTO loginDetails (username, password) VALUES (?, ?)', [username, password]);
    const [userResult] = await pool.query('INSERT INTO user (username) VALUES (?)', [username]);
    const userID = userResult.insertId;
    await pool.query('INSERT INTO userInfo (userID, firstname, lastname, address) VALUES (?, ?, ?, ?)', [userID, firstName, lastName, address]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query(
      `SELECT loginDetails.password, 
              user.userID, 
              user.username, 
              userInfo.firstname, 
              userInfo.lastname, 
              userInfo.address
       FROM loginDetails
       JOIN user ON loginDetails.username = user.username
       JOIN userInfo ON user.userID = userInfo.userID
       WHERE loginDetails.username = ?`,
      [username]
    );

    if (rows.length > 0 && rows[0].password === password) {
      const user = {
        userID: rows[0].userID,
        username: rows[0].username,
        firstname: rows[0].firstname,   // Map lowercase DB to camelCase
        lastname: rows[0].lastname,
        address: rows[0].address
      };
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/updateProfile', async (req, res) => {
  const { userID, firstname, lastname, address, username, password } = req.body;

  try {
    // Update userInfo table
    await pool.query(
      `UPDATE userInfo 
       SET firstname = ?, lastname = ?, address = ? 
       WHERE userID = ?`,
      [firstname, lastname, address, userID]
    );

    // Update username and/or password in loginDetails
    if (username || password) {
      const updates = [];
      const params = [];

      if (username) {
        updates.push("username = ?");
        params.push(username);
      }
      if (password) {
        updates.push("password = ?");
        params.push(password);
      }

      params.push(userID);

      await pool.query(
        `UPDATE loginDetails 
         SET ${updates.join(", ")}
         WHERE username = (SELECT username FROM user WHERE userID = ?)`,
        params
      );

      // Update user table username too
      if (username) {
        await pool.query(
          `UPDATE user
           SET username = ?
           WHERE userID = ?`,
          [username, userID]
        );
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


export default router;
