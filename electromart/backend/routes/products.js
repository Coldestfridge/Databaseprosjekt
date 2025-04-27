const express = require('express');
const db = require('../db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.promise().query(`
        SELECT productID AS id, name, price, description, stockQuantity 
        FROM product
        WHERE stockQuantity > 0
      `);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = router;
