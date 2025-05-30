# Web Styles Reference Guide

This document provides a comprehensive reference for the styling architecture in the `web/styles` directory.

## Related Documentation
- [[COMPONENTS]] - How components use styles
- [[PAGES]] - Page-level styling patterns
- [[I18N]] - RTL styling considerations
- [[TYPES]] - TypeScript types for styles
- [[UTILS]] - Style-related utility functions

## Directory Overview

The styles directory implements a layered CSS architecture using Tailwind CSS v4:
- **Root styles**: Main entry points and global styles
- **App styles** (`/app/`): Component and form-specific styles
- **Base styles**: CSS reset and foundational styles
- **Theme styles**: CSS custom properties and theme configuration

## Architecture

### Layer System
```css
@layer theme, base, vendor, components, utilities;
```

1. **theme**: CSS variables and custom properties
2. **base**: Reset and foundational styles
3. **vendor**: Third-party library styles
4. **components**: Reusable component styles
5. **utilities**: Utility classes and helpers

## Main Style Files

### index.css
- **Purpose**: Main entry point importing all styles
- **Imports**:
  - Tailwind directives
  - Base styles
  - Layout styles
  - Color system
  - Component variants
  - App-specific styles

### base.css
- **Purpose**: CSS reset and base element styles
- **Features**:
  - Custom CSS reset
  - Focus styles
  - Scrollbar customization
  - Print styles
  - Smooth scrolling
  - Text selection colors

### colors.css
- **Purpose**: Color system using CSS custom properties
- **Structure**:
```css
:root {
  --color-primary-*: /* Primary color shades */
  --color-secondary-*: /* Secondary color shades */
  --color-gray-*: /* Gray scale */
  /* Additional color scales */
}
```
- **Dark Mode**: Automatic color adjustments

### layouts.css
- **Purpose**: Layout utilities and grid systems
- **Features**:
  - Custom scrollbar styles
  - Container queries
  - Responsive layouts
  - Grid utilities

### variants.css
- **Purpose**: Component variant utilities
- **Features**:
  - Color variants for components
  - State-based styles
  - Dark mode variants

## App-Specific Styles (`/app/`)

### Component Styles (`/app/components/`)

#### avatar.css
- Avatar size variants (xs to xl)
- Initial text styling
- Indicator positioning

#### badge.css
- Badge variants (filled, soft, outlined)
- Size modifiers
- Glow effects

#### button.css
- Button variants (filled, outlined, soft, flat)
- Size classes
- Loading states
- Icon-only styles

#### circlebar.css
- Circular progress animations
- Size variants
- Color theming

#### mask.css
- CSS mask shapes (diamond, heart, hexagon, etc.)
- Size variants

#### pagination.css
- Pagination component styles
- Active/hover states
- Responsive behavior

#### progress.css
- Linear progress bar styles
- Indeterminate animations
- Color variants

#### scrollShadow.css
- Scroll overflow indicators
- Shadow effects

#### skeleton.css
- Loading skeleton animations
- Shimmer effects

#### spinner.css
- Loading spinner animations
- Size variants
- Ghost spinner styles

#### steps.css
- Step indicator styles
- Progress visualization

#### table.css
- Table layout styles
- Responsive tables
- Hover/selected states

#### timeline.css
- Timeline component styles
- Connector lines
- Item states

### Form Styles (`/app/forms/`)

#### checkbox.css
- Custom checkbox styles
- Checked/indeterminate states
- Size variants

#### input.css
- Input field styles
- Focus states
- Error styling
- Input groups

#### radio.css
- Custom radio button styles
- Checked states
- Group layouts

#### range.css
- Range slider styling
- Track and thumb customization
- Progress visualization

#### select.css
- Custom select styles
- Dropdown indicators
- Multi-select support

#### swap.css
- Toggle swap animations
- State transitions

#### switch.css
- Toggle switch styles
- On/off states
- Size variants

### Vendor Styles (`/app/vendors/`)

#### apexchart.css
- ApexCharts customization
- Theme integration
- Responsive charts

#### datepicker.css
- Flatpickr datepicker styles
- Calendar theming
- Dark mode support

#### filepond.css
- FilePond upload styles
- Drag-drop states
- Progress indicators

#### quill.css
- Quill editor theming
- Toolbar customization
- Content styling

#### simplebar.css
- Custom scrollbar styles
- Cross-browser compatibility

#### sonner.css
- Toast notification styles
- Animation customization
- Position variants

## Tailwind Configuration

### Theme Extension
- Custom colors integrated with CSS variables
- Extended spacing and sizing
- Custom animations
- Typography settings

### Custom Utilities
- Directional properties (RTL support - see [[I18N]])
- Custom gradients
- Shadow utilities
- Transform helpers

## Dark Mode

### Implementation
- CSS custom properties switch values
- Automatic color inversion where needed
- Preserved brand colors
- Accessible contrast ratios

### Usage
```css
.dark {
  --color-background: /* dark value */;
  --color-foreground: /* dark value */;
}
```

## Responsive Design

### Breakpoints
- Mobile-first approach
- Standard breakpoints: sm, md, lg, xl, 2xl
- Container queries for component-level responsiveness

### Patterns
- Fluid typography
- Responsive spacing
- Adaptive layouts
- Touch-friendly targets

## Performance Optimization

### CSS Organization
- Layered architecture prevents specificity issues
- Minimal use of !important
- Efficient selector usage
- Tree-shakeable utilities

### Build Optimization
- PurgeCSS for unused styles
- CSS minification
- Critical CSS extraction
- Lazy-loaded vendor styles

## Usage Guidelines

1. **Use Tailwind utilities first**: Only write custom CSS when necessary
2. **Follow layer conventions**: Place styles in appropriate layers
3. **Maintain consistency**: Use design tokens via CSS variables
4. **Consider dark mode**: All custom styles should support theme switching
5. **Mobile-first**: Design for mobile, enhance for desktop
6. **Accessibility**: Ensure sufficient contrast and focus indicators
7. **Component integration**: See [[COMPONENTS]] for component-specific styling
8. **Type safety**: Use [[TYPES]] for style-related types

## Common Patterns

```css
/* Component with variants */
.component {
  @apply base-styles;
  
  &[data-variant="primary"] {
    @apply variant-styles;
  }
}

/* Responsive utilities */
.responsive-text {
  @apply text-sm md:text-base lg:text-lg;
}

/* Dark mode support */
.themed-component {
  color: var(--color-foreground);
  background: var(--color-background);
}
```