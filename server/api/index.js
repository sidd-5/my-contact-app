const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('../models/Contact');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: "*", // Allow all origins for simplicity (or specify your frontend URL)
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Root Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Contact Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// IMPORTANT: Export app for Vercel
module.exports = app;
