# React Hooks Reference Guide

## UI and DOM Hooks

### useApexCharts
**Purpose**: Dynamically loads ApexCharts component with SSR support  
**Parameters**: None  
**Returns**: `React.ComponentType` - Chart component or placeholder  
**Key Functionality**: 
- Returns a placeholder component during SSR
- Dynamically imports react-apexcharts on client side
- Handles loading errors gracefully
**Dependencies**: None  
**Example Usage**:
```typescript
const Chart = useApexCharts();
return <Chart type="line" options={chartOptions} series={chartSeries} />;
```

### useBoxPosition
**Purpose**: Tracks element position relative to viewport  
**Parameters**: None  
**Returns**: `{ ref: RefObject<T>, left: number, top: number }`  
**Key Functionality**:
- Updates position on scroll, resize, and element size changes
- Uses ResizeObserver for element changes
- Provides real-time position tracking
**Dependencies**: ResizeObserver API  
**Example Usage**:
```typescript
const { ref, left, top } = useBoxPosition<HTMLDivElement>();
return <div ref={ref}>Position: {left}, {top}</div>;
```

### useBoxSize
**Purpose**: Monitors element dimensions with ResizeObserver  
**Parameters**: 
- `options: { ref: RefObject<HTMLElement>, box?: 'content-box' | 'border-box' | 'device-pixel-content-box', onResize?: (size) => void }`
**Returns**: `{ width?: number, height?: number }`  
**Key Functionality**:
- Tracks element size changes with configurable box model
- Supports callback on resize
- Handles different box sizing models
**Dependencies**: `useIsMounted`, ResizeObserver API  
**Example Usage**:
```typescript
const ref = useRef<HTMLDivElement>(null);
const { width, height } = useBoxSize({ ref });
```

### useCollapse
**Purpose**: Animates element height for expand/collapse transitions  
**Parameters**:
- `options: { opened: boolean, transitionDuration?: number, transitionTimingFunction?: string, onTransitionEnd?: () => void, min?: string }`
**Returns**: `(props?: GetCollapseProps) => Record<string, any>`  
**Key Functionality**:
- Smooth height animations with auto-calculated duration
- Supports custom timing functions and minimum heights
- Handles transition end callbacks
**Dependencies**: `mergeRefs`, `useDidUpdate`  
**Example Usage**:
```typescript
const getCollapseProps = useCollapse({ opened: isOpen });
return <div {...getCollapseProps()}>Collapsible content</div>;
```

### useHover
**Purpose**: Detects mouse hover state on elements  
**Parameters**: None  
**Returns**: `[RefObject<T>, boolean]` - [ref, isHovered]  
**Key Functionality**:
- Tracks mouseenter/mouseleave events
- Provides hover state boolean
- Automatic cleanup on unmount
**Dependencies**: None  
**Example Usage**:
```typescript
const [ref, isHovered] = useHover<HTMLButtonElement>();
return <button ref={ref} style={{ color: isHovered ? 'blue' : 'black' }}>Hover me</button>;
```

## State Management Hooks

### useClipboard
**Purpose**: Manages clipboard operations with status tracking  
**Parameters**: `{ timeout?: number }` - Default 2000ms  
**Returns**: `{ copy: (value: any) => void, reset: () => void, error: Error | null, copied: boolean }`  
**Key Functionality**:
- Copies text to clipboard using navigator.clipboard API
- Tracks copy success/failure status
- Auto-resets copied state after timeout
**Dependencies**: Navigator Clipboard API  
**Example Usage**:
```typescript
const { copy, copied } = useClipboard();
return <button onClick={() => copy('Hello!')}>{copied ? 'Copied!' : 'Copy'}</button>;
```

### useDisclosure
**Purpose**: Manages boolean state with open/close/toggle actions  
**Parameters**: 
- `initialState?: boolean` - Default false
- `callbacks?: { onOpen?: () => void, onClose?: () => void }`
**Returns**: `[boolean, { open: () => void, close: () => void, toggle: () => void }]`  
**Key Functionality**:
- Common pattern for modals, dropdowns, drawers
- Supports open/close callbacks
- Prevents redundant state updates
**Dependencies**: None  
**Example Usage**:
```typescript
const [isOpen, { open, close, toggle }] = useDisclosure();
return <Modal isOpen={isOpen} onClose={close} />;
```

### useListState
**Purpose**: Advanced array state management with utility methods  
**Parameters**: `initialValue?: T[]` - Default []  
**Returns**: `[T[], UseListStateHandlers<T>]`  
**Key Functionality**:
- Methods: append, prepend, insert, remove, reorder, swap, filter
- Item-level updates with setItem and setItemProp
- Batch operations with apply and applyWhere
**Dependencies**: None  
**Example Usage**:
```typescript
const [items, handlers] = useListState([{ id: 1, name: 'Item 1' }]);
handlers.append({ id: 2, name: 'Item 2' });
handlers.reorder({ from: 0, to: 1 });
```

### useStep
**Purpose**: Manages multi-step workflows with navigation  
**Parameters**: `maxStep: number`  
**Returns**: `[number, { goToNextStep, goToPrevStep, reset, canGoToNextStep, canGoToPrevStep, setStep }]`  
**Key Functionality**:
- Step navigation with boundary checking
- Boolean flags for navigation availability
- Direct step setting with validation
**Dependencies**: None  
**Example Usage**:
```typescript
const [step, { goToNextStep, canGoToNextStep }] = useStep(5);
return <button onClick={goToNextStep} disabled={!canGoToNextStep}>Next</button>;
```

### useToggle
**Purpose**: Cycles through predefined values  
**Parameters**: `options?: readonly T[]` - Default [false, true]  
**Returns**: `[T, (value?: SetStateAction<T>) => void]`  
**Key Functionality**:
- Toggles between multiple values, not just boolean
- Supports cycling through custom value arrays
- Can set specific value or toggle to next
**Dependencies**: None  
**Example Usage**:
```typescript
const [theme, toggleTheme] = useToggle(['light', 'dark', 'auto']);
```

### useUncontrolled
**Purpose**: Manages controlled/uncontrolled component state  
**Parameters**: `{ value?: T, defaultValue?: T, finalValue?: T, onChange?: (value: T) => void }`  
**Returns**: `[T, (value: T) => void, boolean]` - [currentValue, setValue, isControlled]  
**Key Functionality**:
- Seamlessly handles both controlled and uncontrolled modes
- Falls back through value → defaultValue → finalValue
- Returns controlled state indicator
**Dependencies**: None  
**Example Usage**:
```typescript
const [value, setValue, controlled] = useUncontrolled({ 
  value: props.value, 
  defaultValue: 'default',
  onChange: props.onChange 
});
```

## Timing and Performance Hooks

### useDebounceCallback
**Purpose**: Debounces function calls with lodash  
**Parameters**: 
- `func: T` - Function to debounce
- `delay?: number` - Default 500ms
- `options?: { leading?: boolean, trailing?: boolean, maxWait?: number }`
**Returns**: `DebouncedState<T>` with cancel, flush, isPending methods  
**Key Functionality**:
- Full lodash debounce options support
- Control methods for canceling and flushing
- Automatic cleanup on unmount
**Dependencies**: `lodash/debounce`, `useUnmount`  
**Example Usage**:
```typescript
const debouncedSearch = useDebounceCallback(searchAPI, 300);
const handleChange = (e) => debouncedSearch(e.target.value);
```

### useDebounceValue
**Purpose**: Debounces value updates  
**Parameters**: 
- `initialValue: T | (() => T)`
- `delay: number`
- `options?: { leading?, trailing?, maxWait?, equalityFn? }`
**Returns**: `[T, DebouncedState<(value: T) => void>]`  
**Key Functionality**:
- Debounces value changes, not function calls
- Custom equality function support
- Returns both debounced value and update function
**Dependencies**: `useDebounceCallback`  
**Example Usage**:
```typescript
const [debouncedQuery, setDebouncedQuery] = useDebounceValue(query, 500);
```

## Data and Storage Hooks

### useLocalStorage
**Purpose**: Persists state to localStorage with synchronization  
**Parameters**: 
- `key: string`
- `initialValue: T | (() => T)`
- `options?: { serializer?, deserializer?, initializeWithValue? }`
**Returns**: `[T, Dispatch<SetStateAction<T>>, () => void]` - [value, setValue, removeValue]  
**Key Functionality**:
- Cross-tab synchronization via storage events
- Custom serialization support
- SSR-safe with initialization options
- Handles JSON parsing errors gracefully
**Dependencies**: `useEventCallback`, `useEventListener`  
**Example Usage**:
```typescript
const [theme, setTheme, removeTheme] = useLocalStorage('app-theme', 'light');
```

### useFuse
**Purpose**: Fuzzy search with Fuse.js integration  
**Parameters**: 
- `list: T[]` - Items to search
- `options: UseFuseOptions<T>` - Fuse.js options + limit, matchAllOnEmptyQuery
**Returns**: `{ result: FuseResult<T>[], query: string, loading: boolean, setQuery: Dispatch<SetStateAction<string>> }`  
**Key Functionality**:
- Full Fuse.js fuzzy search capabilities
- Deferred query updates for performance
- Option to return all items on empty query
**Dependencies**: `fuse.js`  
**Example Usage**:
```typescript
const { result, query, setQuery } = useFuse(items, { 
  keys: ['name', 'description'],
  threshold: 0.3 
});
```

## Event and Effect Hooks

### useEventListener
**Purpose**: Adds event listeners with automatic cleanup  
**Parameters**: 
- `eventName: K` - Event name (typed for different targets)
- `handler: (event) => void`
- `element?: RefObject` - Target element (default: window)
- `options?: boolean | AddEventListenerOptions`
**Returns**: void  
**Key Functionality**:
- Type-safe for Window, Document, HTMLElement, SVGElement, MediaQueryList
- Automatic cleanup on unmount
- Supports all addEventListener options
**Dependencies**: None  
**Example Usage**:
```typescript
useEventListener('resize', handleResize);
useEventListener('click', handleClick, buttonRef);
```

### useEventCallback
**Purpose**: Stable callback reference that always calls latest function  
**Parameters**: `fn: (...args: Args) => R`  
**Returns**: `(...args: Args) => R` - Stable callback  
**Key Functionality**:
- Prevents stale closures in callbacks
- Maintains stable reference for performance
- Throws error if called during render
**Dependencies**: None  
**Example Usage**:
```typescript
const stableCallback = useEventCallback((value) => {
  console.log(value, currentState); // Always uses latest state
});
```

### useDidUpdate
**Purpose**: useEffect that skips initial mount  
**Parameters**: 
- `fn: EffectCallback`
- `dependencies?: DependencyList`
**Returns**: void  
**Key Functionality**:
- Runs effect only on updates, not initial mount
- Same API as useEffect
- Useful for reacting to prop/state changes
**Dependencies**: None  
**Example Usage**:
```typescript
useDidUpdate(() => {
  console.log('Value changed:', value);
}, [value]);
```

### useUnmount
**Purpose**: Runs cleanup function on component unmount  
**Parameters**: `func: () => void`  
**Returns**: void  
**Key Functionality**:
- Guaranteed to run latest function version
- Stable reference using useRef
- Common for cleanup operations
**Dependencies**: None  
**Example Usage**:
```typescript
useUnmount(() => {
  saveDataToAPI();
  clearTimers();
});
```

## Browser and Document Hooks

### useDocumentTitle
**Purpose**: Updates document title with cleanup options  
**Parameters**: 
- `title: string`
- `options?: { preserveTitleOnUnmount?: boolean }` - Default true
**Returns**: void  
**Key Functionality**:
- Sets document.title
- Optionally restores original title on unmount
- SSR-safe implementation
**Dependencies**: `useUnmount`  
**Example Usage**:
```typescript
useDocumentTitle(`${pageTitle} | My App`);
```

### useMediaQuery
**Purpose**: Responsive design with media query matching  
**Parameters**: 
- `query: string` - CSS media query
- `options?: { defaultValue?: boolean, initializeWithValue?: boolean }`
**Returns**: `boolean` - Match status  
**Key Functionality**:
- Real-time media query matching
- SSR support with default values
- Handles legacy browser APIs
**Dependencies**: `isServer` utility  
**Example Usage**:
```typescript
const isMobile = useMediaQuery('(max-width: 768px)');
const prefersColorScheme = useMediaQuery('(prefers-color-scheme: dark)');
```

### useLockScrollbar
**Purpose**: Prevents body scroll with optional padding compensation  
**Parameters**: 
- `lock: boolean | undefined`
- `options?: { disableBodyPadding?: boolean }`
**Returns**: `[() => void, () => void]` - [lockScroll, unlockScroll]  
**Key Functionality**:
- Locks/unlocks body scroll
- Compensates for scrollbar width to prevent layout shift
- Injects styles dynamically
**Dependencies**: DOM utilities for style injection  
**Example Usage**:
```typescript
useLockScrollbar(isModalOpen);
// Or manual control:
const [lock, unlock] = useLockScrollbar(undefined);
```

## Utility Hooks

### useId
**Purpose**: Generates unique IDs for accessibility  
**Parameters**: 
- `staticId?: string` - Override with static ID
- `suffix?: string` - ID suffix
**Returns**: `string` - Unique identifier  
**Key Functionality**:
- Wraps React's useId with prefix/suffix
- Allows static ID override
- Consistent IDs across SSR/hydration
**Dependencies**: React's useId  
**Example Usage**:
```typescript
const id = useId();
const labelId = useId(undefined, 'label');
```

### useIsMounted
**Purpose**: Checks if component is currently mounted  
**Parameters**: None  
**Returns**: `() => boolean`  
**Key Functionality**:
- Returns function to check mount status
- Useful for avoiding state updates after unmount
- Maintains ref to track lifecycle
**Dependencies**: None  
**Example Usage**:
```typescript
const isMounted = useIsMounted();
fetchData().then(data => {
  if (isMounted()) setState(data);
});
```

### useMergedRef
**Purpose**: Combines multiple refs into one  
**Parameters**: `...refs: PossibleRef<T>[]`  
**Returns**: `RefCallback<T>`  
**Key Functionality**:
- Merges multiple refs (callback, object, undefined)
- Handles cleanup for callback refs
- Maintains all ref assignments
**Dependencies**: None  
**Example Usage**:
```typescript
const mergedRef = useMergedRef(forwardedRef, localRef, callbackRef);
return <div ref={mergedRef} />;
```

## Specialized UI Hooks

### useDataScrollOverflow
**Purpose**: Adds data attributes for scroll overflow styling  
**Parameters**: 
- `options?: { overflowCheck?: 'horizontal' | 'vertical' | 'both', visibility?: ScrollOverflowVisibility, isEnabled?: boolean, offset?: number, updateDeps?: any[], onVisibilityChange?: (overflow) => void }`
**Returns**: `{ ref: RefObject<HTMLElement> }`  
**Key Functionality**:
- Detects scrollable overflow in any direction
- Adds data attributes for CSS styling (data-top-scroll, data-bottom-scroll, etc.)
- Supports virtualized lists
- Configurable detection offset
**Dependencies**: ResizeObserver API  
**Example Usage**:
```typescript
const { ref } = useDataScrollOverflow({ overflowCheck: 'vertical' });
// CSS: [data-top-scroll="true"] { box-shadow: inset 0 10px 10px -10px rgba(0,0,0,0.1); }
```

### useHighlight
**Purpose**: Highlights text matches for search results  
**Parameters**: `{ text: string, query: string | string[] }`  
**Returns**: `HighlightChunk[]` - Array of { text: string, match: boolean }  
**Key Functionality**:
- Splits text into highlighted and non-highlighted chunks
- Supports multiple search terms
- Escapes regex special characters
- Case-insensitive matching
**Dependencies**: None  
**Example Usage**:
```typescript
const chunks = useHighlight({ text: 'Hello World', query: 'world' });
// Returns: [{ text: 'Hello ', match: false }, { text: 'World', match: true }]
```

## Hook Categories Summary

1. **UI/DOM**: useApexCharts, useBoxPosition, useBoxSize, useCollapse, useHover, useDataScrollOverflow
2. **State Management**: useClipboard, useDisclosure, useListState, useStep, useToggle, useUncontrolled
3. **Performance**: useDebounceCallback, useDebounceValue
4. **Storage/Data**: useLocalStorage, useFuse, useHighlight
5. **Events/Effects**: useEventListener, useEventCallback, useDidUpdate, useUnmount
6. **Browser/Document**: useDocumentTitle, useMediaQuery, useLockScrollbar
7. **Utilities**: useId, useIsMounted, useMergedRef