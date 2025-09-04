Web3 Message Signer App

This is a Next.js project bootstrapped with create-next-app
. It includes a frontend built with Next.js and a backend API server.

Prerequisites

Node.js: v20 or higher

Package manager: npm, yarn, pnpm, or bun

Installation

1. Clone the repository
   git clone <https://github.com/codemesharp/web3-message-sign-app.git>
   cd <web3-message-sign-app>

2. Install dependencies

# Frontend

cd frontend
npm install

# Backend

cd ../backend
npm install

Environment Setup

Create .env.local files for both frontend and backend.

Backend (backend/.env.local)
PORT=8080

Frontend (frontend/.env.local)
NEXT_PUBLIC_DYNAMIC_ENV_ID=<your-dynamic-env-id>
NEXT_PUBLIC_API_BASE=http://localhost:8080
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_MOCK_DYNAMIC=0

Replace <your-dynamic-env-id> with your actual Dynamic Labs environment ID.

Running the Development Server

You need to run frontend and backend servers separately.

# Frontend

cd frontend
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

# Backend

cd backend
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

Open http://localhost:3000
in your browser to view the app.

Project Structure
frontend/ # Next.js frontend
backend/ # Node.js/Express backend API

Notes

Ensure backend is running on the configured port (8080) before starting the frontend.

NEXT_PUBLIC_MOCK_DYNAMIC=0 ensures real Dynamic Labs integration. Set to 1 for mocking during development.
