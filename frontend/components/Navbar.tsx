'use client';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

interface NavbarProps {
  activeTab: 'sign' | 'history';
  setActiveTab: (tab: 'sign' | 'history') => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const { user, setShowAuthFlow, handleLogOut } = useDynamicContext();

  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-emerald-400">ChainSign</div>
        <div className="flex gap-6 items-center">
          <button
            onClick={() => setActiveTab('sign')}
            className={`hover:text-emerald-400 ${
              activeTab === 'sign' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Sign
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`hover:text-emerald-400 ${
              activeTab === 'history' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            History
          </button>
          {user ? (
            <button
              onClick={() => handleLogOut()}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowAuthFlow(true)}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
