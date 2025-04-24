// shopping-service/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Cart = require('./model/shopping');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://quantc:31012004@nt548-devops.68ujgah.mongodb.net/NT533?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/shopping/cart', async (req, res) => {
  const cartItems = await Cart.find();
  res.json(cartItems);
});

// Thêm endpoint POST để thêm item vào cart
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

app.listen(3003, () => {
  console.log('Shopping Service running on port 3003');
});