# Server-Side Rendering (SSR) Architecture

This document explains how SSR works in this full-stack application with NestJS backend serving a React frontend.

## Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │
│   NestJS API    │ ◄─────► │  React App      │
│   (Backend)     │   SSR   │  (Frontend)     │
│   Port: 3000    │         │  Dev: 5173      │
│                 │         │                 │
└─────────────────┘         └─────────────────┘
         │                           │
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│   WebModule     │         │   Vite SSR      │
│   /web/* routes │         │   entry-*.ts    │
└─────────────────┘         └─────────────────┘
```

## How It Works

### 1. Backend Setup (NestJS)

#### WebModule (`src/web/web.module.ts`)
```typescript
@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../..', 'web/dist'),
    exclude: ['/api*', '/web*'],
  })],
  controllers: [WebController],
})
export class WebModule {}
```

**Purpose**: 
- Serves static files from `web/dist`
- Excludes API routes and SSR routes
- Handles SSR rendering via WebController

#### WebController (`src/web/web.controller.ts`)
```typescript
@Controller('web')
export class WebController {
  @Get('*')
  @Header('Content-Type', 'text/html')
  render(@Req() req: Request, @Res() res: Response) {
    // SSR logic here
    const html = await renderPage(req.url);
    res.send(html);
  }
}
```

**Key Features**:
- Catches all routes under `/web/*`
- Renders React app server-side
- Returns HTML with hydration data

#### Main App Module
```typescript
@Module({
  imports: [
    // ... other modules
    WebModule, // SSR module
  ],
})
export class AppModule {}
```

### 2. Frontend Setup (React + Vite)

#### Entry Points

**`web/entry-server.ts`** - Server-side entry
```typescript
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';

export async function render(url: string, context: any) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  
  return { html };
}
```

**`web/entry-client.ts`** - Client-side entry
```typescript
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

#### Vite Configuration
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    rollupOptions: {
      input: {
        client: './entry-client.ts',
        server: './entry-server.ts',
      },
    },
  },
});
```

### 3. SSR Flow

```
1. User requests /web/dashboard
   ↓
2. NestJS WebController catches request
   ↓
3. Loads built SSR bundle (entry-server)
   ↓
4. Executes render() with URL
   ↓
5. React renders to HTML string
   ↓
6. Injects HTML into template
   ↓
7. Sends complete HTML to browser
   ↓
8. Browser loads JS bundles
   ↓
9. React hydrates the DOM
   ↓
10. App becomes interactive
```

## Key Components

### HTML Template Generation
```typescript
function renderPage(url: string) {
  const { html, css } = await render(url);
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>App</title>
        <style>${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="module" src="/assets/entry-client.js"></script>
      </body>
    </html>
  `;
}
```

### State Hydration
```typescript
// Server-side
const preloadedState = {
  user: await getUserData(),
};

const html = renderToString(
  <Provider store={createStore(preloadedState)}>
    <App />
  </Provider>
);

// Inject state into HTML
`<script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
</script>`

// Client-side
const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(preloadedState);
```

### Devalue Integration
```typescript
// web/devalue.ts
import { uneval } from 'devalue';

// Server: Serialize state safely
const serialized = uneval(state);

// Client: No special handling needed
const state = eval(`(${serialized})`);
```

**Why Devalue?**
- Handles circular references
- Serializes Dates, Maps, Sets correctly
- Prevents XSS attacks
- Smaller payload than JSON

## Build Process

### Development Mode
```bash
# Terminal 1: Backend
yarn start:dev

# Terminal 2: Frontend
cd web && yarn dev
```

- Backend serves API on port 3000
- Vite dev server on port 5173
- Hot module replacement enabled
- No SSR in development

### Production Build
```bash
# Build frontend with SSR
yarn web-build

# This runs:
# 1. vite build --ssr entry-server.ts
# 2. vite build (client bundles)
# 3. Outputs to web/dist/

# Build backend
yarn build

# Start production
yarn start
```

### Build Output Structure
```
web/dist/
├── client/           # Client-side bundles
│   ├── assets/
│   ├── index.html
│   └── manifest.json
├── server/           # SSR bundles
│   └── entry-server.js
└── ssr-manifest.json # SSR asset mapping
```

## Route Handling

### API Routes
```
/api/*        → NestJS controllers
/auth/*       → Auth endpoints  
/logs/*       → Logs endpoints
```

### SSR Routes
```
/web/*        → WebController → SSR
/web          → Homepage
/web/dashboard → Dashboard (SSR)
/web/profile  → Profile (SSR)
```

### Static Assets
```
/assets/*     → Static files from web/dist
/images/*     → Public images
*.js, *.css   → Build artifacts
```

## Data Fetching

### Server-Side Data
```typescript
// In SSR handler
export async function render(url: string) {
  // Fetch initial data
  const authResponse = await fetch('/api/auth/is-user-logged');
  const user = await authResponse.json();
  
  // Pass to React
  const html = renderToString(
    <App initialData={{ user }} />
  );
  
  return { html, data: { user } };
}
```

### Client-Side Hydration
```typescript
// App.tsx
function App({ initialData }) {
  // Use initial data from SSR
  const [user] = useState(initialData?.user);
  
  // Further client-side fetches
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);
}
```

## Performance Optimizations

### Streaming SSR
```typescript
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  bootstrapScripts: ['/assets/client.js'],
  onShellReady() {
    response.setHeader('content-type', 'text/html');
    pipe(response);
  },
});
```

### Caching
```typescript
// Cache rendered pages
const cache = new Map();

async function renderWithCache(url: string) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  
  const result = await render(url);
  cache.set(url, result);
  
  // Expire after 5 minutes
  setTimeout(() => cache.delete(url), 5 * 60 * 1000);
  
  return result;
}
```

### Critical CSS
```typescript
// Extract critical CSS during SSR
import { extractCritical } from '@emotion/server';

const { html, css } = extractCritical(
  renderToString(<App />)
);

// Inject into head
`<style data-emotion>${css}</style>`
```

## Error Handling

### SSR Errors
```typescript
try {
  const { html } = await render(url);
  res.send(html);
} catch (error) {
  console.error('SSR Error:', error);
  
  // Fallback to client-side rendering
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <div id="root"></div>
        <script src="/assets/client.js"></script>
      </body>
    </html>
  `);
}
```

### Hydration Mismatches
```typescript
// Suppress hydration warnings in dev
if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0]?.includes('Warning: Text content did not match')) {
      return;
    }
    originalError.apply(console, args);
  };
}
```

## Security Considerations

### XSS Prevention
```typescript
// Sanitize user data before SSR
import DOMPurify from 'isomorphic-dompurify';

const cleanData = DOMPurify.sanitize(userData);
```

### CSP Headers
```typescript
@Header('Content-Security-Policy', "default-src 'self'")
render() {
  // SSR logic
}
```

## Best Practices

1. **Keep SSR Bundle Small**: Minimize server bundle size
2. **Handle Loading States**: Show skeletons during hydration
3. **Progressive Enhancement**: App works without JS
4. **Cache Aggressively**: Cache rendered pages when possible
5. **Monitor Performance**: Track SSR timing and errors
6. **Graceful Fallbacks**: Fall back to CSR on errors

## Debugging SSR

### Check SSR Output
```bash
# View raw SSR HTML
curl http://localhost:3000/web/dashboard

# Check for hydration errors
# Open browser console during page load
```

### Common Issues
- **Window is not defined**: Use `isServer` checks
- **Hydration mismatches**: Ensure consistent rendering
- **Missing styles**: Include CSS in SSR bundle
- **Route mismatches**: Verify server/client routing