import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { Wallet } from 'ethers';

let server: any;
beforeAll(() => {
  server = app.listen(0);
});
afterAll(() => server.close());

describe('POST /verify-signature (with nonce)', () => {
  it('verifies a valid signature with nonce challenge', async () => {
    const wallet = Wallet.createRandom();
    const address = wallet.address;
    const nonceRes = await request(server).post('/nonce').send({ address });
    expect(nonceRes.status).toBe(200);
    const nonce = nonceRes.body.nonce;
    const message = 'Hello from test with nonce';
    const full = `${nonce}:${message}`;
    const signature = await wallet.signMessage(full);
    const res = await request(server).post('/verify-signature').send({ message, signature, nonce });
    expect(res.status).toBe(200);
    expect(res.body.isValid).toBe(true);
    expect(res.body.signer.toLowerCase()).toBe(wallet.address.toLowerCase());
  });

  it('rejects reused nonce', async () => {
    const wallet = Wallet.createRandom();
    const address = wallet.address;
    const nonceRes = await request(server).post('/nonce').send({ address });
    const nonce = nonceRes.body.nonce;
    const message = 'Msg';
    const full = `${nonce}:${message}`;
    const signature = await wallet.signMessage(full);
    const r1 = await request(server).post('/verify-signature').send({ message, signature, nonce });
    expect(r1.body.isValid).toBe(true);
    const r2 = await request(server).post('/verify-signature').send({ message, signature, nonce });
    expect(r2.body.isValid).toBe(false);
    expect(r2.body.reason).toBeDefined();
  });

  it('rejects invalid signature', async () => {
    const message = 'Hello';
    const signature = '0x' + '00'.repeat(65);
    const res = await request(server).post('/verify-signature').send({ message, signature, nonce: 'abc' });
    expect(res.status).toBe(200);
    expect(res.body.isValid).toBe(false);
  });
});
