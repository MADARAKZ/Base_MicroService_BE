// shopping-service/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Cart = require('./model/shopping');

require('dotenv').config(); // load biến môi trường từ file .env

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping_db';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/shopping/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cart items: ' + err.message });
  }
});

app.post('/shopping/cart', async (req, res) => {
  try {
    const { name, price } = req.body;
    const newItem = new Cart({ name, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Error adding cart item: ' + err.message });
  }
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Shopping Service running on port ${port}`);
});
