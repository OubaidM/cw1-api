import { Router } from 'express';
import { ObjectId } from 'mongodb';
const router = Router();

// GET /lessons
router.get('/', async (req, res) => {
  const col = req.app.locals.db.collection('lessons');
  const docs = await col.find({}).toArray();
  res.json(docs);
});

// PUT /lessons/:id
router.put('/:id', async (req, res) => {
  const col = req.app.locals.db.collection('lessons');
  const result = await col.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json({ modified: result.modifiedCount });
});

export default router;