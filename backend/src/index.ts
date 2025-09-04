import express from 'express';
import cors from 'cors';
import verifyRouter from './routes/verify';
import nonceRouter from './routes/nonce';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/nonce', nonceRouter);
app.use('/verify-signature', verifyRouter);

const port = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`));
}
export default app;
