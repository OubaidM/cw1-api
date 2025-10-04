import { Router } from 'express';
const router = Router();

// GET /search?q=abc
router.get('/search', async (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q) return res.json([]);

  const col = req.app.locals.db.collection('lessons');
  const results = await col
    .aggregate([
      {
        $addFields: {
          priceStr: { $toString: '$price' },
          spaceStr: { $toString: '$space' }
        }
      },
      {
        $match: {
          $or: [
            { topic: { $regex: q, $options: 'i' } },
            { location: { $regex: q, $options: 'i' } },
            { priceStr: { $regex: q, $options: 'i' } },
            { spaceStr: { $regex: q, $options: 'i' } }
          ]
        }
      },
      { $project: { priceStr: 0, spaceStr: 0 } } // drop temp fields
    ])
    .toArray();

  res.json(results);
});

export default router;