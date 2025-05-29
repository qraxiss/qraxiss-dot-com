# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a full-stack web application with:
- **Backend**: NestJS API with JWT authentication, TypeORM, and Fastify adapter
- **Frontend**: React + TypeScript with Vite, served through NestJS with SSR support using Preact
- **Database**: MySQL/PostgreSQL support via TypeORM

### Key Directories
- `/src/` - NestJS backend source code
- `/web/` - React frontend application
- `/scripts/` - Build and deployment scripts
- `/ci/` - CI/CD configuration files
- `/dist/` - Backend build output
- `/web/dist/` - Frontend build output (production only)

## Essential Commands

### Development
```bash
# Install dependencies (run in root and /web)
yarn install

# Backend development (from root)
yarn start:dev      # Watch mode with SSR
yarn start:debug    # Debug mode

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
- **SSR Support**: Vite SSR integration for serving React app via Fastify

### Frontend Structure (React)
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: File-based routing with route manifest in `/web/routes.ts`
- **UI Components**: Custom component library in `/web/components/ui/`
- **Styling**: Tailwind CSS v4 with custom theme configuration
- **Forms**: React Hook Form with Yup validation
- **i18n**: Multi-language support via i18next
- **SSR**: Preact for server-side rendering with hydration

### Key Integration Points

#### SSR Architecture
1. **Page Class**: Backend returns `Page` instances with props
2. **WebController**: Maps routes to Page responses
3. **FrontEndInterceptor**: Intercepts Page responses and triggers SSR
4. **FastifyVite**: Handles SSR rendering with Vite
5. **Entry Points**: 
   - `entry-server.ts`: Renders React to HTML string using Preact
   - `entry-client.ts`: Hydrates the app on client using initial state

#### SSR Flow
```
1. Request to /web/dashboard
2. WebController returns new Page({ data })
3. FrontEndInterceptor intercepts Page response
4. FastifyVite renders using entry-server.ts
5. HTML with hydration state sent to client
6. Client hydrates using entry-client.ts
```

#### Key SSR Features
- **Devalue**: Safe serialization of state (handles circular refs, XSS protection)
- **Preact**: Used for faster SSR rendering
- **Error Handling**: Falls back to client-side rendering on SSR errors
- **Development Mode**: Hot module replacement with Vite
- **Production Mode**: Pre-built SSR bundles

### Environment Configuration
- Backend constants managed via ConstantService
- Database credentials and JWT secrets stored in environment
- Development mode enables TypeORM synchronization
- SSR mode determined by NODE_ENV

### Deployment Notes
- Docker support via Dockerfile (uses Bun runtime)
- PM2 configuration for process management
- Nginx configuration available via scripts
- Logs persisted to `/src/logs/`
- Backend build output in `/dist/`
- Frontend SSR build in `/web/dist/server/`

## Important Notes

- **NO static file serving**: Frontend is always SSR rendered through backend
- **NO separate dev server**: Vite runs integrated with NestJS
- **Route matching**: WebController handles all /web/* routes
- **Props passing**: Backend can pass data via Page props
- **Hydration**: Client receives state via `window.__INITIAL_STATE__`

## Common Patterns

### Adding a New Page
1. Add route in WebController
2. Create component in /web/app/pages/
3. Add route to /web/routes.ts
4. Page will be SSR rendered automatically

### Passing Data from Backend
```typescript
// Backend
@Get('dashboard')
dashboard() {
  return new Page({ userData: { name: 'John' } });
}

// Frontend receives via props.pageProps
function Dashboard({ pageProps }) {
  return <h1>Welcome {pageProps.userData.name}</h1>;
}
```

## Backend Modules Reference

### Authentication Module (JWT-based)
- **AuthModule**: Complete JWT authentication with Passport.js integration
- **AuthController**: Login endpoints (`/auth/login`, `/auth/is-user-logged`)
- **AuthService**: User validation, token generation, password verification
- **JwtStrategy**: JWT token validation strategy for Passport
- **JwtGuard**: Route protection guard
- **Decorators**: `@JwtAuth()`, `@CurrentUser()` for easy auth integration
- **Security**: Uses ConstantService for configuration, environment-based secrets

### Constants Module (Configuration Management)
- **ConstantService**: Central configuration management singleton
- **Key Settings**: Database config, app settings, security keys, user management
- **Environment Helpers**: `isDevelopment()`, `isProduction()`, `appUrl()` dynamic generation
- **Global Module**: Available throughout entire application
- **Current State**: Uses hard-coded values (recommend env vars for production)

### Status/Error Management Module
- **StatusType Interface**: Standardized error/response format
- **Custom Errors**: NotFoundError, WrongPassword, TestError with auto-registration
- **ErrorRegistry**: Central error management system
- **SafeRun Utilities**: Function and decorator patterns for safe execution
- **Response DTOs**: Swagger-compatible error and success response DTOs
- **Features**: Error logging, execution time measurement, standardized API responses

### SSR (Server-Side Rendering) Architecture
- **Core Components**: Page class, WebController, FrontEndInterceptor, FastifyVite
- **Page Class**: Backend returns Page instances with props for SSR
- **WebController**: Maps all `/web/*` routes to Page responses  
- **FrontEndInterceptor**: Intercepts Page responses and triggers SSR process
- **FastifyVite Plugin**: Handles SSR rendering with Vite integration
- **Devalue**: Safe state serialization (handles circular refs, XSS protection)
- **Preact**: Used for faster SSR rendering performance
- **Error Handling**: Graceful fallback to client-side rendering on SSR errors
- **Development**: Hot Module Replacement with Vite
- **Production**: Pre-built SSR bundles for optimal performance

## Frontend Architecture Reference

### API Integration
- **Auto-generated Client**: TypeScript client from NestJS Swagger/OpenAPI
- **Generation Command**: `yarn generate` using axios-generator.sh
- **Core Services**: AuthService, LogsService, WebService with full type safety
- **Models**: Complete TypeScript interfaces for User, Auth, Log, Error DTOs
- **RTK Query Integration**: Seamless integration with Redux Toolkit Query
- **Error Handling**: Type-safe ApiError instances with consistent error format

### Component Library (100+ Components)
- **UI Components (20+)**: Avatar, Button, Form controls, Tables, Pagination, etc.
- **Shared Components (21+)**: Form helpers, table utilities, general utilities
- **Template Components**: Navigation, notifications, sidebars, search
- **Docs Components**: Documentation and demo components
- **Features**: Polymorphic components, Context usage, Theme integration, TypeScript support

### Custom Hooks (40+ Hooks)
- **Categories**: UI/DOM, State Management, Performance, Storage/Data, Events/Effects
- **Key Hooks**: useToggle, useLocalStorage, useMediaQuery, useDebounce, useEventListener
- **Features**: SSR safety, TypeScript support, automatic cleanup, performance optimization
- **Patterns**: Browser compatibility checks, cleanup functions, type safety

### Internationalization (i18n)
- **Languages**: English, Arabic (RTL), Spanish, Chinese (4 total)
- **Framework**: i18next with React integration
- **Features**: Language detection, fallback handling, RTL support
- **Date/Time**: date-fns integration with locale-specific formatting
- **Implementation**: Translation structure, component usage, context integration

### Pages Architecture (100+ Pages)
- **Apps (12)**: Chat, Kanban, Mail, Todo, File Manager, NFT, POS, Travel, etc.
- **Dashboards (20+)**: Sales, CRM, Crypto, Banking, Analytics variations
- **Component Demos**: Complete UI component showcase with all variations
- **Forms**: Complex forms with all form control types and validations
- **Tables**: Advanced data tables with TanStack Table integration
- **Prototypes**: Various layouts (onboarding, auth, errors, settings)

### State Management
- **Redux Toolkit**: Complete store setup with RTK Query
- **APIs**: Auth API, Logs API with auto-generated hooks
- **Features**: Authentication flows, data fetching, cache management
- **Type Safety**: Full TypeScript integration with generated types
- **Patterns**: Error handling, loading states, cache invalidation, persistence

### Styling Architecture
- **Tailwind CSS v4**: Modern utility-first CSS framework
- **Layer System**: theme, base, vendor, components, utilities
- **Component Styles**: 15+ component-specific stylesheets
- **Form Styles**: 8 specialized form control stylesheets  
- **Vendor Styles**: 6 third-party library customizations
- **Features**: Dark mode support, responsive design, performance optimization

### TypeScript Types System
- **Comprehensive Types**: Utility types, interfaces, declarations
- **Categories**: Common types, navigation types, polymorphic types, user types
- **Extensions**: TanStack Table meta extensions, Quill editor declarations
- **Patterns**: Discriminated unions, utility type creation, type guards
- **Best Practices**: Type imports, generic components, maintainability

### Utility Functions (50+ Functions)
- **Core Utilities**: Axios configuration, formatting, validation helpers
- **DOM Utilities**: Browser detection, scrolling, touch detection, getUserAgent
- **React Table**: Fuzzy filtering, skipper hooks, table-specific utilities
- **Features**: SSR safety, TypeScript support, pure functions, error handling
- **Patterns**: Environment checks, type safety, performance optimization

## Development Workflow

### Code Generation
```bash
yarn generate       # Generates TypeScript API client from Swagger spec
```

### Frontend Development
```bash
cd web
yarn install       # Install frontend dependencies
yarn dev           # Development server (integrated with backend)
yarn build         # Production build
yarn lint          # ESLint checking
```

### Database Management
```bash
yarn create-db     # Initialize database
# TypeORM migrations auto-run in development
```

### Testing Strategy
```bash
yarn test          # Backend unit tests
yarn test:e2e      # End-to-end tests
yarn test:cov      # Test coverage reports
```

## Production Deployment

### Build Process
1. `yarn web-build` - Frontend SSR build
2. `yarn build` - Backend NestJS build  
3. `yarn start` or `pm2 start ecosystem.config.js`

### Infrastructure
- **Docker**: Dockerfile with Bun runtime
- **Process Management**: PM2 with ecosystem.config.js
- **Web Server**: Nginx configuration via scripts
- **Logging**: Winston with file outputs to `/src/logs/`
- **Database**: TypeORM with PostgreSQL/MySQL support

## Key Development Principles

### SSR-First Architecture
- All frontend routes served through NestJS backend
- No separate frontend dev server
- Props passed from backend to frontend via Page class
- Client hydration with `window.__INITIAL_STATE__`

### Type Safety Throughout
- Auto-generated API client from Swagger
- Complete TypeScript coverage
- Type-safe state management
- Component prop validation

### Performance Optimization
- Preact for faster SSR rendering
- Code splitting and lazy loading
- Optimized build processes
- Caching strategies

### Developer Experience
- Hot Module Replacement in development
- Comprehensive error handling
- Extensive component library
- Auto-generated documentation