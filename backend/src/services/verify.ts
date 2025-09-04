import { recoverMessageAddress } from 'viem';
import { consumeNonce } from '../routes/nonce';

export async function recoverAndVerify(message: string, signature: `0x${string}`, nonce: string) {
  try {
    const full = `${nonce}:${message}`;
    const signer = await recoverMessageAddress({ message: full, signature });
    const consumed = consumeNonce(signer, nonce);
    if (!consumed) {
      return { isValid: false, signer, originalMessage: message, reason: 'nonce-mismatch-or-used' };
    }
    return { isValid: true, signer, originalMessage: message };
  } catch (err) {
    return { isValid: false, signer: null, originalMessage: message, reason: 'recover-failed' };
  }
}
