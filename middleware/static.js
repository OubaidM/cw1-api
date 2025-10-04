import express from 'express';
import path from 'path';
const router = express.Router();

router.use(express.static('public/images'));
router.use((req, res) => res.status(404).json({ error: 'Image not found' }));

export default router;