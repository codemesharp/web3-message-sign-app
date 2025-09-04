import { recoverAndVerify } from '../services/verify';

export async function verifyController(message: string, signature: string, nonce: string) {
  const res = await recoverAndVerify(message, signature as `0x${string}`, nonce);
  return res;
}
