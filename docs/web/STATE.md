# Web State Management Reference Guide

This document provides a comprehensive reference for state management in the `web/state` directory using Redux Toolkit and RTK Query.

## Related Documentation
- [[API_GENERATION]] - How API slices are generated
- [[TYPES]] - TypeScript types for state
- [[PAGES]] - How pages use state management
- [[COMPONENTS]] - Component state integration
- [[HOOKS]] - State-related hooks
- [[SSR]] - Server-side state hydration

## Directory Overview

The state directory implements centralized state management:
- **store.ts**: Redux store configuration
- **reducer.ts**: Root reducer with feature slices
- **Provider.tsx**: React-Redux provider wrapper
- **api/**: RTK Query API slices for backend communication

## Store Configuration

### store.ts
```typescript
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      logsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Key Features**:
- Redux Toolkit store setup
- RTK Query middleware integration
- Redux Persist compatibility
- TypeScript types for state and dispatch

### reducer.ts
```typescript
const rootReducer = combineReducers({
  // RTK Query reducers
  [authApi.reducerPath]: authApi.reducer,
  [logsApi.reducerPath]: logsApi.reducer,
});
```

**Features**:
- Combines all feature reducers
- RTK Query reducer integration
- Extensible for additional slices

### Provider.tsx
```typescript
export function StateProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

**Purpose**: Wraps app with Redux provider

## RTK Query APIs

### Auth API (`/api/auth.ts`)

#### Base Configuration
```typescript
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({...}),
});
```

#### Endpoints

**1. Login**
```typescript
login: builder.mutation<LoginResponseDto, LoginDto>({
  query: (data) => ({
    url: '/auth/login',
    method: 'POST',
    body: data,
  }),
  invalidatesTags: ['Auth'],
})
```
- **Input**: `LoginDto` (email, password)
- **Output**: `LoginResponseDto` (user, token)
- **Side Effects**: Invalidates auth cache

**2. Check Login Status**
```typescript
isUserLogged: builder.query<IsUserLoggedResponseDto, void>({
  query: () => '/auth/is-user-logged',
  providesTags: ['Auth'],
})
```
- **Input**: None
- **Output**: `IsUserLoggedResponseDto` (isLogged, user)
- **Cache**: Tagged with 'Auth'

#### Generated Hooks
```typescript
export const { 
  useLoginMutation,
  useIsUserLoggedQuery,
  useLazyIsUserLoggedQuery 
} = authApi;
```

### Logs API (`/api/logs.ts`)

#### Base Configuration
```typescript
export const logsApi = createApi({
  reducerPath: 'logsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
  }),
  tagTypes: ['Logs'],
  endpoints: (builder) => ({...}),
});
```

#### Endpoints

**1. Get Logs**
```typescript
getLogs: builder.query<LogResponseDto[], void>({
  query: () => '/logs',
  providesTags: ['Logs'],
})
```
- **Input**: None
- **Output**: Array of `LogResponseDto`
- **Cache**: Tagged with 'Logs'

#### Generated Hooks
```typescript
export const { 
  useGetLogsQuery,
  useLazyGetLogsQuery 
} = logsApi;
```

## Type Definitions

### API Response Types
```typescript
interface LoginResponseDto {
  user: UserDto;
  token: string;
}

interface IsUserLoggedResponseDto {
  isLogged: boolean;
  user?: UserDto;
}

interface LogResponseDto {
  id: string;
  message: string;
  timestamp: Date;
  level: 'info' | 'warn' | 'error';
}
```

### User Types
```typescript
interface UserDto {
  id: string;
  email: string;
  name: string;
  role: string;
}
```

## Usage Patterns

### Authentication Flow
```typescript
function LoginForm() {
  const [login, { isLoading, error }] = useLoginMutation();
  
  const handleSubmit = async (data: LoginDto) => {
    try {
      const result = await login(data).unwrap();
      // Handle successful login
      localStorage.setItem('token', result.token);
    } catch (err) {
      // Handle error
    }
  };
}
```

### Checking Auth Status
```typescript
function AuthGuard({ children }: { children: ReactNode }) {
  const { data, isLoading } = useIsUserLoggedQuery();
  
  if (isLoading) return <Spinner />;
  if (!data?.isLogged) return <Navigate to="/login" />;
  
  return <>{children}</>;
}
```

### Fetching Logs
```typescript
function LogsPage() {
  const { data: logs, isLoading, error } = useGetLogsQuery();
  
  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage />;
  
  return <LogsList logs={logs} />;
}
```

### Lazy Queries
```typescript
function ConditionalData() {
  const [trigger, { data, isLoading }] = useLazyIsUserLoggedQuery();
  
  const checkAuth = () => {
    trigger(); // Manually trigger the query
  };
}
```

## Cache Management

### Tag System
- **Auth**: User authentication state
- **Logs**: Application logs

### Cache Invalidation
```typescript
// After login, auth cache is invalidated
login.invalidatesTags(['Auth']);

// Manual cache update
dispatch(authApi.util.invalidateTags(['Auth']));
```

### Cache Updates
```typescript
// Optimistic update
dispatch(
  authApi.util.updateQueryData('isUserLogged', undefined, (draft) => {
    draft.isLogged = false;
  })
);
```

## Integration with Components

### Typed Hooks
```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/state/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Error Handling
```typescript
const { error } = useLoginMutation();

if (error) {
  if ('status' in error) {
    // RTK Query error
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
  }
}
```

## Best Practices

1. **Use RTK Query for API calls**: Automatic caching and synchronization (see [[API_GENERATION]])
2. **Tag-based invalidation**: Keep cache consistent
3. **Type safety**: Use generated types from backend (see [[TYPES]])
4. **Error boundaries**: Handle errors gracefully (see [[COMPONENTS]])
5. **Loading states**: Show appropriate UI feedback (see [[HOOKS]] for loading hooks)
6. **Optimistic updates**: For better UX when appropriate

## Common Patterns

### Protected Routes
```typescript
const { data } = useIsUserLoggedQuery();
const isAuthenticated = data?.isLogged ?? false;
```

### Form Integration
```typescript
const [login] = useLoginMutation();
const form = useForm<LoginDto>();

const onSubmit = form.handleSubmit((data) => {
  login(data);
});
```

See [[HOOKS]] for form-related hooks and [[PAGES]] for form page examples.

### Global Loading State
```typescript
const isAnyQueryLoading = useSelector((state: RootState) => 
  Object.values(state).some(
    (api: any) => api?.queries && Object.values(api.queries).some(
      (query: any) => query?.status === 'pending'
    )
  )
);
```

For SSR considerations with Redux state, see [[SSR]].