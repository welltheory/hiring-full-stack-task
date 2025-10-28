### Prerequisites
- Node.js 24+
- pnpm 8+
- Docker

### Environment Setup

```bash
# Setup environment-related files
mv backend/.env.example backend/.env
mv frontend/.env.example frontend/.env

# Install dependencies (backend + frontend)
pnpm install

# Start environment (Dockerized Postgres, Temporal Server, etc.)
pnpm env:setup

# Setup database (migrations + seed)
pnpm db:setup

# (Optional) Open Prisma Studio
pnpm db:studio

# Start development servers (backend + frontend)
pnpm dev
```

### Available GUIs

1. Temporal Web UI: `http://localhost:8080` (available if the Temporal Server is running)
2. Prisma Studio: `http://localhost:5555` (available if the `db:studio` command is run)