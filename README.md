# NovaAI

Production-grade AI platform ecosystem for chat, image generation, voice, subscriptions, and enterprise operations.

## Stack

- Mobile: Flutter + Dart + Riverpod + Material 3
- Website: Next.js + React + TypeScript + Tailwind + Framer Motion
- Admin: React + TypeScript
- Backend: Node.js + Express + TypeScript
- Databases: PostgreSQL, MongoDB, Redis
- Auth: JWT, OAuth with Google, Apple, GitHub
- Payments: Stripe
- Deployment: Docker, Kubernetes, Azure, AWS, Firebase, Vercel

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Structure

See repo tree for backend, mobile, website, admin, infrastructure, docs, and tests.

## Security

- Never commit secrets
- Validate all inputs
- Use secure cookies and JWT rotation
- Enforce rate limits and RBAC
- Run security scans before deployment
