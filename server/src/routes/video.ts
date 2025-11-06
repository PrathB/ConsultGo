import express from 'express';
import { createRoom } from '../lib/daily';
const router = express.Router();

router.post('/room', async (req, res) => {
  try {
    const room = await createRoom();
    res.json(room);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Could not create video room' });
  }
});

export default router;
