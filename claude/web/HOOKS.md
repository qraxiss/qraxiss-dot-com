# Web Hooks Reference Guide

This document provides a comprehensive reference for all custom hooks in the `web/hooks` directory. It's designed as a quick lookup guide to help manage context efficiently.

## UI/DOM Hooks

### useBoxPosition
- **Purpose**: Tracks element position relative to viewport or parent
- **Parameters**: `ref: RefObject<HTMLElement>`, `options?: { relative?: boolean }`
- **Returns**: `{ x: number, y: number }`
- **Key Features**: Real-time position tracking, viewport/parent relative positioning
- **Example**:
```tsx
const ref = useRef<HTMLDivElement>(null);
const { x, y } = useBoxPosition(ref);
```

### useBoxSize
- **Purpose**: Tracks element dimensions using ResizeObserver
- **Parameters**: `ref: RefObject<HTMLElement>`
- **Returns**: `{ width: number, height: number }`
- **Key Features**: Automatic resize detection, updates on dimension changes
- **Example**:
```tsx
const ref = useRef<HTMLDivElement>(null);
const { width, height } = useBoxSize(ref);
```

### useHover
- **Purpose**: Detects mouse hover state on element
- **Parameters**: None (returns ref to attach)
- **Returns**: `{ hovered: boolean, ref: RefObject<T> }`
- **Key Features**: Mouse enter/leave detection
- **Example**:
```tsx
const { hovered, ref } = useHover<HTMLDivElement>();
return <div ref={ref}>{hovered ? 'Hovering' : 'Not hovering'}</div>;
```

### useDataScrollOverflow
- **Purpose**: Detects and sets data attributes for scroll overflow state
- **Parameters**: `ref: RefObject<HTMLElement>`
- **Returns**: void
- **Key Features**: Sets `data-scroll-start` and `data-scroll-end` attributes
- **Use Case**: Styling based on scroll position (shadows, indicators)
- **Example**:
```tsx
const ref = useRef<HTMLDivElement>(null);
useDataScrollOverflow(ref);
```

### useLockScrollbar
- **Purpose**: Prevents body scrolling when active
- **Parameters**: `locked: boolean`
- **Returns**: void
- **Key Features**: Preserves scrollbar width, prevents layout shift
- **Example**:
```tsx
useLockScrollbar(isModalOpen);
```

### useCollapse
- **Purpose**: Animated collapse/expand functionality
- **Parameters**: `opened: boolean`, `options?: { duration?: number, timingFunction?: string }`
- **Returns**: `{ ref: RefObject<HTMLElement>, currentHeight: string | number }`
- **Key Features**: Smooth height animations, customizable timing
- **Example**:
```tsx
const { ref, currentHeight } = useCollapse(isOpen, { duration: 300 });
return <div ref={ref} style={{ height: currentHeight }}>Content</div>;
```

## State Management Hooks

### useToggle
- **Purpose**: Boolean state toggle with optional default
- **Parameters**: `defaultValue?: boolean`
- **Returns**: `[value: boolean, toggle: () => void]`
- **Key Features**: Simple boolean state management
- **Example**:
```tsx
const [isOpen, toggle] = useToggle(false);
```

### useDisclosure
- **Purpose**: Enhanced boolean state with open/close/toggle handlers
- **Parameters**: `defaultValue?: boolean`
- **Returns**: `{ isOpen: boolean, open: () => void, close: () => void, toggle: () => void }`
- **Key Features**: Multiple control methods for boolean state
- **Example**:
```tsx
const { isOpen, open, close, toggle } = useDisclosure();
```

### useListState
- **Purpose**: Array state management with utility methods
- **Parameters**: `initialState?: T[]`
- **Returns**: Object with array operations (append, prepend, remove, filter, etc.)
- **Key Features**: Immutable array operations, index-based manipulation
- **Example**:
```tsx
const list = useListState<string>(['item1', 'item2']);
list.append('item3');
list.remove(0);
```

### useStep
- **Purpose**: Step/wizard navigation state
- **Parameters**: `{ max: number, initial?: number }`
- **Returns**: Object with step navigation methods
- **Key Features**: Bounded step navigation, percentage calculation
- **Example**:
```tsx
const { active, goToNext, goToPrev, percentage } = useStep({ max: 5 });
```

### useUncontrolled
- **Purpose**: Manages controlled/uncontrolled component state
- **Parameters**: `{ value?: T, defaultValue?: T, onChange?: (value: T) => void }`
- **Returns**: `[value: T, setValue: (value: T) => void]`
- **Key Features**: Seamless controlled/uncontrolled behavior
- **Example**:
```tsx
const [value, setValue] = useUncontrolled({ 
  value: props.value,
  defaultValue: '',
  onChange: props.onChange 
});
```

### useLocalStorage
- **Purpose**: Syncs state with localStorage
- **Parameters**: `{ key: string, defaultValue?: T }`
- **Returns**: `[value: T, setValue: (value: T) => void, removeValue: () => void]`
- **Key Features**: Automatic serialization, SSR safe, storage event sync
- **Example**:
```tsx
const [theme, setTheme] = useLocalStorage({ 
  key: 'theme',
  defaultValue: 'light' 
});
```

## Performance Hooks

### useDebounceValue
- **Purpose**: Debounces value updates
- **Parameters**: `value: T`, `delay: number`
- **Returns**: `T` (debounced value)
- **Key Features**: Delays value updates, cancels on unmount
- **Example**:
```tsx
const [search, setSearch] = useState('');
const debouncedSearch = useDebounceValue(search, 500);
```

### useDebounceCallback
- **Purpose**: Debounces function calls
- **Parameters**: `callback: (...args: T[]) => void`, `delay: number`
- **Returns**: Debounced function
- **Key Features**: Cancellable, preserves latest args
- **Example**:
```tsx
const debouncedSave = useDebounceCallback((value: string) => {
  saveToAPI(value);
}, 1000);
```

## Storage/Data Hooks

### useClipboard
- **Purpose**: Clipboard operations with timeout
- **Parameters**: `{ timeout?: number }`
- **Returns**: `{ copy: (text: string) => void, copied: boolean, error: Error | null }`
- **Key Features**: Copy to clipboard, success state, error handling
- **Example**:
```tsx
const { copy, copied } = useClipboard({ timeout: 2000 });
return <button onClick={() => copy('Hello!')}>
  {copied ? 'Copied!' : 'Copy'}
</button>;
```

### useFuse
- **Purpose**: Fuzzy search using Fuse.js
- **Parameters**: `list: T[]`, `options: FuseOptions<T>`, `term?: string`
- **Returns**: Search results array
- **Dependencies**: Fuse.js library
- **Example**:
```tsx
const results = useFuse(items, {
  keys: ['name', 'description'],
  threshold: 0.3
}, searchTerm);
```

### useHighlight
- **Purpose**: Highlights search terms in text
- **Parameters**: `{ value: string, highlightClassName?: string }`
- **Returns**: `(term: string | null) => ReactNode`
- **Key Features**: Case-insensitive matching, custom highlight styling
- **Example**:
```tsx
const highlight = useHighlight({ 
  value: 'Hello World',
  highlightClassName: 'bg-yellow-200' 
});
return <div>{highlight('world')}</div>;
```

## Events/Effects Hooks

### useEventListener
- **Purpose**: Manages DOM event listeners
- **Parameters**: `event: K`, `handler: EventHandler<K>`, `element?: RefObject | Document | Window`, `options?: AddEventListenerOptions`
- **Returns**: void
- **Key Features**: Automatic cleanup, type-safe events, supports capture/passive
- **Example**:
```tsx
useEventListener('click', handleClick, buttonRef);
useEventListener('resize', handleResize, window);
```

### useEventCallback
- **Purpose**: Stable callback reference that always uses latest function
- **Parameters**: `fn: T`
- **Returns**: `T` (stable function reference)
- **Key Features**: Prevents unnecessary re-renders, always calls latest version
- **Example**:
```tsx
const stableCallback = useEventCallback((value: string) => {
  console.log(value, someState); // Always uses latest someState
});
```

### useDidUpdate
- **Purpose**: Runs effect only on updates (not initial mount)
- **Parameters**: `fn: () => void`, `deps?: DependencyList`
- **Returns**: void
- **Key Features**: Skips initial render, same API as useEffect
- **Example**:
```tsx
useDidUpdate(() => {
  console.log('Value changed!');
}, [value]);
```

### useUnmount
- **Purpose**: Runs cleanup function on unmount
- **Parameters**: `fn: () => void`
- **Returns**: void
- **Key Features**: Guaranteed cleanup execution
- **Example**:
```tsx
useUnmount(() => {
  saveDataToAPI();
  clearTimers();
});
```

## Browser/Document Hooks

### useDocumentTitle
- **Purpose**: Manages document title
- **Parameters**: `title: string`
- **Returns**: void
- **Key Features**: Automatic cleanup, restores previous title
- **Example**:
```tsx
useDocumentTitle('My Page | App Name');
```

### useMediaQuery
- **Purpose**: Tracks media query match state
- **Parameters**: `query: string`, `defaultValue?: boolean`
- **Returns**: `boolean`
- **Key Features**: Real-time updates, SSR safe with default
- **Example**:
```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)', false);
```

### useApexCharts
- **Purpose**: Initializes and manages ApexCharts instance
- **Parameters**: `container: RefObject<HTMLElement>`, `options: ApexOptions`
- **Returns**: `ApexCharts | null`
- **Dependencies**: ApexCharts library
- **Key Features**: Automatic cleanup, reactive updates
- **Example**:
```tsx
const chartRef = useRef<HTMLDivElement>(null);
const chart = useApexCharts(chartRef, {
  series: data,
  chart: { type: 'line' }
});
```

## Utility Hooks

### useId
- **Purpose**: Generates stable unique IDs
- **Parameters**: `prefix?: string`
- **Returns**: `string`
- **Key Features**: SSR safe, collision resistant
- **Example**:
```tsx
const inputId = useId('input');
return <input id={inputId} aria-describedby={`${inputId}-error`} />;
```

### useIsMounted
- **Purpose**: Tracks component mount state
- **Parameters**: None
- **Returns**: `() => boolean`
- **Key Features**: Prevents state updates on unmounted components
- **Example**:
```tsx
const isMounted = useIsMounted();
useEffect(() => {
  fetchData().then(data => {
    if (isMounted()) {
      setData(data);
    }
  });
}, []);
```

### useMergedRef
- **Purpose**: Merges multiple refs into one
- **Parameters**: `...refs: (RefCallback<T> | RefObject<T> | null | undefined)[]`
- **Returns**: `RefCallback<T>`
- **Key Features**: Handles both ref objects and callbacks
- **Example**:
```tsx
const localRef = useRef<HTMLDivElement>(null);
const mergedRef = useMergedRef(localRef, forwardedRef);
return <div ref={mergedRef} />;
```

## Common Patterns

1. **SSR Safety**: Many hooks include SSR checks (`typeof window !== 'undefined'`)
2. **Cleanup**: Automatic cleanup in useEffect returns
3. **Type Safety**: Full TypeScript support with generics
4. **Performance**: Debouncing, memoization where appropriate
5. **Flexibility**: Options parameters for customization

## Usage Tips

- Import hooks individually for better tree-shaking
- Check SSR compatibility when using browser-specific hooks
- Use performance hooks (debounce) for expensive operations
- Combine hooks for complex behaviors
- Refer to example usage in component demos