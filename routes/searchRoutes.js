import { Router } from 'express';
const router = Router();

// GET /search?q=abc
router.get('/search', async (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q) return res.json([]);

  const col = req.app.locals.db.collection('lessons');
  const filter = {
    $or: [
      { topic: { $regex: q, $options: 'i' } },
      { location: { $regex: q, $options: 'i' } },
      { price: { $regex: q, $options: 'i' } },
      { space: { $regex: q, $options: 'i' } }
    ]
  };
  const results = await col.find(filter).toArray();
  res.json(results);
});

export default router;