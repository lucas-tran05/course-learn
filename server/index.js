const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
const authRoute = require('./src/routes/authentication');
const userRoute = require('./src/routes/user');
dotenv.config();


async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL_USERS);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

connectToDatabase();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
})

// Authentication : so sanh tt nguoi dung voi database
// Authorization : quyen han cua nguoi dung

//JWT : Json Web Token
