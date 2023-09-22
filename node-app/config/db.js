const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!!!!!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;