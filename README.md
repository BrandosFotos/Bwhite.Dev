# Bwhite.Dev

A modern, full-stack web application built with Next.js 16, React 19, and PostgreSQL.

## Tech Stack

- **Framework**: Next.js 16 with Turbopack
- **UI**: React 19, Tailwind CSS 4, HeroUI
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js
- **Animation**: Framer Motion, GSAP
- **Deployment**: Docker
- **Language**: TypeScript 5

## Quick Start

### Prerequisites
- Node.js >= 25.2.1
- npm >= 10.0.0
- Docker (optional)

### Installation

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npx prisma generate
npx prisma migrate dev

# Start development server
npm run dev
```

Visit http://localhost:3000

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server (port 3009) |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format` | Format code with Prettier |

## Docker

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs -f

# Rebuild
docker compose build --no-cache
```

## Project Structure

```
Bwhite.Dev/
├── .github/workflows/    # GitHub Actions CI/CD
├── .claude/             # Claude Code agents
├── docs/                # Documentation
│   ├── SETUP.md        # Setup guide
│   ├── SECURITY.md     # Security checklist
│   └── AGENTS.md       # Claude agents guide
├── prisma/             # Database schema & migrations
├── public/             # Static assets
├── scripts/            # Utility scripts
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   └── lib/           # Utilities & configs
├── .env.example       # Environment template
├── docker-compose.yaml
└── package.json
```

## Documentation

- [Setup Guide](docs/SETUP.md) - Detailed setup instructions
- [Security](docs/SECURITY.md) - Security audit & best practices
- [Claude Agents](docs/AGENTS.md) - Using Claude Code agents

## Features

- 🔐 Authentication with NextAuth.js
- 🗄️ PostgreSQL database with Prisma
- 🎨 Modern UI with HeroUI & Tailwind
- 🌗 Dark mode support
- 🚀 Optimized with Turbopack
- 🐳 Docker support
- 🤖 GitHub Actions CI/CD
- 🛡️ Type-safe with TypeScript

## Environment Variables

Required variables (see `.env.example` for full list):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
```

## License

MIT License - See [LICENSE.md](LICENSE.md)

---

For detailed setup instructions, see [docs/SETUP.md](docs/SETUP.md)
