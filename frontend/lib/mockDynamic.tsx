'use client';
import React from 'react';

export function MockDynamicProvider({ children }: { children: React.ReactNode }) {
  const mock = {
    user: { email: 'test@example.com', sub: 'test-user' },
    primaryWallet: {
      address: '0x' + 'a'.repeat(40),
      signMessage: async ({ message }: { message: string }) => {
        return '0x' + 'b'.repeat(130);
      }
    },
    openAuthModal: () => {},
    logout: () => {}
  };

  return (
    <MockContext.Provider value={mock}>
      {children}
    </MockContext.Provider>
  );
}

export const MockContext = React.createContext<any>(null);

export function useMockDynamic() {
  return React.useContext(MockContext);
}
