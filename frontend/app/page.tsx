'use client';

import { useEffect, useState } from 'react';
import SignForm from '../components/SignForm';
import History from '../components/History';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Page() {
  const [history, setHistory] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'sign' | 'history'>('sign');

  useEffect(() => {
    const raw = localStorage.getItem('signHistory');
    if (raw) setHistory(JSON.parse(raw));
  }, []);

  function addEntry(entry: any) {
    const next = [entry, ...history].slice(0, 50);
    setHistory(next);
    localStorage.setItem('signHistory', JSON.stringify(next));
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <header className="flex flex-col items-center text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          Web3 Message Signer
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Securely sign and verify blockchain messages with your wallet.
        </p>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6">
        {activeTab === 'sign' ? (
          <SignForm onAdd={addEntry} />
        ) : (
          <History items={history} />
        )}
      </main>

      <Footer />
    </div>
  );
}
