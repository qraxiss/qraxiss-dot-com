# Web Components Reference Guide

This document provides a comprehensive reference for all components in the `web/components` directory. It's designed to be a quick lookup guide without full implementation details to help manage context efficiently.

## Related Documentation
- [[PAGES]] - How pages use these components
- [[STYLES]] - Styling approach and Tailwind CSS integration
- [[HOOKS]] - Custom React hooks used by components
- [[TYPES]] - TypeScript type definitions for components
- [[STATE]] - State management integration with components

## UI Components (`web/components/ui/`)

### Accordion
- **Location**: `/ui/Accordion/`
- **Components**: `Accordion`, `AccordionItem`, `AccordionButton`, `AccordionPanel`
- **Key Features**: Collapsible content sections with context-based state management
- **Usage**: Wrap items in Accordion, each item contains button + panel

### Avatar
- **Location**: `/ui/Avatar/`
- **Components**: `Avatar`, `AvatarDot`
- **Props**: `src`, `name`, `size`, `indicator`, `initialColor`, `initialVariant`
- **Key Features**: Image with fallback initials, auto-color from name, indicator support

### Badge
- **Location**: `/ui/Badge/`
- **Props**: `variant`, `color`, `children`
- **Key Features**: Label/status indicators with color schemes

### Box
- **Location**: `/ui/Box.tsx`
- **Key Features**: Polymorphic container component (accepts `component` prop)

### Button
- **Location**: `/ui/Button/`
- **Props**: `variant` (filled/outlined/soft/flat), `color`, `isIcon`, `isGlow`, `component`
- **Key Features**: Polymorphic button with multiple styles and glow effect

### Card
- **Location**: `/ui/Card/`
- **Key Features**: Content container component

### Circlebar
- **Location**: `/ui/Circlebar/`
- **Props**: `value`, `size`, `strokeWidth`, `gapDegree`, `offsetDegree`
- **Key Features**: Circular progress indicator

### Collapse
- **Location**: `/ui/Collapse/`
- **Key Features**: Animated show/hide container

### CopyButton
- **Location**: `/ui/CopyButton.tsx`
- **Key Features**: Button with copy-to-clipboard functionality

### Form Components
- **Location**: `/ui/Form/`
- **Components**:
  - `Input`: Text input with error support
  - `Textarea`: Multi-line text input
  - `Select`: Dropdown selection
  - `Checkbox`: Checkbox input
  - `Radio`: Radio button input
  - `Switch`: Toggle switch
  - `Range`: Slider input
  - `Upload`: File upload
  - `InputErrorMsg`: Error message display

### Pagination
- **Location**: `/ui/Pagination/`
- **Components**: `Pagination`, `PaginationControl`, `PaginationItems`, `PaginationDots`, `PaginationEdges`
- **Hook**: `usePagination`
- **Key Features**: Complete pagination system with context

### Progress
- **Location**: `/ui/Progress/`
- **Props**: `value`, `max`, `color`
- **Key Features**: Linear progress bar

### ScrollShadow
- **Location**: `/ui/ScrollShadow/`
- **Key Features**: Container with scroll indicators

### Skeleton
- **Location**: `/ui/Skeleton/`
- **Key Features**: Loading placeholder animations

### Spinner
- **Location**: `/ui/Spinner/`
- **Components**: `Spinner`, `GhostSpinner`
- **Key Features**: Loading indicators

### Table
- **Location**: `/ui/Table/`
- **Components**: `Table`, `THead`, `TBody`, `TFoot`, `Tr`, `Th`, `Td`
- **Key Features**: Semantic table components

### Tag
- **Location**: `/ui/Tag/`
- **Key Features**: Small label/chip component

### Timeline
- **Location**: `/ui/Timeline/`
- **Components**: `Timeline`, `TimelineItem`
- **Key Features**: Vertical timeline with context styling

## Shared Components (`web/components/shared/`)

### General Components
- `AnimatedTick`: Animated checkmark
- `ApplyWrapper`: Conditional rendering wrapper
- `Breadcrumbs`: Navigation trail
- `CollapsibleSearch`: Expandable search
- `ConfirmModal`: Confirmation dialog
- `ContextualHelp`: Help tooltip/popover
- `Delayed`: Delayed rendering
- `DropIndicator`: Drag-drop indicator
- `Highlight`: Text highlighting
- `Loadable`: Lazy loading with Suspense
- `NProgress`: Page loading bar
- `Page`: Page wrapper with title
- `PreviewImg`: Image preview
- `SafeIcon`: Safe icon wrapper
- `SidebarToggleBtn`: Sidebar toggle
- `SyntaxHighlighter`: Code highlighting
- `Tooltip`: Tooltip component

### Form Components (`/shared/form/`)
- `Datepicker`: Date picker
- `FileItem`: File display
- `FileItemSquare`: Square file display
- `Filepond`: FilePond integration
- `StyledCombobox`: Styled dropdown
- `StyledListbox`: Styled list
- `StyledSwitch`: Styled toggle
- `TextEditor`: Rich text editor

### Table Components (`/shared/table/`)
- `ColumnFilter`: Column filtering
- `CopyableCell`: Copy-enabled cell
- `DateFilter`: Date range filter
- `FacetedFilter`: Multi-select filter
- `FilterSelector`: Filter type selector
- `HighlightableCell`: Highlighting cell
- `ItemViewTypeSelect`: Grid/list toggle
- `PaginationSection`: Table pagination
- `RadioFilter`: Radio filter
- `RangeFilter`: Numeric range
- `ResponsiveFilter`: Mobile filter
- `SelectCheckbox`: Row selection
- `SelectedRowsActions`: Bulk actions
- `TableColumnsVisibility`: Column toggle
- `TableSettings`: Table config
- `TableSortIcon`: Sort indicator

## Template Components (`web/components/template/`)

### Main Components
- `DocsNavigation`: Docs sidebar nav
- `LanguageSelector`: Locale switcher
- `Notifications`: Notification panel
- `Progress`: Global progress
- `Search`: Global search
- `SplashScreen`: Loading splash
- `Toaster`: Toast notifications (Sonner)
- `Tooltip`: Template tooltip
- `Toc`: Table of contents

### RightSidebar (`/template/RightSidebar/`)
- `Apps`: App shortcuts
- `BankingCard`: Payment card
- `Header`: Sidebar header
- `News`: News feed
- `Search`: Sidebar search
- `Upgrade`: Upgrade prompt
- `Widgets`: Widget panel

## Docs Components (`web/components/docs/`)

### Demo Components (`/docs/demo/`)
- `DemoCard`: Demo wrapper
  - `CodeBox`: Code display
- `DemoLayout`: Demo layout
  - `ComponentProps`: Props table
  - `Params`: Parameter docs
  - `Returns`: Return docs

## Common Patterns

1. **Polymorphic Components**: Many accept `component` prop for custom elements (see [[TYPES]] for polymorphic type definitions)
2. **Context Usage**: Accordion, Pagination, Timeline use React Context (see [[STATE]] for context patterns)
3. **Theme Integration**: Dark mode support via theme context
4. **Tailwind CSS**: Primary styling approach (see [[STYLES]] for CSS architecture)
5. **TypeScript**: Full type support (see [[TYPES]] for type definitions)
6. **Accessibility**: Error messages, ARIA attributes
7. **Responsive**: Mobile-friendly designs

## Usage Tips

- Import from specific paths for tree-shaking
- Check component props files for detailed prop types
- Many components support ref forwarding
- Form components integrate with React Hook Form (see [[HOOKS]] for form hooks)
- Table components work with TanStack Table
- Use [[UTILS]] for component-related helper functions
- Reference [[PAGES]] to see components in action