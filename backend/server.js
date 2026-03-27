import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
dotenv.config();
import { connectDB } from './config/db.js';

connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
import authRoutes    from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes    from './routes/taskRoutes.js';
import noteRoutes    from './routes/noteRoutes.js';
import aiRoutes      from './routes/aiRoutes.js';

app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks',    taskRoutes);
app.use('/api/notes',    noteRoutes);
app.use('/api/ai',       aiRoutes);

app.get('/', (req, res) => res.send('SmartDesk API is running...'));

// Error handling middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
