// dashboard-service/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Dashboard = require('./model/dashboard');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard_db';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/dashboard', async (req, res) => {
  try {
    const data = await Dashboard.findOne();
    res.json(data || { sales: 0, users: 0 });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching dashboard data: ' + err.message });
  }
});

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

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Dashboard Service running on port ${port}`);
});
