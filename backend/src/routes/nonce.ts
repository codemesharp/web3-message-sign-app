import { Router } from 'express';
import crypto from 'crypto';

const router = Router();
// in-memory nonce store: address -> nonce
const nonces: Record<string, string> = {};

router.post('/', (req, res) => {
  const { address } = req.body;
  if (!address || typeof address !== 'string') return res.status(400).json({ error: 'address required' });
  const nonce = crypto.randomBytes(16).toString('hex');
  nonces[address.toLowerCase()] = nonce;
  return res.json({ nonce });
});

export function consumeNonce(address: string, nonce: string) {
  const cur = nonces[address.toLowerCase()];
  if (!cur) return false;
  if (cur !== nonce) return false;
  delete nonces[address.toLowerCase()];
  return true;
}

export default router;
