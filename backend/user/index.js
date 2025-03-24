// user-service/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model/user');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // Thêm middleware để parse JSON body

mongoose.connect('mongodb://localhost:27017/user_db')
  .then(() => console.log('Connected to MongoDB'));

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Thêm endpoint POST để thêm user
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Error adding user: ' + err.message });
  }
});

app.listen(3001, () => {
  console.log('User Service running on port 3001');
});