# Kenya Civic Info Bot — Frontend

Next.js 14 chat interface for the Kenya Civic Info Bot. Ask questions about Kenya's Constitution, voting rights, and county government — every answer cites its source.

## Stack

- **Next.js 14** App Router
- **TypeScript**
- **Tailwind CSS**

## Local Setup

```bash
npm install
cp .env.local.example .env.local
# set NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL of the FastAPI backend |

## Features

- Mobile-first chat interface
- Example questions on first load
- Source pills on every bot response
- Typing indicator while waiting
- Full conversation history passed to backend
- Graceful error state if backend is unreachable

## Deployment

Deployed on Vercel. Set `NEXT_PUBLIC_API_URL` to your Railway backend URL in the Vercel dashboard environment variables before deploying.
