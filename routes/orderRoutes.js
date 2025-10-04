import { Router } from 'express';
import { ObjectId } from 'mongodb';
const router = Router();

// POST /orders
router.post('/', async (req, res) => {
  const { name, phone, lessonIDs, space } = req.body;
  if (!name || !phone || !lessonIDs || !Array.isArray(lessonIDs) || space === undefined) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const col = req.app.locals.db.collection('orders');
  const result = await col.insertOne({ name, phone, lessonIDs, space });
  res.status(201).json({ insertedId: result.insertedId });
});

export default router;