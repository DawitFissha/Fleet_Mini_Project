import express, { Request, Response } from 'express';
import routes from './routes';
import dotenv from 'dotenv'
import connectDB from './config/db';
import cors from 'cors'
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );
// Routes
app.use('/', routes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
