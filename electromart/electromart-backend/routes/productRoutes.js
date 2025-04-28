import express from 'express';
import pool from '../db/db.js';


const router = express.Router();


// Fetch all products
router.get('/products', async (req, res) => {
  try {
    const [products] = await pool.query(
      `SELECT p.*, c.name AS categoryName, b.name AS brandName
       FROM product p
       JOIN category c ON p.categoryID = c.categoryID
       JOIN brand b ON p.brandID = b.brandID`
    );
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
