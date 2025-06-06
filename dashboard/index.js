// dashboard-service/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Dashboard = require('./model/dashboard');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://quantc:31012004@nt548-devops.68ujgah.mongodb.net/NT533?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/dashboard', async (req, res) => {
  const data = await Dashboard.findOne();
  res.json(data || { sales: 0, users: 0 });
});

// Thêm endpoint POST để cập nhật dashboard
app.post('/dashboard', async (req, res) => {
  try {
    const { sales, users } = req.body;
    let dashboard = await Dashboard.findOne();
    if (!dashboard) {
      dashboard = new Dashboard({ sales, users });
    } else {
      dashboard.sales = sales;
      dashboard.users = users;
    }
    await dashboard.save();
    res.status(201).json(dashboard);
  } catch (err) {
    res.status(500).json({ error: 'Error updating dashboard: ' + err.message });
  }
});

app.listen(3002, () => {
  console.log('Dashboard Service running on port 3002');
});