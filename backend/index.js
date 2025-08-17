const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
const auth = require('./routes/auth');
const courses = require('./routes/courses');
const lessons = require('./routes/lessons');

app.use('/api/v1/auth', auth);
app.use('/api/v1/courses', courses);
app.use('/api/v1/lessons', lessons);
const content = require('./routes/toplevel_content');
app.use('/api/v1/content', content);
const certificates = require('./routes/certificates');
app.use('/api/v1/certificates', certificates);


const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
