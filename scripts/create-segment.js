#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const segmentName = process.argv[2];
const routerType = process.argv[3] || 'public'; // default to public

if (!segmentName) {
  console.error('Error: Please provide a segment name');
  console.error('Usage: yarn create-segment <segment-name> [router-type]');
  console.error('Router types: public (default), protected, ghost');
  process.exit(1);
}

// Validate router type
const validRouterTypes = ['public', 'protected', 'ghost'];
if (!validRouterTypes.includes(routerType)) {
  console.error(`Error: Invalid router type '${routerType}'`);
  console.error('Valid router types: public, protected, ghost');
  process.exit(1);
}

// Convert segment name to various formats
const kebabCase = segmentName.toLowerCase().replace(/\s+/g, '-');
const camelCase = segmentName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
const titleCase = segmentName.charAt(0).toUpperCase() + segmentName.slice(1).replace(/-/g, ' ');
const constantCase = kebabCase.toUpperCase().replace(/-/g, '_');

// Define paths
const navigationSegmentsDir = path.join(__dirname, '..', 'web', 'app', 'navigation', 'segments');
const navigationIndexPath = path.join(__dirname, '..', 'web', 'app', 'navigation', 'index.ts');
const baseNavigationPath = path.join(__dirname, '..', 'web', 'app', 'navigation', 'baseNavigation.ts');
const pagesDir = path.join(__dirname, '..', 'web', 'app', 'pages', kebabCase);
const webControllerPath = path.join(__dirname, '..', 'src', 'web', 'web.controller.ts');
const translationsPath = path.join(__dirname, '..', 'web', 'i18n', 'locales', 'en', 'translations.json');
const routerPath = path.join(__dirname, '..', 'web', 'app', 'router', `${routerType}.tsx`);

// Create navigation segment file
const navigationSegmentContent = `import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

const ROOT_${constantCase} = "/${kebabCase}";

const path = (root: string, item: string) => \`\${root}\${item}\`;

export const ${camelCase}: NavigationTree = {
  ...baseNavigationObj["${camelCase}"],
  type: "root",
  childs: [
    {
      id: "${kebabCase}.overview",
      path: path(ROOT_${constantCase}, "/overview"),
      type: "item",
      title: "${titleCase} Overview",
      transKey: "nav.${kebabCase}.overview",
      icon: "${kebabCase}.overview",
    },
  ],
};
`;

// Create pages directory structure
const indexPageContent = `import { Page } from "@/components/shared/Page";

export default function ${pascalCase}Overview() {
  return (
    <Page title="${titleCase} Overview">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">${titleCase}</h1>
        <p>Welcome to the ${titleCase} section.</p>
      </div>
    </Page>
  );
}
`;

// Function to update baseNavigation.ts
function updateBaseNavigation() {
  let content = fs.readFileSync(baseNavigationPath, 'utf8');

  // Add new navigation item to baseNavigationObj
  const navigationObjRegex = /export const baseNavigationObj: Record<string, NavigationTree> = {([\s\S]*?)};/;
  const match = content.match(navigationObjRegex);

  if (match) {
    const existingItems = match[1];
    const newItem = `  ${camelCase}: {
    id: "${kebabCase}",
    type: "item",
    path: "/${kebabCase}",
    title: "${titleCase}",
    transKey: "nav.${kebabCase}.${kebabCase}",
    icon: "${kebabCase}"
  },`;

    // Check if segment already exists
    if (existingItems.includes(`${camelCase}:`)) {
      console.log(`Segment '${segmentName}' already exists in baseNavigation.ts`);
      return;
    }

    // Insert new item before the last item
    const lines = existingItems.split('\n');
    const lastNonEmptyIndex = lines.map((line, i) => line.trim() ? i : -1).filter(i => i >= 0).pop();

    if (lastNonEmptyIndex !== undefined) {
      lines.splice(lastNonEmptyIndex + 1, 0, newItem);
      const updatedItems = lines.join('\n');
      content = content.replace(navigationObjRegex, `export const baseNavigationObj: Record<string, NavigationTree> = {${updatedItems}};`);

      fs.writeFileSync(baseNavigationPath, content);
      console.log(`✓ Updated baseNavigation.ts`);
    }
  }
}

// Function to update navigation index.ts
function updateNavigationIndex() {
  let content = fs.readFileSync(navigationIndexPath, 'utf8');

  // Add import statement
  const importStatement = `import { ${camelCase} } from "./segments/${kebabCase}";`;

  // Find the last import
  const importLines = content.split('\n');
  let lastImportIndex = -1;

  for (let i = 0; i < importLines.length; i++) {
    if (importLines[i].startsWith('import ')) {
      lastImportIndex = i;
    }
  }

  if (lastImportIndex !== -1) {
    importLines.splice(lastImportIndex + 1, 0, importStatement);
    content = importLines.join('\n');
  }

  // Add to navigation array
  const arrayRegex = /export const navigation = \[([\s\S]*?)\];/;
  const arrayMatch = content.match(arrayRegex);

  if (arrayMatch) {
    let arrayContent = arrayMatch[1];

    // Check if segment already exists
    if (arrayContent.includes(`${camelCase},`)) {
      console.log(`Segment '${segmentName}' already exists in navigation index`);
      return;
    }

    // Find the position after prototypes
    const arrayLines = arrayContent.split('\n');
    let insertIndex = -1;

    for (let i = 0; i < arrayLines.length; i++) {
      if (arrayLines[i].includes('prototypes,')) {
        insertIndex = i + 1;
        break;
      }
    }

    if (insertIndex !== -1) {
      arrayLines.splice(insertIndex, 0, `  ${camelCase},`);
    } else {
      // Add before docs if prototypes not found
      for (let i = 0; i < arrayLines.length; i++) {
        if (arrayLines[i].includes('docs,')) {
          insertIndex = i;
          break;
        }
      }

      if (insertIndex !== -1) {
        arrayLines.splice(insertIndex, 0, `  ${camelCase},`);
      } else {
        // Add at the end
        const lastNonEmptyIndex = arrayLines.map((line, i) => line.trim() ? i : -1).filter(i => i >= 0).pop();
        if (lastNonEmptyIndex !== undefined) {
          arrayLines.splice(lastNonEmptyIndex + 1, 0, `  ${camelCase},`);
        }
      }
    }

    content = content.replace(arrayRegex, `export const navigation = [${arrayLines.join('\n')}];`);
  }

  fs.writeFileSync(navigationIndexPath, content);
  console.log(`✓ Updated navigation index.ts`);
}

// Function to update WebController
function updateWebController() {
  let content = fs.readFileSync(webControllerPath, 'utf8');

  // Find the catch-all route
  const catchAllIndex = content.indexOf('@Get(\'*\')');

  if (catchAllIndex !== -1) {
    // Find the start of the line for proper indentation
    const lines = content.substring(0, catchAllIndex).split('\n');
    const lastLine = lines[lines.length - 1];
    const indentation = lastLine.match(/^\s*/)[0];

    const newRoutes = `${indentation}// ${titleCase} routes\n${indentation}@Get('${kebabCase}')\n${indentation}${camelCase}() {\n${indentation}    return new Page();\n${indentation}}\n\n${indentation}@Get('${kebabCase}/*')\n${indentation}${camelCase}All() {\n${indentation}    return new Page();\n${indentation}}\n\n`;

    // Check if route already exists
    if (content.includes(`@Get('${kebabCase}')`)) {
      console.log(`Route '${kebabCase}' already exists in WebController`);
      return;
    }

    // Insert before the catch-all route
    content = content.substring(0, catchAllIndex) + newRoutes + content.substring(catchAllIndex);

    fs.writeFileSync(webControllerPath, content);
    console.log(`✓ Updated WebController`);
  } else {
    console.error('Warning: Could not find catch-all route in WebController');
  }
}

// Function to update translations
function updateTranslations() {
  let translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

  // Add navigation translations
  if (!translations.nav) {
    translations.nav = {};
  }

  if (!translations.nav[kebabCase]) {
    translations.nav[kebabCase] = {
      [kebabCase]: titleCase,
      "overview": `${titleCase} Overview`
    };

    fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2));
    console.log(`✓ Updated English translations`);
  } else {
    console.log(`Translations for '${kebabCase}' already exist`);
  }
}

// Function to update navigation icons
function updateNavigationIcons() {
  const iconsPath = path.join(__dirname, '..', 'web', 'app', 'navigation', 'icons.ts');
  let content = fs.readFileSync(iconsPath, 'utf8');

  // Find the navigationIcons object
  const iconsRegex = /export const navigationIcons: Record<string, ElementType> = {([\s\S]*?)};/;
  const match = content.match(iconsRegex);

  if (match) {
    const existingIcons = match[1];

    // Check if icons already exist
    if (existingIcons.includes(`${kebabCase}:`)) {
      console.log(`Icons for '${kebabCase}' already exist`);
      return;
    }

    // Add new icons - using a generic icon (LampIcon) as default
    const newIcons = `  ${kebabCase}: LampIcon,\n  "${kebabCase}.overview": LampIcon,`;

    // Insert before the last item
    const lines = existingIcons.split('\n');
    const lastNonEmptyIndex = lines.map((line, i) => line.trim() ? i : -1).filter(i => i >= 0).pop();

    if (lastNonEmptyIndex !== undefined) {
      lines.splice(lastNonEmptyIndex + 1, 0, newIcons);
      const updatedIcons = lines.join('\n');
      content = content.replace(iconsRegex, `export const navigationIcons: Record<string, ElementType> = {${updatedIcons}};`);

      fs.writeFileSync(iconsPath, content);
      console.log(`✓ Updated navigation icons (using default LampIcon)`);
    }
  }
}

// Function to update router file
function updateRouter() {
  let content = fs.readFileSync(routerPath, 'utf8');

  // Different patterns based on router type
  if (routerType === 'public') {
    // For public routes, add directly to children array
    const childrenRegex = /const publicRoutes: RouteObject = {\s*id: "public",\s*children: \[([\s\S]*?)\s*\],/;
    const match = content.match(childrenRegex);

    if (match) {
      const childrenContent = match[1];

      // Check if route already exists
      if (childrenContent.includes(`path: "${kebabCase}"`)) {
        console.log(`Route '${kebabCase}' already exists in ${routerType} router`);
        return;
      }

      // Add new route with Navigate for index
      const newRoute = `    {
      path: "${kebabCase}",
      children: [
        {
          index: true,
          element: <Navigate to="/${kebabCase}/overview" />,
        },
        {
          path: "overview",
          lazy: async () => ({
            Component: (await import("@/app/pages/${kebabCase}")).default,
          }),
        },
      ],
    },`;

      // Import Navigate if not already imported
      if (!content.includes('import { Navigate')) {
        if (content.includes('import {') && content.includes('} from "react-router"')) {
          // Add Navigate to existing import
          content = content.replace(/import\s*{\s*([^}]+)\s*}\s*from\s*"react-router"/, 'import { $1, Navigate } from "react-router"');
        } else {
          // Add new import at the top
          const firstImportIndex = content.indexOf('import');
          content = content.substring(0, firstImportIndex) + 'import { Navigate } from "react-router";\n' + content.substring(firstImportIndex);
        }
      }

      // Find a good place to insert (after last closing brace of a route)
      const updatedContent = childrenContent + '\n' + newRoute;
      content = content.replace(childrenRegex, `const publicRoutes: RouteObject = {\n  id: "public",\n  children: [${updatedContent}\n  ],`);

      fs.writeFileSync(routerPath, content);
      console.log(`✓ Updated ${routerType} router`);
    }
  } else if (routerType === 'protected') {
    // For protected routes, find DynamicLayout children
    const layoutRegex = /Component: DynamicLayout,\s*children: \[([\s\S]*?)\s*\],\s*\},\s*\/\/ The app layout/;
    const match = content.match(layoutRegex);

    if (match) {
      const childrenContent = match[1];

      // Check if route already exists
      if (childrenContent.includes(`path: "/${kebabCase}"`)) {
        console.log(`Route '/${kebabCase}' already exists in ${routerType} router`);
        return;
      }

      // Add new route with Navigate for index
      const newRoute = `{
          path: "/${kebabCase}",
          children: [
            {
              index: true,
              element: <Navigate to="/${kebabCase}/overview" />,
            },
            {
              path: "overview",
              lazy: async () => ({
                Component: (await import("@/app/pages/${kebabCase}")).default,
              }),
            },
          ],
        }`;

      // Import Navigate if not already imported
      if (!content.includes('import { Navigate')) {
        if (content.includes('import {') && content.includes('} from "react-router"')) {
          // Add Navigate to existing import
          content = content.replace(/import\s*{\s*([^}]+)\s*}\s*from\s*"react-router"/, 'import { $1, Navigate } from "react-router"');
        } else {
          // Add new import
          const lastImportIndex = content.lastIndexOf('import');
          const endOfLastImport = content.indexOf('\n', lastImportIndex);
          content = content.substring(0, endOfLastImport + 1) + 'import { Navigate } from "react-router";\n' + content.substring(endOfLastImport + 1);
        }
      }

      // Find the correct position - at the end of DynamicLayout children array
      const childrenLines = childrenContent.trim().split('\n');
      let insertPosition = childrenLines.length - 1;

      // Find the last closing brace that belongs to a route object
      for (let i = childrenLines.length - 1; i >= 0; i--) {
        const line = childrenLines[i].trim();
        if (line === '},') {
          // This is likely the end of the last route
          insertPosition = i + 1;
          break;
        }
      }

      // Insert the new route
      childrenLines.splice(insertPosition, 0, '        ' + newRoute.split('\n').join('\n        ') + ',');

      const updatedContent = '\n' + childrenLines.join('\n') + '\n      ';
      content = content.replace(layoutRegex, `Component: DynamicLayout,\n      children: [${updatedContent}],\n    },\n    // The app layout`);

      fs.writeFileSync(routerPath, content);
      console.log(`✓ Updated ${routerType} router`);
    }
  } else if (routerType === 'ghost') {
    // For ghost routes, add to children array
    const childrenRegex = /Component: GhostGuard,\s*children: \[([\s\S]*?)\s*\],/;
    const match = content.match(childrenRegex);

    if (match) {
      const childrenContent = match[1];

      // Check if route already exists
      if (childrenContent.includes(`path: "${kebabCase}"`)) {
        console.log(`Route '${kebabCase}' already exists in ${routerType} router`);
        return;
      }

      // Add new route (ghost routes usually don't need index redirect)
      const newRoute = `    {
      path: "${kebabCase}",
      lazy: async () => ({
        Component: (await import("@/app/pages/${kebabCase}")).default,
      }),
    },`;

      // Insert before the comment
      const updatedContent = childrenContent.replace(/(\s*)\/\/ Add additional ghost routes/, `${newRoute}\n$1// Add additional ghost routes`);
      content = content.replace(childrenRegex, `Component: GhostGuard,\n  children: [${updatedContent}\n  ],`);

      fs.writeFileSync(routerPath, content);
      console.log(`✓ Updated ${routerType} router`);
    }
  }
}

// Execute steps
try {
  // 1. Create navigation segment file
  const segmentFilePath = path.join(navigationSegmentsDir, `${kebabCase}.ts`);
  fs.writeFileSync(segmentFilePath, navigationSegmentContent);
  console.log(`✓ Created navigation segment: ${segmentFilePath}`);

  // 2. Create pages directory and index file
  fs.mkdirSync(pagesDir, { recursive: true });
  fs.writeFileSync(path.join(pagesDir, 'index.tsx'), indexPageContent);
  console.log(`✓ Created page: ${path.join(pagesDir, 'index.tsx')}`);

  // 3. Update baseNavigation.ts
  updateBaseNavigation();

  // 4. Update navigation index.ts
  updateNavigationIndex();

  // 5. Update WebController
  updateWebController();

  // 6. Update translations
  updateTranslations();

  // 7. Update navigation icons
  updateNavigationIcons();

  // 8. Update router
  updateRouter();

  console.log(`\n✅ Successfully created segment '${segmentName}' with '${routerType}' router type`);
  console.log(`\nNext steps:`);
  console.log(`1. Customize the icon for '${kebabCase}' in navigation/icons.ts (currently using default LampIcon)`);
  console.log(`2. Run 'yarn create-route ${kebabCase} <route-name>' to add routes to this segment`);

} catch (error) {
  console.error('Error creating segment:', error.message);
  process.exit(1);
}