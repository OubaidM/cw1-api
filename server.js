import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
import logger from './middleware/logger.js';
import staticMw from './middleware/static.js';
import lessonRoutes from './routes/lessonRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(logger);
app.use('/images', staticMw);

MongoClient.connect(process.env.MONGO_URI)
  .then(client => {
    app.locals.db = client.db('afterSchool');
    app.listen(process.env.PORT, () => console.log('API on', process.env.PORT));
  })
  .catch(err => console.error(err));

app.use('/lessons', lessonRoutes);
app.use('/orders', orderRoutes);