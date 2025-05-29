# Server-Side Rendering (SSR) Architecture

This document explains how SSR works in this full-stack application with NestJS backend serving a React frontend through Fastify and Vite.

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   NestJS + Fastify                  │
│                    (Port: 3000)                     │
│                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ WebModule   │  │ AuthModule   │  │ LogsModule│ │
│  │             │  │              │  │           │ │
│  │ /web/*      │  │ /api/auth/*  │  │ /api/logs │ │
│  └──────┬──────┘  └──────────────┘  └───────────┘ │
│         │                                           │
│         ▼                                           │
│  ┌─────────────────────────────────────────────┐   │
│  │           FrontEndInterceptor               │   │
│  │  Intercepts Page responses for SSR          │   │
│  └──────────────────┬──────────────────────────┘   │
│                     │                               │
│                     ▼                               │
│  ┌─────────────────────────────────────────────┐   │
│  │            FastifyVite Plugin               │   │
│  │  - Development: Hot Module Replacement      │   │
│  │  - Production: Pre-built SSR bundles        │   │
│  └──────────────────┬──────────────────────────┘   │
│                     │                               │
└─────────────────────┼───────────────────────────────┘
                      │
                      ▼
              ┌───────────────┐
              │ React App     │
              │ (Preact SSR)  │
              └───────────────┘
```

## Core Components

### 1. Page Class (`src/web/page.ts`)
```typescript
export class Page {
    constructor(public readonly props: Record<string, any> = {}) {}
}
```
- Simple value object that signals SSR rendering
- Carries props from backend to frontend

### 2. WebController (`src/web/web.controller.ts`)
```typescript
@Controller('web')
export class WebController {
    @Get('dashboard')
    dashboard() {
        return new Page({ data: { salesAmount: 15000 } });
    }
    
    @Get('*')
    catchAll() {
        return new Page();
    }
}
```
- Maps routes to Page responses
- Can pass data through props
- Catch-all route for client-side routing

### 3. WebModule Configuration (`src/web/web.module.ts`)

#### FastifyVite Configuration
```typescript
export const configureFrontEnd = async (adapter: FastifyAdapter, config?: Configuration) => {
    await adapter.register(FastifyVite, {
        root: join(process.cwd(), "/web"),
        spa: false,
        dev: !isProduction,
        logger: false,
        clientModule: isProduction ? 'dist/server/entry-server.js' : 'entry-server.ts',
        renderer: {
            createRenderFunction({ render }) {
                return async function ({ page, req, res }) {
                    const props = {
                        pageProps: page.props,
                        appProps: res.appProps,
                    };
                    
                    const result = await render({
                        url: req.originalUrl,
                        props,
                    });
                    
                    const hydrationState = {
                        url: req.originalUrl,
                        props,
                    };
                    
                    const hydration = `<script>window.__INITIAL_STATE__ = ${uneval(hydrationState)};</script>`;
                    
                    return {
                        element: result.template,
                        title: "test",
                        hydration
                    };
                };
            },
        },
    });
};
```

#### FrontEndInterceptor
```typescript
@Injectable()
export class FrontEndInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const res = context.switchToHttp().getResponse() as FastifyReply;
        const req = context.switchToHttp().getRequest() as FastifyRequest;
        
        return next.handle().pipe(
            map(async (data: any) => {
                if (data instanceof Page) {
                    const rendered = await res.render({ page: data, req, res });
                    return res.type('text/html').html(rendered);
                }
                return data;
            }),
        );
    }
}
```

### 4. Frontend Entry Points

#### Server Entry (`web/entry-server.ts`)
```typescript
import { render as preactRender } from 'preact-render-to-string';
import { createApp } from './base.js';

export async function render({ props, url }: EntryConfig) {
    const { component } = createApp({ url, props });
    
    // Wrap with providers for SSR
    const wrappedComponent = h(
        ThemeProvider,
        null,
        h(LocaleProvider, null,
            h(BreakpointProvider, null,
                h(SidebarProvider, null, component)
            )
        )
    );
    
    return { template: preactRender(wrappedComponent) };
}
```

#### Client Entry (`web/entry-client.ts`)
```typescript
import { hydrate } from 'preact';
import { createApp } from './base.js';

const state = (window as any).__INITIAL_STATE__;

hydrate(
    createApp({
        url: state.url,
        props: state.props,
    }).component,
    document.getElementById('root')!,
);
```

#### Base App (`web/base.tsx`)
```typescript
export const createApp = ({ url, props }: Config) => {
    // Remove /web prefix for route matching
    const normalizedUrl = url.startsWith('/web') ? url.slice(4) : url;
    const route = routes.find((route) => route.match(normalizedUrl));
    
    if (!route) {
        return {
            metadata: { title: 'Not Found' },
            component: <div>Route not found</div>,
        };
    }
    
    const Component = route.component;
    return {
        metadata: route.metadata(props),
        component: <Component {...props} />,
    };
};
```

## SSR Request Flow

```
1. Browser Request
   GET /web/dashboard
   ↓
2. NestJS Router
   Matches WebController route
   ↓
3. Controller Handler
   Returns: new Page({ data })
   ↓
4. FrontEndInterceptor
   Detects Page instance
   ↓
5. FastifyVite Renderer
   - Loads entry-server module
   - Calls render() with URL & props
   ↓
6. React SSR
   - Creates app with route matching
   - Renders to HTML string with Preact
   ↓
7. Hydration Injection
   - Serializes state with devalue
   - Injects as window.__INITIAL_STATE__
   ↓
8. HTML Response
   Complete HTML sent to browser
   ↓
9. Client Hydration
   - entry-client.ts loads
   - Reads __INITIAL_STATE__
   - Hydrates React app
```

## Key Features

### Devalue Integration
- **Purpose**: Safe state serialization
- **Benefits**: 
  - Handles circular references
  - Prevents XSS attacks
  - Smaller than JSON.stringify
  - Preserves Date, RegExp, Map, Set types

### Preact for SSR
- **Why Preact**: Faster server-side rendering
- **Compatibility**: Works with React components
- **Size**: Smaller runtime overhead

### Error Handling
```typescript
try {
    const result = await render({ url: req.originalUrl, props });
    template = result.template;
} catch (error) {
    console.error('[SSR Error]', error);
    // Fallback to client-side rendering
    template = '<div id="root"></div>';
}
```

### Development vs Production

#### Development Mode
- Hot Module Replacement enabled
- Vite serves modules directly
- Source maps available
- No build step required

#### Production Mode
- Pre-built SSR bundles
- Optimized for performance
- Minified output
- Module paths: `dist/server/entry-server.js`

## Route Management

### Backend Routes
```typescript
// Specific routes with data
@Get('dashboards/sales')
dashboardsSales() {
    return new Page({ data: { salesAmount: 15000 } });
}

// Dynamic routes
@Get('components/:component')
components() {
    return new Page();
}

// Catch-all for client routing
@Get('*')
catchAll() {
    return new Page();
}
```

### Frontend Routes (`web/routes.ts`)
```typescript
const routes = [
    {
        path: '/dashboard',
        component: Dashboard,
        metadata: (props) => ({ title: 'Dashboard' }),
        match: (url) => url === '/dashboard'
    },
    // ... more routes
];
```

## Build Process

### Development
```bash
yarn start:dev
# - Starts NestJS with nodemon
# - FastifyVite in dev mode
# - HMR enabled
# - No build required
```

### Production Build
```bash
# Build frontend SSR bundle
cd web
vite build --ssr entry-server.ts
vite build  # Client bundles

# Build backend
cd ..
yarn build
```

### Production Structure
```
web/dist/
├── client/          # Client-side assets
│   └── assets/      # JS/CSS bundles
├── server/          # SSR bundle
│   └── entry-server.js
└── index.html       # Not used (SSR generates HTML)
```

## Best Practices

### 1. Props Passing
```typescript
// Backend: Pass serializable data only
return new Page({ 
    userData: { id: 1, name: 'John' },
    timestamp: new Date() // Devalue handles this
});

// Frontend: Access via props
function Dashboard({ pageProps }) {
    const { userData, timestamp } = pageProps;
}
```

### 2. SSR-Safe Code
```typescript
// Use conditional rendering for client-only code
if (typeof window !== 'undefined') {
    // Client-only code
}

// Or use useEffect
useEffect(() => {
    // Runs only on client
}, []);
```

### 3. Provider Setup
- SSR includes: Theme, Locale, Breakpoint, Sidebar providers
- Client adds: Redux, Auth providers (need client initialization)

### 4. Performance
- Keep initial props small
- Lazy load heavy components
- Use streaming SSR for large pages (future enhancement)

## Common Issues & Solutions

### Issue: Component not SSR-compatible
```typescript
// Solution: Lazy load with client-only rendering
const Map = lazy(() => import('./Map'));

function Page() {
    return (
        <Suspense fallback={<div>Loading map...</div>}>
            {typeof window !== 'undefined' && <Map />}
        </Suspense>
    );
}
```

### Issue: Hydration mismatch
```typescript
// Ensure consistent rendering
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

return <div>{mounted ? clientOnlyContent : serverContent}</div>;
```

### Issue: Missing styles in SSR
```typescript
// Import CSS in entry-server.ts
import "simplebar-react/dist/simplebar.min.css";
import "./styles/index.css";
```

## Debugging

### Check SSR Output
```bash
curl http://localhost:3000/web/dashboard
# View raw HTML with hydration state
```

### Monitor SSR Logs
- Custom SSR logger mimics NestJS format
- Check for `[SSR Error]` in console
- Fastify request hooks add timing info

### Development Tools
- React DevTools work after hydration
- Vite HMR preserves state during development
- Source maps available in dev mode