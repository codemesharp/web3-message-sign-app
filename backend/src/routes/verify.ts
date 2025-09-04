import { Router } from 'express';
import { z } from 'zod';
import { verifyController } from '../controllers/verify';

const router = Router();
const Body = z.object({ message: z.string().min(1), signature: z.string().regex(/^0x[0-9a-fA-F]+$/), nonce: z.string().min(1) });

router.post('/', async (req, res) => {
  try {
    const body = Body.parse(req.body);
    const out = await verifyController(body.message, body.signature, body.nonce);
    res.json(out);
  } catch (err: any) {
    res.status(400).json({ error: err?.message ?? 'Invalid request' });
  }
});

export default router;
