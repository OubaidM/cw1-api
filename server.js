import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
import logger from './middleware/logger.js';
import staticMw from './middleware/static.js';
import lessonRoutes from './routes/lessonRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import searchRoutes from './routes/searchRoutes.js'
import cors from 'cors';

app.use(cors());

dotenv.config();
const app = express();
app.use(express.json());
app.use(logger);
app.use('/images', staticMw);

const PORT = process.env.PORT || 4000;

MongoClient.connect(process.env.MONGO_URI)
  .then(client => {
    app.locals.db = client.db('afterSchool');
    app.listen(PORT, () => console.log('API on', PORT));   // ← only once
  })
  .catch(err => console.error(err));

app.use('/lessons', lessonRoutes);
app.use('/orders', orderRoutes);
app.use('/', searchRoutes);