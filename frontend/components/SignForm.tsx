'use client';

import { useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { makeRequest } from '../lib/request';

type SignEntry = {
  message: string;
  signature: string;
  verified: boolean;
  createdAt: string;
};

interface SignFormProps {
  onAdd: (entry: SignEntry) => void;
}

export default function SignForm({ onAdd }: SignFormProps) {
  const { user, primaryWallet, setShowAuthFlow, handleLogOut } =
    useDynamicContext();
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSign(): Promise<void> {
    if (!primaryWallet) {
      setShowAuthFlow(true);
      return;
    }

    setLoading(true);

    try {
      const address: string = primaryWallet.address;

      const nonceResp = await makeRequest<{ nonce: string }>(
        {
          url: `${process.env.NEXT_PUBLIC_API_BASE}/nonce`,
          method: 'POST',
          data: { address },
        },
        'Nonce fetched successfully',
        'Failed to fetch nonce'
      );

      const payload: string = `${nonceResp.nonce}:${message}`;
      const signature: string = await primaryWallet.signMessage(payload);

      const verifyResp: boolean = await makeRequest<boolean>(
        {
          url: `${process.env.NEXT_PUBLIC_API_BASE}/verify-signature`,
          method: 'POST',
          data: { message, signature, nonce: nonceResp.nonce },
        },
        'Message signed & verified',
        'Signature verification failed'
      );

      const entry: SignEntry = {
        message,
        signature,
        verified: verifyResp,
        createdAt: new Date().toISOString(),
      };
      onAdd(entry);

      setMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-xl shadow-lg p-6 text-white"
    >

      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-400">
            {user ? `Signed in: ${user.email}` : 'Not signed in'}
          </div>
          <div className="text-xs text-gray-500">
            {primaryWallet
              ? `Wallet: ${primaryWallet.address}`
              : 'No wallet connected'}
          </div>
        </div>
        <div>
          {user ? (
            <button
              className="px-3 py-1 border border-gray-600 rounded-md hover:bg-gray-800 transition"
              onClick={() => handleLogOut()}
            >
              Logout
            </button>
          ) : (
            <button
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition"
              onClick={() => setShowAuthFlow(true)}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        placeholder="Enter your message to sign..."
        className="w-full bg-gray-900 border border-gray-700 p-3 rounded-md text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="mt-4 flex gap-2">
        <button
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSign}
          disabled={loading || message.trim().length === 0}
        >
          {loading ? 'Signing...' : 'Sign Message'}
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
