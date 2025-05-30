# Web Pages Reference Guide

This document provides a comprehensive reference for all pages in the `web/app/pages` directory. It's designed as a quick lookup guide to help manage context efficiently.

## Related Documentation
- [[COMPONENTS]] - UI components used in pages
- [[HOOKS]] - Custom hooks used by pages
- [[STATE]] - State management patterns
- [[I18N]] - Internationalization in pages
- [[SSR]] - Server-side rendering for pages
- [[TYPES]] - TypeScript types for pages
- [[PAGE_GENERATION]] - Automated page generation workflow

## Apps Pages (`/app/pages/apps/`)

### AI Chat
- **Location**: `/apps/ai-chat/`
- **Key Features**: AI-powered chat interface with conversation history
- **Components**: ChatProvider context, Header, Footer, Conversation panel
- **Data**: Chat context manages AI conversation state

### Chat
- **Location**: `/apps/chat/`
- **Key Features**: Real-time messaging application
- **Components**: ChatProvider, Sidebar panel, Messages display, ProfileInfo
- **Data**: Chat context for conversations and messages

### Kanban Board
- **Location**: `/apps/kanban/`
- **Key Features**: Drag-and-drop task management board
- **Components**: BoardProvider context, Board columns, Task modals
- **Data**: Board context with task and column state
- **Utils**: Drag-and-drop utilities

### Mail
- **Location**: `/apps/mail/`
- **Key Features**: Email client interface
- **Components**: Mail layout, Sidebar, Content viewer
- **Data**: Local mail data structure

### Todo
- **Location**: `/apps/todo/`
- **Key Features**: Task list management with filtering
- **Components**: TodoProvider context, Header, Todos list, Sidebar
- **Data**: Todo context with task state and filters

### File Manager
- **Location**: `/apps/filemanager/`
- **Key Features**: File browsing and management
- **Components**: Header, Tags, Sidebar, Folders table
- **Data**: File system structure data

### NFT Apps
- **NFT v1** (`/apps/nft-1/`): Marketplace with Balance, TopArtists, NFT Table
- **NFT v2** (`/apps/nft-2/`): Alternative layout with CreditCard, History

### POS System
- **Location**: `/apps/pos/`
- **Key Features**: Point of sale interface
- **Components**: Categories, Basket, Sidebar panel
- **Data**: Product and transaction data

### Travel
- **Location**: `/apps/travel/`
- **Key Features**: Travel booking interface
- **Components**: Calendar, TopHotels
- **Data**: Travel booking data

### List
- **Location**: `/apps/list/`
- **Key Features**: Generic list display
- **Components**: Basic list layout

## Dashboard Pages (`/app/pages/dashboards/`)

### Main Dashboards

#### Sales
- **Location**: `/dashboards/sales/`
- **Key Features**: Sales analytics dashboard
- **Components**: Statistics, ProductsTable, TopSellers, CurrentBalance, TeamActivity, Transactions
- **Data**: Sales metrics and analytics

#### CRM Analytics
- **Location**: `/dashboards/crm-analytics/`
- **Key Features**: Customer relationship metrics
- **Components**: CustomerSatisfaction, Statistics, UsersActivity
- **Data**: CRM analytics data

#### Orders
- **Location**: `/dashboards/orders/`
- **Key Features**: Order management dashboard
- **Components**: Budget, Expense, Income, Overview, SocialTraffic, TopCountries
- **Data**: Order analytics

### Specialized Dashboards

#### Crypto (v1 & v2)
- **Locations**: `/dashboards/crypto/crypto-1/`, `/crypto-2/`
- **Key Features**: Cryptocurrency trading dashboards
- **Components**: Balance, Exchange, Transactions, Wallets, Mining, Candlestick

#### Banking (v1 & v2)
- **Locations**: `/dashboards/banking/banking-1/`, `/banking-2/`
- **Key Features**: Banking interfaces
- **Components**: History, SendFlow, Statistics, Transactions

#### Personal
- **Location**: `/dashboards/personal/`
- **Key Features**: Personal dashboard
- **Components**: Calendar, ClientMessages, ContactList, Income, RecentPayments

#### CMS Analytics
- **Location**: `/dashboards/cms-analytics/`
- **Key Features**: Content management analytics
- **Components**: CMS metrics displays

#### Influencer
- **Location**: `/dashboards/influencer/`
- **Key Features**: Social media metrics
- **Components**: Activity, Performers, Statistics

#### Education/Teacher
- **Teacher** (`/dashboards/teacher/`): Calendar, Welcome, WorkingHours
- **Education** (`/dashboards/education/`): Statistics, Timeline

#### Healthcare
- **Doctor** (`/dashboards/doctor/`): AppointmentsRequests, Calendar, NextPatient, PatientsChart

#### Business
- **Authors** (`/dashboards/authors/`): Header, Members, Statistic, Visitors
- **Employees** (`/dashboards/employees/`): EmployeeCard/List, ClientGrowth, SalesGrowth
- **Workspaces** (`/dashboards/workspaces/`): ServerCard/List, CPU/Memory/Storage metrics
- **Meetings** (`/dashboards/meetings/`): MeetingCard management
- **Projects Board** (`/dashboards/projects-board/`): Project management board

#### Widget Dashboards
- **Widget UI** (`/dashboards/widget-ui/`): UI widget showcase
- **Widget Contact** (`/dashboards/widget-contact/`): Contact management widgets

## Component Demo Pages (`/app/pages/components/`)

### Basic UI
- **Avatar** (`/basic-ui/avatar/`): Avatar variations and states
- **Button** (`/basic-ui/button/`): Button styles and states
- **Badge** (`/basic-ui/badge/`): Badge variations
- **Tag** (`/basic-ui/tag/`): Tag components
- **Divider** (`/basic-ui/divider/`): Divider types
- **Typography** (`/basic-ui/typography/`): Text styles

### Data Display
- **Box** (`/data-display/box/`): Container examples
- **Popover** (`/data-display/popover/`): Popover demos
- **Timeline** (`/data-display/timeline/`): Timeline variations
- **Collapse** (`/data-display/collapse/`): Collapsible content
- **Legend** (`/data-display/legend/`): Legend styles
- **Mask** (`/data-display/mask/`): Shape masks
- **Contextual Help** (`/data-display/contextual-help/`): Help tooltips

### Navigation
- **Accordion** (`/navigation/accordion/`): Accordion examples
- **Tab** (`/navigation/tab/`): Tab variations
- **Dropdown** (`/navigation/dropdown/`): Dropdown menus
- **Steps** (`/navigation/steps/`): Step indicators
- **Pagination** (`/navigation/pagination/`): Pagination controls
- **Menu List** (`/navigation/menu-list/`): Menu examples
- **Treeview** (`/navigation/treeview/`): Tree navigation

### Loading States
- **Progress** (`/loading/progress/`): Progress bars
- **Circlebar** (`/loading/circlebar/`): Circular progress
- **Skeleton** (`/loading/skeleton/`): Skeleton loaders
- **Spinner** (`/loading/spinner/`): Loading spinners

### Feedback
- **Tooltip** (`/feedback/tooltip/`): Tooltip variations
- **Notification** (`/feedback/notification/`): Toast notifications
- **Alert** (`/feedback/alert/`): Alert messages

### Modals
- **Modal** (`/modal/modal/`): Modal dialogs
- **Drawer** (`/modal/drawer/`): Slide-out drawers

### Advanced
- **Scroll Shadow** (`/advanced/scroll-shadow/`): Scroll indicators
- **Charts** (`/advanced/charts/`): ApexCharts demos (Area, Bar, Bubble, etc.)
- **Carousel** (`/advanced/carousel/`): Swiper carousel variations

## Form Pages (`/app/pages/forms/`)

### Complex Forms
- **eKYC Form** (`/forms/ekyc-form/`): Multi-step KYC with validation
- **Add Product Form** (`/forms/add-product-form/`): Product creation wizard
- **New Post Form** (`/forms/new-post-form/`): Blog post editor

### Form Controls
- **Input** (`/forms/input/`): Text input variations
- **Input Group** (`/forms/input-group/`): Input with addons
- **Input Mask** (`/forms/input-mask/`): Masked inputs
- **Checkbox** (`/forms/checkbox/`): Checkbox styles
- **Radio** (`/forms/radio/`): Radio groups
- **Switch** (`/forms/switch/`): Toggle switches
- **Swap** (`/forms/swap/`): Swap controls
- **Textarea** (`/forms/textarea/`): Text areas
- **Select** (`/forms/select/`): Dropdown selects
- **Range** (`/forms/range/`): Range sliders
- **Listbox** (`/forms/listbox/`): List selection
- **Autocomplete** (`/forms/autocomplete/`): Autocomplete inputs
- **File Upload** (`/forms/file-upload/`): File upload controls
- **Form Validation** (`/forms/form-validation/`): Validation examples
- **Text Editor** (`/forms/text-editor/`): Rich text editor (Quill)
- **Filepond** (`/forms/filepond/`): Advanced file upload
- **Datepicker** (`/forms/datepicker/`): Date/time pickers (Flatpickr)

## Table Pages (`/app/pages/tables/`)

### Data Tables
- **Orders Datatable 1** (`/tables/orders-datatable-1/`): Order management
- **Orders Datatable 2** (`/tables/orders-datatable-2/`): Alternative order view
- **Courses Datatable** (`/tables/courses-datatable/`): Course management
- **Users Datatable** (`/tables/users-datatable/`): User management
- **Projects Datatable** (`/tables/projects-datatable/`): Project tracking

### Table Types
- **Basic Table** (`/tables/basic-table/`): Simple HTML tables
- **React Table** (`/tables/react-table/`): TanStack Table implementation
- **Advanced Tables** (`/tables/advanced-tables/`): Complex features

## Prototype Pages (`/app/pages/prototypes/`)

### Onboarding
- **Onboarding 1-2** (`/onboarding/onboarding-1/`, `/onboarding-2/`): User flows

### User Lists
- **Users Card 1-7** (`/users-card/users-card-1/` through `-7/`): Card layouts

### Blog Lists
- **Blog Card 1-8** (`/blog-card/blog-card-1/` through `-8/`): Post cards
- **Post Details** (`/post-details/`): Blog detail page

### Commerce
- **Price List 1-4** (`/price-list/price-list-1/` through `-4/`): Pricing tables
- **Invoice 1-2** (`/invoice/invoice-1/`, `/invoice-2/`): Invoice templates

### Help
- **Help 1-3** (`/help/help-1/` through `-3/`): Help center layouts

### Authentication
- **Sign In 1-2** (`/sign-in/sign-in-1/`, `/sign-in-2/`): Login pages
- **Sign Up 1-2** (`/sign-up/sign-up-1/`, `/sign-up-2/`): Registration

### Error Pages
- **404 Pages** (4 variations): Not found pages
- **401 Page**: Unauthorized
- **429 Page**: Too many requests
- **500 Page**: Server error

## Other Pages

### Authentication
- **Auth** (`/Auth/`): Main login page with JWT auth
  - Uses React Hook Form + Yup validation
  - Integrates with Redux auth state

### Errors
- **Error Pages** (`/errors/`): 401, 404, 429, 500
- **RootErrorBoundary**: Global error handling

### Home
- **Jobs** (`/home/jobs/`): Job listing with onboarding

### Logs
- **Logs** (`/logs/logs/`): Application logs viewer
- **Errors** (`/logs/errors/`): Error logs display

### Settings
- **Settings** (`/settings/`): User settings with sections:
  - General settings
  - Appearance
  - Applications
  - Billing (with invoice table)
  - Notifications
  - Sessions

### Documentation
- **Getting Started** (`/docs/getting-started/`): Setup guides
- **Hooks** (`/docs/hooks/`): Custom hooks docs
- **Shared Components** (`/docs/shared-components/`): Component docs
- **Utils** (`/docs/utils/`): Utility functions
- **Attributions** (`/docs/attributions/`): Credits
- **Changelogs** (`/docs/changelogs/`): Version history

## Common Patterns

1. **State Management**: Redux Toolkit with RTK Query (see [[STATE]])
2. **Authentication**: JWT with auth guards
3. **Forms**: React Hook Form + Yup validation (see [[HOOKS]] for form hooks)
4. **Tables**: TanStack Table (React Table v8)
5. **Charts**: ApexCharts integration (see [[HOOKS]] for useApexCharts)
6. **Contexts**: Feature-specific providers
7. **Routing**: React Router v7 with protected routes
8. **i18n**: Multi-language support (see [[I18N]])
9. **SSR**: Server-side rendering support (see [[SSR]])

## Usage Tips

- Most pages use feature-specific contexts for state (see [[STATE]])
- Forms integrate with React Hook Form (see [[HOOKS]] for form utilities)
- Tables use TanStack Table with custom filters (see [[COMPONENTS]] for table components)
- Dashboard pages often combine multiple chart types
- App pages typically include sidebar navigation
- Prototype pages showcase different layouts
- All pages support dark mode via theme context (see [[STYLES]] for theming)
- Use [[UTILS]] for page-related utility functions
- Follow [[TYPES]] for proper TypeScript usage