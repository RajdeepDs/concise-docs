# Concise Docs Monorepo

A modern monorepo setup using Turborepo, Bun, and TypeScript. This monorepo contains multiple applications and shared packages, providing a scalable and maintainable development environment.

## Project Structure

```
.
├── apps/         # Applications
│   ├── web/      # Main web application (frontend)
│   ├── api/      # API server application (backend)
│   ├── email/    # Email service application
│   └── studio/   # Studio application
├── packages/     # Shared packages
│   ├── ui/       # Shared UI components
│   ├── tsconfig/ # Shared TypeScript configurations
│   ├── auth/     # Authentication package
│   ├── database/ # Database utilities
│   ├── email/    # Email service package
│   ├── rate-limit/ # Rate limiting package
│   └── security/ # Security utilities
└── ...
```

## Tech Stack

- **Package Manager:** [Bun](https://bun.sh)
- **Build System:** [Turborepo](https://turbo.build/repo)
- **Language:** TypeScript
- **Code Quality:**
  - [Biome](https://biomejs.dev/) for formatting and linting
  - [Manypkg](https://github.com/Thinkmill/manypkg) for package management

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.1.38 or later)
- Node.js (LTS version recommended)

### Installation

```bash
# Install dependencies
bun install

# Start development servers
bun run dev

# Build all packages and applications
bun run build
```

## Development

- `bun run dev:web` - Start the web development server
- `bun run dev:api` - Start the api development server
