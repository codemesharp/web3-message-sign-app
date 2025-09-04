'use client';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 py-6 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} ChainSign. Built with ❤️ for Web3.
    </footer>
  );
}
