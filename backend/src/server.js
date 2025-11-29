import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './libs/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import { protectedRoute } from './middlewares/authMiddleware.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);

// Routes
app.use('/api/auth', authRoutes);

app.use(protectedRoute);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
	res.json({ status: 'OK', message: 'Server is running' });
});

// Start server after DB connection
const startServer = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT} 🎇`);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
};

startServer();
