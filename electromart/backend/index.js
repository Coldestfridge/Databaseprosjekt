// backend/index.js
const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const productRoutes = require('./routes/products.js');
const authRoutes = require('./routes/auth.js');

// filepath: /electromart/backend/index.js
const path = require('path');
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));
console.log(path.join(__dirname, '../frontend/dist/index.html'));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Serve React frontend for all non-API routes
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

const connectToDatabase = () => {
    db.getConnection((err, conn) => {
        if (err) {
            console.error('DB connection failed, please wait while it starts:', err.message);
            setTimeout(connectToDatabase, 5000);
        } else {
            console.log('Connected to DB');
            conn.release();
        }
    });
};

connectToDatabase();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
