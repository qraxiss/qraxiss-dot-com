# Web Directory Documentation

This document provides comprehensive documentation for key directories in the web (frontend) application.

## Table of Contents
1. [web/utils/](#webutils)
2. [web/styles/](#webstyles)
3. [web/state/](#webstate)
4. [web/api/](#webapi)
5. [web/@types/](#webtypes)
6. [web/i18n/](#webi18n)

---

## web/utils/

### Overview
The utils directory contains utility functions and helpers used throughout the frontend application. It provides reusable functionality for common tasks like formatting, DOM manipulation, and React-specific utilities.

### Directory Structure
```
utils/
├── dom/                    # DOM manipulation utilities
├── react-table/           # React Table specific utilities
├── axios.ts               # Axios instance configuration
├── capitalize.ts          # String capitalization
├── colorFromText.ts       # Generate colors from text
├── compareArrays.ts       # Array comparison utilities
├── createEventHandler.ts  # Event handler creation
├── createSafeContext.tsx  # Safe React context creation
├── ensureString.ts        # String type enforcement
├── formatByte.ts          # Byte formatting
├── formatNumber.ts        # Number formatting
├── getMultipleRandom.ts   # Random selection utilities
├── isRouteActive.ts       # Route matching utilities
├── isServer.ts            # SSR detection
├── jwt.ts                 # JWT token management
├── msToTime.ts            # Millisecond to time conversion
├── quillUtils.ts          # Quill editor utilities
├── randomId.ts            # Random ID generation
├── range.ts               # Number range generation
├── setThisClass.ts        # Dynamic class management
├── ssr-stubs.ts           # SSR stub utilities
└── stringToSlug.ts        # String slug generation
```

### Key Files and Their Roles

#### axios.ts
- **Purpose**: Creates and configures the Axios HTTP client instance
- **Features**:
  - Base URL configuration from JWT_HOST_API
  - Response interceptor for error handling
  - Extracts error data from response or provides fallback message

#### createSafeContext.tsx
- **Purpose**: Factory function for creating type-safe React contexts
- **Parameters**: `errorMessage` - Error message when context is used outside provider
- **Returns**: Tuple of [Provider, useSafeContext]
- **Usage Example**:
```typescript
const [ThemeProvider, useTheme] = createSafeContext<ThemeContextValue>(
  'useTheme must be used within ThemeProvider'
);
```

#### jwt.ts
- **Purpose**: JWT token management utilities
- **Functions**:
  - `isTokenValid(authToken: string): boolean` - Validates JWT expiration
  - `setSession(authToken?: string | null): void` - Manages token storage and API configuration
- **Features**:
  - Token validation using jwt-decode
  - localStorage integration
  - OpenAPI token configuration

#### formatNumber.ts
- **Purpose**: Formats numbers with human-readable suffixes
- **Parameters**: 
  - `num: number` - Number to format
  - `precision: number = 2` - Decimal places
- **Returns**: Formatted string (e.g., "1.5k", "2.3M", "1B")
- **Throws**: Errors for invalid inputs

#### dom/ Directory
Contains DOM-specific utilities:
- **createScopedKeydownHandler.ts**: Keyboard navigation for focusable elements
- **detectDeviceType.ts**: Device type detection
- **detectTouch.ts**: Touch capability detection
- **getScrollbarWidth.ts**: Calculate scrollbar width
- **getUserAgentBrowser.ts**: Browser detection
- **getUserAgentOS.ts**: OS detection
- **injectStylesToHead.ts**: Dynamic style injection
- **triggerPostMoveFlash.ts**: Visual feedback utilities

#### react-table/ Directory
- **fuzzyFilter.ts**: Fuzzy search filter for TanStack Table
- **useSkipper.ts**: Hook for skipping React Table updates

### Important Patterns and Conventions
1. **Error Handling**: Consistent error throwing with descriptive messages
2. **Type Safety**: Strong TypeScript typing throughout
3. **SSR Compatibility**: Utilities check for browser environment
4. **Functional Programming**: Pure functions where possible
5. **Modular Structure**: Single responsibility per utility

---

## web/styles/

### Overview
The styles directory contains the CSS architecture using Tailwind CSS v4 with custom configurations, component styles, and theme definitions.

### Directory Structure
```
styles/
├── app/
│   ├── components/        # Component-specific styles
│   ├── forms/            # Form element styles
│   ├── vendors/          # Third-party library styles
│   └── index.css         # App style imports
├── base.css              # Base HTML element styles
├── colors.css            # Color palette definitions
├── index.css             # Main style entry point
├── layouts.css           # Layout-specific styles
└── variants.css          # Custom CSS variants
```

### Key Files and Their Roles

#### index.css
- **Purpose**: Main style entry point with layer definitions
- **Layers**: theme, base, vendor, components, utilities
- **Features**:
  - Custom theme variables (fonts, text sizes, shadows, animations)
  - Color system integration
  - Custom dark mode variant
  - Z-index system (1-5)
  - Responsive text size tokens

#### base.css
- **Purpose**: Base HTML element styling and utilities
- **Key Features**:
  - Dark mode support with CSS variables
  - Card skin variations (default/bordered)
  - Custom scrollbar styling
  - Sidebar toggle animations
  - Responsive height utilities (100vh/100dvh)
  - Input number arrow hiding

#### app/components/
Component-specific styles:
- **avatar.css**: Avatar component variations
- **badge.css**: Badge styling
- **button.css**: Button variations and states
- **circlebar.css**: Circular progress indicators
- **table.css**: Table component styles
- **timeline.css**: Timeline component styles

#### app/forms/
Form element styles:
- **checkbox.css**: Custom checkbox styling
- **input.css**: Input field variations
- **radio.css**: Radio button styling
- **select.css**: Select dropdown styles
- **switch.css**: Toggle switch styling

### Styling Approach
1. **Tailwind CSS v4**: Primary styling framework
2. **CSS Layers**: Organized style precedence
3. **CSS Variables**: Dynamic theming support
4. **Dark Mode**: First-class dark mode with CSS variables
5. **Component Isolation**: Scoped component styles
6. **Responsive Design**: Mobile-first approach

### Theme Configuration
- **Colors**: Extended color palette with semantic colors (primary, secondary, info, success, warning, error)
- **Typography**: Custom font sizes and line heights
- **Shadows**: Soft shadows for light/dark modes
- **Animations**: Shimmer effect for loading states
- **Spacing**: Consistent spacing system

---

## web/state/

### Overview
The state directory implements Redux Toolkit for state management with RTK Query for API interactions. It follows a modular approach with feature-based API slices.

### Directory Structure
```
state/
├── api/
│   ├── auth.ts           # Authentication API slice
│   └── logs.ts           # Logs API slice
├── Provider.tsx          # Redux Provider wrapper
├── reducer.ts            # Root reducer combination
└── store.ts              # Redux store configuration
```

### Key Files and Their Roles

#### store.ts
- **Purpose**: Configures the Redux store
- **Features**:
  - Redux DevTools enabled
  - Custom middleware setup
  - Serializable check disabled for flexibility
  - RTK Query middleware integration

#### api/auth.ts
- **Purpose**: Authentication API slice using RTK Query
- **Endpoints**:
  - `login`: User login mutation
- **Features**:
  - Custom base query for API service integration
  - Error handling with try/catch
  - TypeScript types from generated API
- **Exports**: Hooks, reducer, middleware, and endpoints

#### Provider.tsx
- **Purpose**: Redux Provider wrapper component
- **Usage**: Wraps the application to provide Redux store access

#### reducer.ts
- **Purpose**: Combines all reducers into root reducer
- **Features**: Dynamic reducer composition

### State Management Approach
1. **RTK Query**: API state management with caching
2. **Type Safety**: Full TypeScript integration
3. **Code Generation**: API types from OpenAPI spec
4. **Middleware**: Custom middleware for auth and logging
5. **DevTools**: Development-time state inspection

### Usage Examples
```typescript
// Using auth mutation
const [login, { isLoading, error }] = useLoginMutation();

// Dispatching login
const result = await login({ username, password });
```

---

## web/api/

### Overview
The api directory contains auto-generated TypeScript client code from the NestJS backend's Swagger/OpenAPI documentation. This ensures type-safe API communication between frontend and backend.

### Directory Structure
```
api/
├── core/                 # Core API client functionality
│   ├── ApiError.ts      # API error handling
│   ├── ApiRequestOptions.ts
│   ├── ApiResult.ts
│   ├── CancelablePromise.ts
│   ├── OpenAPI.ts       # API configuration
│   └── request.ts       # HTTP request logic
├── models/              # TypeScript interfaces/types
│   ├── ErrorDto.ts
│   ├── IsUserLoggedDto.ts
│   ├── LoginDto.ts
│   └── ...
├── services/            # API service classes
│   ├── AuthService.ts
│   ├── LogsService.ts
│   └── WebService.ts
└── index.ts            # Main exports
```

### Key Components

#### core/OpenAPI.ts
- **Purpose**: Global API configuration
- **Configuration**:
  - BASE: API base URL (default: http://localhost:3000)
  - VERSION: API version
  - CREDENTIALS: Cookie handling
  - TOKEN: JWT token storage
  - HEADERS: Custom headers

#### services/AuthService.ts
- **Purpose**: Authentication-related API calls
- **Methods**:
  - `authControllerLogin(userDto)`: User login
  - `authController()`: Check authentication status
- **Returns**: CancelablePromise for request management

#### models/
Contains TypeScript interfaces matching backend DTOs:
- **LoginDto**: Login request payload
- **LoginResponseDto**: Login response with token
- **UserDto**: User information
- **ErrorDto**: Error response structure

### Integration with Backend
1. **Code Generation**: Run `yarn generate` to update from Swagger
2. **Type Safety**: All API calls are fully typed
3. **Error Handling**: Consistent error structure
4. **Request Cancellation**: Built-in request cancellation support

### Usage Example
```typescript
import { AuthService } from '@/api';

// Login
const response = await AuthService.authControllerLogin({
  username: 'user@example.com',
  password: 'password'
});

// Check auth status
const status = await AuthService.authController();
```

---

## web/@types/

### Overview
The @types directory contains custom TypeScript type definitions and interfaces used throughout the application.

### Files and Their Purposes

#### common.ts
- **Purpose**: Common type definitions
- **Types**:
  - `NotificationType`: Message, task, log, security
  - `MaskType`: UI mask shapes (circle, squircle, diamond, etc.)
  - `RequiredIf<T, Condition, K>`: Conditional required properties

#### navigation.ts
- **Purpose**: Navigation system types
- **Interface**: `NavigationTree`
  - id: Unique identifier
  - type: NavigationType enum
  - path: Route path
  - title: Display title
  - transKey: Translation key
  - icon: Icon identifier
  - childs: Nested navigation items

#### polymorphic.tsx
- **Purpose**: Polymorphic component types for flexible component APIs
- **Types**:
  - `PolymorphicRef<E>`: Reference type for element
  - `AsProp<E>`: Component prop for element type
  - `PolymorphicComponentProps<E, Props>`: Complete polymorphic props
- **Usage**: Enables components to accept different element types via `component` prop

#### user.ts
- **Purpose**: User-related type definitions
- **Content**: User profile, permissions, and authentication types

#### quill.d.ts & tanstack-table.d.ts
- **Purpose**: Type declarations for third-party libraries
- **Usage**: Extends library types for custom implementations

### Type Patterns
1. **Utility Types**: Conditional and mapped types
2. **Polymorphism**: Flexible component APIs
3. **Enums/Unions**: Restricted value sets
4. **Module Augmentation**: Extending third-party types

---

## web/i18n/

### Overview
The i18n directory implements internationalization using i18next with React integration. It supports multiple languages with lazy loading and automatic language detection.

### Directory Structure
```
i18n/
├── config.ts            # i18n configuration
├── langs.ts             # Language definitions
└── locales/            # Translation files
    ├── ar/             # Arabic translations
    ├── en/             # English translations
    ├── es/             # Spanish translations
    └── zh_cn/          # Chinese translations
```

### Key Files

#### config.ts
- **Purpose**: i18next configuration and initialization
- **Features**:
  - Language detection (localStorage, navigator)
  - SSR-safe initialization
  - Fallback language: English
  - Debug mode disabled in production
- **Configuration**:
  ```typescript
  {
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18nextLng"
    },
    fallbackLng: "en",
    supportedLngs: ["en", "ar", "es", "zh-cn"],
    interpolation: { escapeValue: false }
  }
  ```

#### langs.ts
- **Purpose**: Language metadata and lazy loading
- **Structure**:
  ```typescript
  {
    en: {
      label: "English",
      dayjs: () => import("dayjs/locale/en"),
      flatpickr: null,
      i18n: () => import("./locales/en/translations.json"),
      flag: "united-kingdom"
    }
  }
  ```
- **Features**:
  - Lazy loading for translations
  - Date library locale support (dayjs, flatpickr)
  - Country flag associations
  - RTL support (Arabic)

### Supported Languages
1. **English (en)**: Default language
2. **Arabic (ar)**: RTL support included
3. **Spanish (es)**: Full translations
4. **Chinese (zh-cn)**: Simplified Chinese

### Translation Structure
Translation files follow a nested JSON structure:
```json
{
  "common": {
    "welcome": "Welcome",
    "save": "Save"
  },
  "navigation": {
    "home": "Home",
    "profile": "Profile"
  }
}
```

### Usage Examples
```typescript
import { useTranslation } from 'react-i18next';

// In component
const { t, i18n } = useTranslation();

// Translate
const text = t('common.welcome');

// Change language
i18n.changeLanguage('es');

// Get current language
const currentLang = i18n.language;
```

### Integration Features
1. **Automatic Detection**: Browser language preference
2. **Persistence**: Language choice saved in localStorage
3. **Lazy Loading**: Translations loaded on demand
4. **Date Localization**: Integrated with dayjs and flatpickr
5. **Type Safety**: TypeScript support for translation keys

---

## Dependencies and Integrations

### Major Dependencies
- **Redux Toolkit**: State management
- **RTK Query**: API state and caching
- **Axios**: HTTP client (being phased out for RTK Query)
- **i18next**: Internationalization
- **Tailwind CSS v4**: Styling framework
- **TypeScript**: Type safety throughout

### Integration Points
1. **API Client**: Auto-generated from backend Swagger
2. **Authentication**: JWT tokens managed in utils and state
3. **Styling**: Component styles integrated with Tailwind
4. **Type System**: Shared types across all directories
5. **i18n**: Translation keys used throughout components

### Best Practices
1. **Code Generation**: Keep API client up-to-date
2. **Type Safety**: Use TypeScript strictly
3. **State Management**: Use RTK Query for API state
4. **Styling**: Follow Tailwind conventions
5. **i18n**: Always use translation keys, never hardcode text