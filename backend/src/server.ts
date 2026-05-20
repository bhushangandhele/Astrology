import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Import config to trigger SQLite database connection and check tables
import db from './config/database';

import astrologyRoutes from './routes/astrology.routes';
import profileRoutes from './routes/profile.routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5113;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/astrology', astrologyRoutes);
app.use('/api/profiles', profileRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static frontend assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`   COSMIC ASTROLOGY BACKEND SERVER STARTED        `);
  console.log(`==================================================`);
  console.log(`Server listening on port : http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`==================================================`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Closed SQLite database connection.');
    }
    process.exit(0);
  });
});
