# Web API Reference Guide

This document provides a comprehensive reference for the auto-generated API client in the `web/api` directory.

## Directory Overview

The API directory contains an auto-generated TypeScript client from the NestJS backend's Swagger/OpenAPI specification:
- **Generated via**: `yarn generate` command (uses axios-generator.sh script)
- **Source**: Backend Swagger JSON at `/api-docs-json`
- **Generator**: OpenAPI TypeScript Codegen
- **HTTP Client**: Axios with cancelable promises

## Generation Process

### Command
```bash
# From project root
yarn generate
# or
yarn axios-generator
```

### Script Details (scripts/axios-generator.sh)
```bash
# Fetches Swagger JSON from running backend
# Generates TypeScript client with axios
# Output to web/api directory
```

**Requirements**:
- Backend must be running (typically on port 3000)
- Swagger docs available at `/api-docs-json`

## Core Components

### OpenAPI Configuration (`/core/OpenAPI.ts`)
```typescript
export const OpenAPI: OpenAPIConfig = {
  BASE: process.env.API_BASE_URL || '',
  VERSION: '0.0.1',
  WITH_CREDENTIALS: true,
  CREDENTIALS: 'include',
  TOKEN: undefined,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};
```

**Key Settings**:
- `WITH_CREDENTIALS`: Enables cookie-based auth
- `BASE`: API base URL (configurable via env)
- `TOKEN`: Can be set for Bearer token auth

### Request Handler (`/core/request.ts`)
- **Purpose**: Axios wrapper with cancelable promises
- **Features**:
  - Request/response interceptors
  - Error transformation
  - Cancel token support
  - Automatic JSON parsing

### CancelablePromise (`/core/CancelablePromise.ts`)
```typescript
export interface CancelablePromise<T> extends Promise<T> {
  readonly cancel: () => void;
  readonly isCancelled: () => boolean;
}
```

**Usage**:
```typescript
const request = AuthService.login(credentials);
// Cancel if needed
request.cancel();
```

### ApiError (`/core/ApiError.ts`)
```typescript
export class ApiError extends Error {
  public readonly url: string;
  public readonly status: number;
  public readonly statusText: string;
  public readonly body: any;
}
```

**Error Handling**:
```typescript
try {
  await AuthService.login(credentials);
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.status); // HTTP status
    console.log(error.body);   // Error response
  }
}
```

## Models

### User Models
```typescript
export interface UserDto {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  user: UserDto;
  token: string;
}
```

### Auth Models
```typescript
export interface IsUserLoggedDto {
  // Empty query DTO
}

export interface IsUserLoggedResponseDto {
  isLogged: boolean;
  user?: UserDto;
}
```

### Log Models
```typescript
export interface LogResponseDto {
  id: string;
  message: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
}
```

### Error Models
```typescript
export interface ErrorDto {
  statusCode: number;
  message: string;
  error?: string;
}
```

## Services

### AuthService (`/services/AuthService.ts`)

#### login
```typescript
public static login(requestBody: LoginDto): CancelablePromise<LoginResponseDto>
```
- **Method**: POST `/auth/login`
- **Body**: Email and password
- **Returns**: User data and JWT token
- **Usage**:
```typescript
const response = await AuthService.login({
  email: 'user@example.com',
  password: 'password123'
});
console.log(response.token);
```

#### isUserLogged
```typescript
public static isUserLogged(): CancelablePromise<IsUserLoggedResponseDto>
```
- **Method**: GET `/auth/is-user-logged`
- **Auth**: Requires valid session/token
- **Returns**: Login status and user info
- **Usage**:
```typescript
const { isLogged, user } = await AuthService.isUserLogged();
if (isLogged) {
  console.log(`Welcome ${user.name}`);
}
```

### LogsService (`/services/LogsService.ts`)

#### getLogs
```typescript
public static getLogs(): CancelablePromise<Array<LogResponseDto>>
```
- **Method**: GET `/logs`
- **Auth**: Requires authentication
- **Returns**: Array of log entries
- **Usage**:
```typescript
const logs = await LogsService.getLogs();
logs.forEach(log => {
  console.log(`[${log.level}] ${log.message}`);
});
```

### WebService (`/services/WebService.ts`)

#### webControllerRender
```typescript
public static webControllerRender(): CancelablePromise<void>
```
- **Method**: GET `/web`
- **Purpose**: SSR endpoint
- **Note**: Typically not called directly from frontend

## Integration with State Management

### With RTK Query
While the API client is standalone, it integrates with RTK Query in the state layer:
```typescript
// state/api/auth.ts
import { LoginDto, LoginResponseDto } from '@/api';

const authApi = createApi({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDto, LoginDto>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
```

### Direct Usage
```typescript
import { AuthService } from '@/api';

// In components
async function handleLogin(credentials: LoginDto) {
  try {
    const response = await AuthService.login(credentials);
    // Store token
    localStorage.setItem('token', response.token);
    // Update app state
  } catch (error) {
    // Handle error
  }
}
```

## Authentication Setup

### Token Management
```typescript
import { OpenAPI } from '@/api';

// Set token for all requests
OpenAPI.TOKEN = localStorage.getItem('token');

// Or use interceptor
OpenAPI.HEADERS = {
  'Authorization': `Bearer ${token}`
};
```

### Cookie-Based Auth
```typescript
// Already configured with credentials: 'include'
// Cookies are sent automatically
```

## Error Handling Patterns

### Type-Safe Error Handling
```typescript
import { ApiError, ErrorDto } from '@/api';

try {
  await AuthService.login(credentials);
} catch (error) {
  if (error instanceof ApiError) {
    const errorData = error.body as ErrorDto;
    switch (error.status) {
      case 401:
        // Handle unauthorized
        break;
      case 400:
        // Handle validation errors
        console.log(errorData.message);
        break;
      default:
        // Handle other errors
    }
  }
}
```

### Request Cancellation
```typescript
const controller = useRef<CancelablePromise<any>>();

// Start request
controller.current = AuthService.login(credentials);

// Cancel on unmount
useEffect(() => {
  return () => {
    controller.current?.cancel();
  };
}, []);
```

## Best Practices

1. **Regenerate after backend changes**: Run `yarn generate` when APIs change
2. **Don't modify generated files**: They will be overwritten
3. **Use TypeScript types**: Import types for type safety
4. **Handle errors properly**: Use ApiError type for error handling
5. **Cancel requests**: Cancel ongoing requests when components unmount
6. **Environment config**: Use environment variables for API URLs

## Common Patterns

### Authenticated Requests
```typescript
// Ensure token is set before making requests
if (token) {
  OpenAPI.TOKEN = token;
  const logs = await LogsService.getLogs();
}
```

### Loading States
```typescript
const [loading, setLoading] = useState(false);

async function fetchData() {
  setLoading(true);
  try {
    const data = await AuthService.isUserLogged();
    // Handle data
  } finally {
    setLoading(false);
  }
}
```

### Type Imports
```typescript
// Import types separately for better tree-shaking
import type { UserDto, LoginDto } from '@/api/models';
import { AuthService } from '@/api/services';
```