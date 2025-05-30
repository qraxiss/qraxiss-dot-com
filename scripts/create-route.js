#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const segmentName = process.argv[2];
const routeName = process.argv[3];

if (!segmentName || !routeName) {
  console.error('Error: Please provide both segment name and route name');
  console.error('Usage: yarn create-route <segment-name> <route-name>');
  process.exit(1);
}

// Convert names to various formats
const segmentKebab = segmentName.toLowerCase().replace(/\s+/g, '-');
const segmentCamel = segmentName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

const routeKebab = routeName.toLowerCase().replace(/\s+/g, '-');
const routeCamel = routeName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
const routePascal = routeCamel.charAt(0).toUpperCase() + routeCamel.slice(1);
const routeTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1).replace(/-/g, ' ');

// Define paths
const navigationSegmentPath = path.join(__dirname, '..', 'web', 'app', 'navigation', 'segments', `${segmentKebab}.ts`);
const pageDir = path.join(__dirname, '..', 'web', 'app', 'pages', segmentKebab, routeKebab);
const webControllerPath = path.join(__dirname, '..', 'src', 'web', 'web.controller.ts');
const translationsPath = path.join(__dirname, '..', 'web', 'i18n', 'locales', 'en', 'translations.json');

// Check if segment exists
if (!fs.existsSync(navigationSegmentPath)) {
  console.error(`Error: Segment '${segmentName}' does not exist.`);
  console.error(`Run 'yarn create-segment ${segmentName}' first.`);
  process.exit(1);
}

// Create page content
const pageContent = `import { Page } from "@/components/shared/Page";

export default function ${routePascal}() {
  return (
    <Page title="${routeTitle}">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">${routeTitle}</h1>
        <p>This is the ${routeTitle} page in the ${segmentName} section.</p>
      </div>
    </Page>
  );
}
`;

// Function to update navigation segment file
function updateNavigationSegment() {
  let content = fs.readFileSync(navigationSegmentPath, 'utf8');
  
  // Find the childs array
  const childsRegex = /childs:\s*\[([\s\S]*?)\s*\]/;
  const match = content.match(childsRegex);
  
  if (match) {
    const childsContent = match[1];
    
    // Check if route already exists
    if (childsContent.includes(`"${segmentKebab}.${routeKebab}"`)) {
      console.log(`Route '${routeName}' already exists in ${segmentName} navigation`);
      return false;
    }
    
    // Add new route item
    const newRoute = `    {
      id: "${segmentKebab}.${routeKebab}",
      path: path(ROOT_${segmentKebab.toUpperCase().replace(/-/g, '_')}, "/${routeKebab}"),
      type: "item",
      title: "${routeTitle}",
      transKey: "nav.${segmentKebab}.${routeKebab}",
      icon: "${segmentKebab}.${routeKebab}",
    },`;
    
    // Insert after the last item
    const lastItemRegex = /,(\s*)$/;
    const updatedChilds = childsContent.replace(lastItemRegex, `,\n${newRoute}$1`);
    
    content = content.replace(childsRegex, `childs: [${updatedChilds}  ]`);
    
    fs.writeFileSync(navigationSegmentPath, content);
    console.log(`✓ Updated navigation segment: ${navigationSegmentPath}`);
    return true;
  }
  
  return false;
}

// Function to update WebController
function updateWebController() {
  let content = fs.readFileSync(webControllerPath, 'utf8');
  
  // Check if the route already exists
  if (content.includes(`@Get('${segmentKebab}/${routeKebab}')`)) {
    console.log(`Route '${segmentKebab}/${routeKebab}' already exists in WebController`);
    return;
  }
  
  // Find the segment's catch-all route or the segment's main route
  const segmentCatchAllRegex = new RegExp(`(@Get\\('${segmentKebab}/\\*'\\)\\s*\\n\\s*${segmentCamel}All\\(\\) {[^}]*})`);
  const segmentMainRegex = new RegExp(`(@Get\\('${segmentKebab}'\\)\\s*\\n\\s*${segmentCamel}\\(\\) {[^}]*})`);
  
  let insertPosition = -1;
  let match;
  
  // Try to find catch-all route first
  match = content.match(segmentCatchAllRegex);
  if (match) {
    insertPosition = match.index;
  } else {
    // If no catch-all, find main route
    match = content.match(segmentMainRegex);
    if (match) {
      insertPosition = match.index + match[0].length;
    }
  }
  
  if (insertPosition !== -1) {
    // Get proper indentation
    const lines = content.substring(0, insertPosition).split('\n');
    const indentMatch = lines[lines.length - 1].match(/^(\s*)/);
    const indentation = indentMatch ? indentMatch[1] : '    ';
    
    const newRoute = `\n\n${indentation}@Get('${segmentKebab}/${routeKebab}')\n${indentation}${segmentCamel}${routePascal}() {\n${indentation}    return new Page();\n${indentation}}`;
    
    content = content.slice(0, insertPosition) + newRoute + content.slice(insertPosition);
    
    fs.writeFileSync(webControllerPath, content);
    console.log(`✓ Updated WebController`);
  } else {
    console.error(`Warning: Could not find ${segmentName} routes in WebController`);
    console.error(`You may need to add the route manually`);
  }
}

// Function to update translations
function updateTranslations() {
  let translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
  
  // Add route translation
  if (translations.nav && translations.nav[segmentKebab]) {
    if (!translations.nav[segmentKebab][routeKebab]) {
      translations.nav[segmentKebab][routeKebab] = routeTitle;
      
      fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2));
      console.log(`✓ Updated English translations`);
    } else {
      console.log(`Translation for '${routeKebab}' already exists`);
    }
  } else {
    console.error(`Warning: Segment '${segmentKebab}' not found in translations`);
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
    const iconKey = `"${segmentKebab}.${routeKebab}"`;
    
    // Check if icon already exists
    if (existingIcons.includes(iconKey)) {
      console.log(`Icon for '${segmentKebab}.${routeKebab}' already exists`);
      return;
    }
    
    // Add new icon - using a generic icon (LampIcon) as default
    const newIcon = `  ${iconKey}: LampIcon,`;
    
    // Insert before the last item
    const lines = existingIcons.split('\n');
    const lastNonEmptyIndex = lines.map((line, i) => line.trim() ? i : -1).filter(i => i >= 0).pop();
    
    if (lastNonEmptyIndex !== undefined) {
      lines.splice(lastNonEmptyIndex + 1, 0, newIcon);
      const updatedIcons = lines.join('\n');
      content = content.replace(iconsRegex, `export const navigationIcons: Record<string, ElementType> = {${updatedIcons}};`);
      
      fs.writeFileSync(iconsPath, content);
      console.log(`✓ Updated navigation icons (using default LampIcon)`);
    }
  }
}

// Function to determine router type for the segment
function getRouterType(segmentKebab) {
  // Check which router file contains the segment
  const routerTypes = ['public', 'protected', 'ghost'];
  
  for (const type of routerTypes) {
    const routerPath = path.join(__dirname, '..', 'web', 'app', 'router', `${type}.tsx`);
    if (fs.existsSync(routerPath)) {
      const content = fs.readFileSync(routerPath, 'utf8');
      if (content.includes(`path: "${segmentKebab}"`)) {
        return type;
      }
    }
  }
  
  // Default to protected if not found
  return 'protected';
}

// Function to update router file
function updateRouter() {
  const routerType = getRouterType(segmentKebab);
  const routerPath = path.join(__dirname, '..', 'web', 'app', 'router', `${routerType}.tsx`);
  
  if (!fs.existsSync(routerPath)) {
    console.error(`Warning: Router file '${routerType}.tsx' not found`);
    return;
  }
  
  let content = fs.readFileSync(routerPath, 'utf8');
  
  // For protected routes, we need to handle the leading slash
  const pathPattern = routerType === 'protected' ? `/${segmentKebab}` : segmentKebab;
  
  // Find the segment's route block - more flexible regex
  const segmentBlockRegex = new RegExp(`path:\\s*["']${pathPattern}["'],\\s*children:\\s*\\[([\\s\\S]*?)\\]`, 'g');
  const matches = [...content.matchAll(segmentBlockRegex)];
  
  if (matches.length === 0) {
    console.error(`Warning: Could not find segment '${pathPattern}' in ${routerType} router`);
    console.error(`Make sure the segment exists in the router file first.`);
    return;
  }
  
  // Use the last match (in case there are multiple)
  const match = matches[matches.length - 1];
  const childrenContent = match[1];
  
  // Check if route already exists
  if (childrenContent.includes(`path: "${routeKebab}"`)) {
    console.log(`Route '${routeKebab}' already exists in ${routerType} router`);
    return;
  }
  
  // Determine the correct indentation based on existing content
  const existingLines = childrenContent.split('\n').filter(line => line.trim());
  let baseIndent = '            '; // Default indentation
  if (existingLines.length > 0) {
    const indentMatch = existingLines[0].match(/^(\s*)/);
    if (indentMatch) {
      baseIndent = indentMatch[1];
    }
  }
  
  // Add new route
  const newRoute = `${baseIndent}{
${baseIndent}  path: "${routeKebab}",
${baseIndent}  lazy: async () => ({
${baseIndent}    Component: (await import("@/app/pages/${segmentKebab}/${routeKebab}")).default,
${baseIndent}  }),
${baseIndent}},`;
  
  // Find the last closing brace of a route object within children
  const lines = childrenContent.split('\n');
  let insertIndex = -1;
  
  // Look for the last route's closing brace
  for (let i = lines.length - 1; i >= 0; i--) {
    const trimmedLine = lines[i].trim();
    if (trimmedLine === '},') {
      // Check if this is part of a route object (not the children array closing)
      let openBraces = 0;
      for (let j = i; j >= 0; j--) {
        if (lines[j].includes('{')) openBraces++;
        if (lines[j].includes('}')) openBraces--;
        if (openBraces > 0 && lines[j].includes('path:')) {
          insertIndex = i + 1;
          break;
        }
      }
      if (insertIndex !== -1) break;
    }
  }
  
  // If no suitable position found, add at the end
  if (insertIndex === -1) {
    // Find the position just before the closing bracket
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim() !== '') {
        insertIndex = i + 1;
        break;
      }
    }
  }
  
  lines.splice(insertIndex, 0, newRoute);
  const updatedChildren = lines.join('\n');
  
  // Replace the children content in the original match
  const updatedMatch = match[0].replace(match[1], updatedChildren);
  content = content.substring(0, match.index) + updatedMatch + content.substring(match.index + match[0].length);
  
  fs.writeFileSync(routerPath, content);
  console.log(`✓ Updated ${routerType} router`);
}

// Execute steps
try {
  // 1. Update navigation segment
  if (!updateNavigationSegment()) {
    console.error('Failed to update navigation segment');
    process.exit(1);
  }
  
  // 2. Create page directory and file
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, 'index.tsx'), pageContent);
  console.log(`✓ Created page: ${path.join(pageDir, 'index.tsx')}`);
  
  // 3. Update WebController
  updateWebController();
  
  // 4. Update translations
  updateTranslations();
  
  // 5. Update navigation icons
  updateNavigationIcons();
  
  // 6. Update router
  updateRouter();
  
  console.log(`\n✅ Successfully created route '${routeName}' in segment '${segmentName}'`);
  console.log(`\nNext steps:`);
  console.log(`1. Customize the icon for '${segmentKebab}.${routeKebab}' in navigation/icons.ts (currently using default LampIcon)`);
  console.log(`2. Customize the page at ${path.join(pageDir, 'index.tsx')}`);
  
} catch (error) {
  console.error('Error creating route:', error.message);
  process.exit(1);
}