# Web Utils Reference Guide

This document provides a comprehensive reference for all utility functions in the `web/utils` directory.

## Directory Overview

The utils directory contains helper functions organized by category:
- **Root utilities**: General-purpose helpers
- **DOM utilities** (`/dom/`): Browser and DOM manipulation
- **React Table utilities** (`/react-table/`): Table-specific helpers

## Core Utilities

### axios.ts
- **Purpose**: Configured Axios instance for API calls
- **Key Features**: 
  - Base URL configuration from environment
  - Request/response interceptors
  - Error handling
- **Usage**:
```tsx
import { axiosInstance } from '@/utils/axios';
const response = await axiosInstance.get('/api/users');
```

### capitalize.ts
- **Function**: `capitalize(str: string): string`
- **Purpose**: Capitalizes first letter of string
- **Example**: `capitalize('hello') // 'Hello'`

### colorFromText.ts
- **Function**: `colorFromText(text: string): string`
- **Purpose**: Generates consistent color from text (for avatars)
- **Returns**: HSL color string
- **Example**: `colorFromText('John Doe') // 'hsl(234, 70%, 50%)'`

### compareArrays.ts
- **Function**: `compareArrays<T>(a: T[], b: T[]): boolean`
- **Purpose**: Deep comparison of arrays
- **Features**: Handles different lengths, order matters

### createEventHandler.ts
- **Function**: `createEventHandler<T>(...handlers)`
- **Purpose**: Combines multiple event handlers into one
- **Example**:
```tsx
const handleClick = createEventHandler(
  preventDefault,
  stopPropagation,
  () => console.log('clicked')
);
```

### createSafeContext.tsx
- **Function**: `createSafeContext<T>(errorMessage?: string)`
- **Purpose**: Creates React context with safe access hook
- **Returns**: `[Provider, useContext]` tuple
- **Example**:
```tsx
const [ThemeProvider, useTheme] = createSafeContext<ThemeType>(
  'useTheme must be used within ThemeProvider'
);
```

### ensureString.ts
- **Function**: `ensureString(value: unknown): string`
- **Purpose**: Safely converts any value to string
- **Features**: Handles null, undefined, objects

### formatByte.ts
- **Function**: `formatByte(bytes: number, decimals?: number): string`
- **Purpose**: Formats bytes to human-readable size
- **Example**: `formatByte(1024) // '1 KB'`

### formatNumber.ts
- **Function**: `formatNumber(num: number, locale?: string): string`
- **Purpose**: Formats numbers with locale-specific separators
- **Example**: `formatNumber(1000000, 'en-US') // '1,000,000'`

### getMultipleRandom.ts
- **Function**: `getMultipleRandom<T>(arr: T[], num: number): T[]`
- **Purpose**: Gets multiple random items from array
- **Features**: No duplicates, shuffled results

### isRouteActive.ts
- **Function**: `isRouteActive(pathname: string, route: string, exact?: boolean): boolean`
- **Purpose**: Checks if route is active
- **Features**: Exact or partial matching

### isServer.ts
- **Constant**: `isServer: boolean`
- **Purpose**: SSR check for server/client environment
- **Value**: `typeof window === 'undefined'`

### jwt.ts
- **Functions**:
  - `decodeJwt(token: string): JWTPayload | null`
  - `isTokenExpired(token: string): boolean`
  - `getTokenExpirationTime(token: string): number | null`
- **Purpose**: JWT token utilities without external dependencies

### msToTime.ts
- **Function**: `msToTime(duration: number): TimeObject`
- **Purpose**: Converts milliseconds to time components
- **Returns**: `{ hours, minutes, seconds, milliseconds }`

### quillUtils.ts
- **Function**: `isQuillEmpty(value: string): boolean`
- **Purpose**: Checks if Quill editor content is empty
- **Features**: Handles HTML tags, whitespace

### randomId.ts
- **Function**: `randomId(): string`
- **Purpose**: Generates unique ID
- **Format**: `timestamp-random` (e.g., "1234567890-abcd")

### range.ts
- **Function**: `range(start: number, end?: number, step?: number): number[]`
- **Purpose**: Creates array of numbers
- **Example**: `range(1, 5) // [1, 2, 3, 4]`

### setThisClass.ts
- **Function**: `cn(...args: ClassValue[]): string`
- **Purpose**: Class name utility (re-export of clsx)
- **Features**: Conditional classes, object syntax

### ssr-stubs.ts
- **Purpose**: Server-side rendering stubs
- **Exports**: Mock implementations for SSR compatibility

### stringToSlug.ts
- **Function**: `stringToSlug(str: string): string`
- **Purpose**: Converts string to URL-safe slug
- **Example**: `stringToSlug('Hello World!') // 'hello-world'`

## DOM Utilities (`/dom/`)

### createScopedKeydownHandler.ts
- **Function**: `createScopedKeydownHandler(scope: string, handlers: Record<string, Function>)`
- **Purpose**: Scoped keyboard event handling
- **Example**:
```tsx
const handler = createScopedKeydownHandler('modal', {
  'Escape': closeModal,
  'Enter': submitModal
});
```

### detectDeviceType.ts
- **Function**: `detectDeviceType(): DeviceType`
- **Purpose**: Detects mobile/tablet/desktop
- **Returns**: 'mobile' | 'tablet' | 'desktop'

### detectTouch.ts
- **Function**: `detectTouch(): boolean`
- **Purpose**: Detects touch device capability

### getScrollbarWidth.ts
- **Function**: `getScrollbarWidth(): number`
- **Purpose**: Calculates browser scrollbar width
- **Use Case**: Preventing layout shift when hiding scrollbar

### getUserAgentBrowser.ts
- **Function**: `getUserAgentBrowser(): BrowserInfo`
- **Purpose**: Detects browser type and version
- **Returns**: `{ name, version }`

### getUserAgentOS.ts
- **Function**: `getUserAgentOS(): OSInfo`
- **Purpose**: Detects operating system
- **Returns**: `{ name, version }`

### injectStylesToHead.ts
- **Function**: `injectStylesToHead(id: string, styles: string)`
- **Purpose**: Dynamically injects CSS into document
- **Features**: Prevents duplicates, SSR safe

### isRef.ts
- **Function**: `isRef<T>(ref: any): ref is RefObject<T>`
- **Purpose**: Type guard for React refs

### triggerPostMoveFlash.ts
- **Function**: `triggerPostMoveFlash(element: HTMLElement)`
- **Purpose**: Visual feedback after element move
- **Features**: CSS animation trigger

### unRef.ts
- **Function**: `unRef<T>(ref: RefObject<T> | T): T`
- **Purpose**: Unwraps ref or returns value

## React Table Utilities (`/react-table/`)

### fuzzyFilter.ts
- **Function**: `fuzzyFilter<T>(row: Row<T>, columnId: string, filterValue: string): boolean`
- **Purpose**: Fuzzy text filtering for tables
- **Features**: Case-insensitive, partial matching

### useSkipper.ts
- **Hook**: `useSkipper(): [boolean, () => void]`
- **Purpose**: Skip expensive computations
- **Use Case**: Optimizing table re-renders during editing

## Common Patterns

1. **SSR Safety**: Many utilities check `isServer` or `typeof window`
2. **Type Safety**: Full TypeScript support with generics
3. **Pure Functions**: Most utilities are side-effect free
4. **Error Handling**: Safe fallbacks for edge cases
5. **Performance**: Optimized algorithms where needed

## Usage Tips

- Import utilities directly for tree-shaking
- Check SSR compatibility for DOM utilities
- Use type-safe utilities like `createSafeContext`
- Leverage formatting utilities for consistent UI
- Combine utilities for complex operations