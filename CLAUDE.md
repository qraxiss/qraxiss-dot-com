# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a full-stack web application with:
- **Backend**: NestJS API with JWT authentication and TypeORM
- **Frontend**: React + TypeScript with Vite, served through NestJS with SSR support
- **Database**: MySQL/PostgreSQL support via TypeORM

### Key Directories
- `/src/` - NestJS backend source code
- `/web/` - React frontend application
- `/scripts/` - Build and deployment scripts
- `/ci/` - CI/CD configuration files
- `/dist/` - Backend build output

## Essential Commands

### Development
```bash
# Install dependencies (run in root and /web)
yarn install

# Backend development (from root)
yarn start:dev      # Watch mode
yarn start:debug    # Debug mode

# Frontend development (from /web)
yarn dev

# Database setup (from root)
yarn create-db
```

### Production Build & Deployment
```bash
# Build frontend (from root)
yarn web-build

# Build backend (from root)
yarn build

# Start production (from root)
yarn start
# Or with PM2
pm2 start ecosystem.config.js
```

### Code Quality
```bash
# Backend (from root)
yarn lint
yarn format

# Frontend (from /web)
yarn lint
```

### Testing
```bash
# Backend tests (from root)
yarn test          # Unit tests
yarn test:e2e      # E2E tests
yarn test:cov      # Coverage
```

### Utility Scripts (from root)
```bash
yarn generate       # Generate API client from Swagger
yarn nginx         # Configure nginx
yarn url-post-fix  # Post-process URLs
```

## High-Level Architecture

### Backend Structure (NestJS)
- **Modular architecture** with feature modules in `/src/`
- **Authentication**: JWT-based with Passport.js strategies and guards
- **Database**: TypeORM with entity auto-loading and migrations
- **Logging**: Winston logger with file outputs to `/src/logs/`
- **API Documentation**: Swagger available at `/api-docs`
- **SSR Support**: Vite SSR integration for serving React app

### Frontend Structure (React)
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router v7 with protected routes
- **UI Components**: Custom component library in `/web/components/ui/`
- **Styling**: Tailwind CSS v4 with custom theme configuration
- **Forms**: React Hook Form with Yup validation
- **i18n**: Multi-language support via i18next

### Key Integration Points
1. **Frontend served at `/web` path** through NestJS WebModule
2. **API endpoints** available at standard REST paths
3. **Authentication flow** uses JWT tokens stored in Redux
4. **SSR rendering** handled by Vite with Preact for optimization

### Environment Configuration
- Backend constants managed via ConstantService
- Database credentials and JWT secrets stored in environment
- Development mode enables TypeORM synchronization

### Deployment Notes
- Docker support via Dockerfile (uses Bun runtime)
- PM2 configuration for process management
- Nginx configuration available via scripts
- Logs persisted to `/src/logs/`
- Backend build output in `/dist/`