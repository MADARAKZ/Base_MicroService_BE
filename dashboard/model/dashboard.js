// dashboard-service/models/Dashboard.js
const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  sales: { type: Number, default: 0 },
  users: { type: Number, default: 0 }
});

module.exports = mongoose.model('Dashboard', dashboardSchema);