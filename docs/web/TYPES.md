# Web Types Reference Guide

This document provides a comprehensive reference for TypeScript type definitions in the `web/@types` directory.

## Related Documentation
- [[STATE]] - How types integrate with state management
- [[COMPONENTS]] - Component type definitions
- [[API_GENERATION]] - Generated API types
- [[PAGES]] - Page-level type usage
- [[HOOKS]] - Hook type definitions
- [[UTILS]] - Utility function types

## Directory Overview

The @types directory contains custom TypeScript type definitions and interfaces:
- **common.ts**: Common utility types and interfaces
- **navigation.ts**: Navigation and routing types
- **polymorphic.tsx**: Polymorphic component type utilities
- **user.ts**: User and authentication types
- **tanstack-table.d.ts**: TanStack Table type extensions
- **quill.d.ts**: Quill editor type definitions

## Common Types (`common.ts`)

### Basic Types
```typescript
export type ID = string | number;

export type Status = 'idle' | 'loading' | 'success' | 'error';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export type Position = 'top' | 'right' | 'bottom' | 'left';
```

### Utility Types
```typescript
// Make specific properties optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make specific properties required
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Extract non-nullable types
export type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
```

### Data Types
```typescript
export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: React.ReactNode;
}
```

### Form Types
```typescript
export interface FormField {
  name: string;
  label?: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  validation?: any; // Yup schema
}

export interface FormError {
  field: string;
  message: string;
}
```

## Navigation Types (`navigation.ts`)

### Route Types
```typescript
export interface RouteItem {
  path: string;
  title: string;
  icon?: React.ComponentType;
  badge?: string | number;
  children?: RouteItem[];
  roles?: string[];
  isPublic?: boolean;
}

export interface NavigationSection {
  title: string;
  items: RouteItem[];
  roles?: string[];
}

export interface Breadcrumb {
  label: string;
  path?: string;
  active?: boolean;
}
```

### Menu Types
```typescript
export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  danger?: boolean;
  children?: MenuItem[];
}

export interface NavigationProps {
  sections: NavigationSection[];
  currentPath: string;
  onNavigate?: (path: string) => void;
}
```

## Polymorphic Types (`polymorphic.tsx`)

### Base Polymorphic Type
```typescript
export type AsProp<T extends React.ElementType> = {
  as?: T;
};

export type PropsToOmit<T extends React.ElementType, P> = keyof (AsProp<T> & P);

export type PolymorphicComponentProp<
  T extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<T>> &
  Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

export type PolymorphicComponentPropWithRef<
  T extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<T, Props> & { ref?: PolymorphicRef<T> };

export type PolymorphicRef<T extends React.ElementType> = 
  React.ComponentPropsWithRef<T>['ref'];
```

### Usage Example
```typescript
// Button component that can render as any element
type ButtonProps<T extends React.ElementType> = PolymorphicComponentPropWithRef<
  T,
  {
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
  }
>;

function Button<T extends React.ElementType = 'button'>({
  as,
  ...props
}: ButtonProps<T>) {
  const Component = as || 'button';
  return <Component {...props} />;
}

// Usage
<Button as="a" href="/home" variant="primary" />
<Button as={Link} to="/about" size="lg" />
```

## User Types (`user.ts`)

### User Models
```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}
```

### Auth Types
```typescript
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}
```

## TanStack Table Extensions (`tanstack-table.d.ts`)

### Column Meta Extensions
```typescript
declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'left' | 'center' | 'right';
    className?: string;
    headerClassName?: string;
    filterable?: boolean;
    sortable?: boolean;
    width?: number | string;
  }

  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    removeRow: (rowIndex: number) => void;
    addRow: (data: TData) => void;
  }
}
```

### Filter Types
```typescript
export interface TableFilter {
  id: string;
  value: unknown;
}

export interface TableState {
  filters: TableFilter[];
  sorting: SortingState;
  pagination: PaginationState;
  columnVisibility: Record<string, boolean>;
  rowSelection: Record<string, boolean>;
}
```

## Quill Types (`quill.d.ts`)

### Module Declaration
```typescript
declare module 'quill' {
  export interface QuillOptionsStatic {
    theme?: string;
    modules?: Record<string, any>;
    formats?: string[];
    placeholder?: string;
    readOnly?: boolean;
  }

  export interface Quill {
    root: HTMLElement;
    getText(): string;
    setText(text: string): void;
    getHTML(): string;
    setHTML(html: string): void;
    getContents(): any;
    setContents(delta: any): void;
    on(event: string, handler: Function): void;
    off(event: string, handler: Function): void;
  }
}
```

### React Quill Types
```typescript
declare module 'react-quill' {
  export interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    theme?: string;
    modules?: Record<string, any>;
    formats?: string[];
    placeholder?: string;
    readOnly?: boolean;
    className?: string;
  }
}
```

## Usage Guidelines

### Type Imports
```typescript
// Import types separately for clarity
import type { User, AuthState } from '@/@types/user';
import type { RouteItem, NavigationSection } from '@/@types/navigation';
import type { ApiResponse, SelectOption } from '@/@types/common';
```

### Generic Components
```typescript
// Using polymorphic types
function Card<T extends React.ElementType = 'div'>(
  props: PolymorphicComponentPropWithRef<T, CardProps>
) {
  // Implementation
}

// Using common types
function DataTable<T>({ 
  data, 
  pagination 
}: { 
  data: T[], 
  pagination: PaginationInfo 
}) {
  // Implementation
}
```

### Type Guards
```typescript
// User role check
export function isAdmin(user: User): boolean {
  return user.role === UserRole.ADMIN;
}

// API response check
export function isApiError(response: ApiResponse): boolean {
  return !response.success;
}
```

### Extending Types
```typescript
// Extend existing types for specific use cases
interface ExtendedUser extends User {
  permissions: string[];
  lastLoginAt: string;
}

// Combine types
type UserWithProfile = User & {
  profile: UserProfile;
};
```

## Best Practices

1. **Use type imports**: Always use `import type` for type-only imports
2. **Avoid any**: Use unknown or generic types instead
3. **Document complex types**: Add JSDoc comments for clarity
4. **Export consistently**: Export types from index files
5. **Maintain compatibility**: Ensure types match backend DTOs (see [[API_GENERATION]])
6. **Use enums sparingly**: Consider union types for better tree-shaking
7. **Component types**: Follow patterns in [[COMPONENTS]]
8. **State types**: Align with [[STATE]] management patterns

## Common Patterns

### Discriminated Unions
```typescript
type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

### Utility Type Creation
```typescript
// Deep partial type
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

// Nullable type
type Nullable<T> = T | null;

// Array element type
type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;
```