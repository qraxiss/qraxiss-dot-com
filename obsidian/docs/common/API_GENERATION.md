# API Generation Documentation

## Overview

This document describes the automated API generation workflow that creates TypeScript API clients from Swagger/OpenAPI specifications and integrates them with Redux Toolkit Query (RTK Query) for state management.

## Current Architecture

### 1. Swagger Generation

The NestJS application automatically generates a `swagger.json` file at startup:

```typescript
// src/main.ts
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);
writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
```

### 2. API Client Generation

The current implementation uses OpenAPI TypeScript Codegen to generate typed API clients:

```bash
yarn generate
```

This command runs `scripts/axios-generator.js` which:
- Reads the `swagger.json` file from the root directory
- Generates TypeScript API clients using axios
- Outputs to the `web/api` directory

Generated structure:
```
web/api/
├── core/           # Core API utilities
├── models/         # TypeScript interfaces/types
├── services/       # API service classes
└── index.ts        # Barrel exports
```

### 3. Redux Integration

API services are manually integrated with RTK Query:

```typescript
// web/state/api/auth.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { AuthService, LoginResponseDto, UserDto } from '@/api';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: async ({ queryFn }) => {
        try {
            const data = await queryFn();
            return { data };
        } catch (error) {
            return { error };
        }
    },
    endpoints: (builder) => ({
        login: builder.mutation({
            queryFn: async function login(userDto: UserDto) {
                try {
                    return {
                        data: await AuthService.authControllerLogin(userDto)
                    }
                } catch (error: any) {
                    return {
                        error
                    }
                }
            }
        })
    }),
});
```

### 4. Store Configuration

Redux store is manually configured with API middleware:

```typescript
// web/state/store.ts
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            ...[authMiddleware, logsMiddleware]
        )
    },
});
```

## Required Automation

The goal is to automatically:

1. **Watch for swagger.json changes**
2. **Generate API clients**
3. **Create RTK Query implementations**
4. **Update reducers**
5. **Add middleware to store**

### Proposed Workflow

1. **File Watcher**: Monitor `swagger.json` for changes
2. **API Generation**: Run OpenAPI codegen
3. **RTK Query Generation**: 
   - Parse generated services
   - Create corresponding RTK Query slices
   - Generate hooks for each endpoint
4. **Auto-registration**:
   - Export paths, reducers, and middleware
   - Update `reducer.ts` with new paths
   - Update `store.ts` with new middleware

### Implementation Steps

1. **Create Enhanced Generator Script**:
   - Parse swagger.json to identify controllers/endpoints
   - Generate RTK Query slices for each service
   - Create barrel exports for easy imports

2. **Automatic Registration**:
   - Scan generated API slices
   - Dynamically import and register reducers
   - Dynamically add middleware to store

3. **File Watching** (Development):
   - Use nodemon or chokidar to watch swagger.json
   - Trigger generation on changes

4. **Build Integration**:
   - Add pre-build step to ensure APIs are generated
   - Validate API consistency

## Usage Example

After automation, using the API would be:

```typescript
// Automatically generated and registered
import { useGetUserQuery, useUpdateUserMutation } from '@/state/api/users';

function UserProfile({ userId }) {
    const { data, isLoading } = useGetUserQuery(userId);
    const [updateUser] = useUpdateUserMutation();
    
    // Component logic
}
```

## Benefits

1. **Type Safety**: Full TypeScript support from backend to frontend
2. **Automation**: No manual API integration required
3. **Consistency**: Standardized API patterns
4. **Developer Experience**: Auto-generated hooks and types
5. **Maintainability**: Single source of truth (swagger.json)

## Configuration

The system should support configuration for:

- Custom base query implementation
- Error handling strategies
- Cache invalidation patterns
- Optimistic updates
- Polling intervals

## Next Steps

1. Implement the enhanced API generator script
2. Add file watching for development
3. Create templates for common patterns
4. Add error boundary integration
5. Document migration guide for existing APIs