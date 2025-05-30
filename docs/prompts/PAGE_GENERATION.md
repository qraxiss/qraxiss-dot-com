# Page Generation Prompt

## Context

You are working with a NestJS backend and React frontend. The system has scripts to automatically generate pages and routes within segments. Pages use TypeScript and React components with Tailwind CSS for styling.

## Related Documentation
- [[PAGES]] - How pages are structured and organized
- [[COMPONENTS]] - Components used in pages
- [[SSR]] - Server-side rendering for pages
- [[I18N]] - Internationalization setup for pages
- [[TYPES]] - TypeScript types for pages
- [[AFTER]] - Post-generation workflow

## Task

When the user says "create a page" or "add a page", automatically follow these steps:

### Automatic Workflow

1. **Parse the Request**
   - Extract segment name and page name from the request
   - If not provided, ask the user for:
     - Which segment? (e.g., dashboards, apps, components)
     - What is the page name? (e.g., analytics, chat, accordion)

2. **Check Segment Existence**

   ```bash
   ls web/app/navigation/segments/
   ```

   - If segment doesn't exist, ask if they want to create it first

3. **Generate the Page**

   ```bash
   yarn create-route <segment-name> <page-name>
   ```

4. **Verify Changes**

   ```bash
   git status
   git diff
   ```

### What the Script Does

The `create-route` script automatically:

1. **Updates Navigation Segment** - `web/app/navigation/segments/[segment].ts`
   - Adds new route item to the childs array
   - Sets up navigation properties (id, path, title, transKey, icon)

2. **Creates Page Component** - `web/app/pages/[segment]/[page]/index.tsx`
   - Basic React component with Page wrapper
   - Includes title and basic structure

3. **Updates WebController** - `src/web/web.controller.ts`
   - Adds new route handler
   - Follows NestJS controller pattern

4. **Updates Translations** - `web/i18n/locales/en/translations.json`
   - Adds navigation translation key

5. **Updates Navigation Icons** - `web/app/navigation/icons.ts`
   - Adds icon mapping (defaults to LampIcon)

6. **Updates Router** - `web/app/router/[type].tsx`
   - Adds lazy-loaded route
   - Determines router type (public, protected, ghost) based on segment

## Example Implementation

Given: "Create a user-profile page in the settings segment"

You would:

1. Run the generation command:

```bash
yarn create-route settings user-profile
```

2. The script creates:

`web/app/pages/settings/user-profile/index.tsx`:

```typescript
import { Page } from "@/components/shared/Page";

export default function UserProfile() {
  return (
    <Page title="User Profile">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <p>This is the User Profile page in the settings section.</p>
      </div>
    </Page>
  );
}
```

3. Updates navigation segment to include:

```typescript
{
  id: "settings.user-profile",
  path: path(ROOT_SETTINGS, "/user-profile"),
  type: "item",
  title: "User Profile",
  transKey: "nav.settings.user-profile",
  icon: "settings.user-profile",
}
```

## Creating New Segments

If the user wants to create a page in a non-existent segment:

1. **Create the Segment First**

   ```bash
   yarn create-segment <segment-name> [router-type]
   ```

   - Router types: public (default), protected, ghost

2. **Then Create the Page**

   ```bash
   yarn create-route <segment-name> <page-name>
   ```

## Important Notes

- Segment names should be kebab-case (e.g., `user-management`)
- Page names should be kebab-case (e.g., `user-profile`)
- The script handles all naming conversions (camelCase, PascalCase, etc.)
- Default icon is LampIcon - suggest updating it after creation
- Pages are lazy-loaded for performance
- All pages use the `Page` component wrapper for consistent layout (see [[COMPONENTS]])
- Pages support SSR by default (see [[SSR]])
- Apply [[AFTER]] workflow after generation

## Usage Examples

User can say:

- "Create a analytics page in dashboards"
- "Add a new page called user-list in the user-management segment"
- "I need a settings page for notifications"
- "Create a new segment called reports and add a monthly-report page"

You will automatically:

1. Identify the segment and page names
2. Check if segment exists
3. Run the appropriate generation commands
4. Show what was created
5. Suggest next steps (customize icon, enhance the page component)

## Post-Generation Steps

After generating, remind the user to:

1. Customize the icon in `web/app/navigation/icons.ts`
2. Implement the actual page functionality (see [[PAGES]] for examples)
3. Add any required API integrations (see [[STATE]] and [[API_GENERATION]])
4. Update styling and layout as needed (see [[STYLES]])
5. Add i18n translations if needed (see [[I18N]])
