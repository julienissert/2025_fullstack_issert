import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import debug from 'debug';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';


const logger = debug('back:init');
logger('Debug service launched');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });
logger(`ENV charged : ${process.env.NODE_ENV}`);


const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Id'],
  credentials: true
}));
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
  .then(() => logger(`MongoDB connected to db ${process.env.DB_NAME}`))
  .catch(err => logger(err));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/uploads', express.static('uploads'));

app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});


app.listen(process.env.BACK_PORT, () => {
  logger(`Server running on port ${process.env.BACK_PORT}`);
  logger(`Front running on : ${process.env.FRONT_URL}`);
});