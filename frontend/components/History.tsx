'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function History({ items }: { items: any[] }) {
  return (
    <section className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">History</h2>
        <small className="text-sm text-slate-400">Local only</small>
      </div>

      <ul className="space-y-3">
        {items.length === 0 ? (
          <li className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-xl shadow-lg p-4 text-gray-300">
            No messages signed yet.
          </li>
        ) : (
          <AnimatePresence>
            {items.map((it, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-xl shadow-lg p-4 text-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-200">
                      Message
                    </div>
                    <div className="text-xs text-gray-400 break-words">
                      {it.message}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Signer: {it.verified?.signer ?? '—'} | Valid:{' '}
                      {String(it.verified?.isValid)}
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      {new Date(it.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {it.verified?.isValid ? (
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircleIcon className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        )}
      </ul>
    </section>
  );
}
