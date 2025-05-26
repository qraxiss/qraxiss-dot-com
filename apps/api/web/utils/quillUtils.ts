// quillUtils.ts
// Quill Delta type definitions
interface DeltaInsert {
  insert: string | Record<string, any>;
  attributes?: Record<string, any>;
}

interface Delta {
  ops: DeltaInsert[];
}

/**
 * Converts an HTML string to a Quill Delta object.
 * This function only works in browser environment.
 *
 * @param html The HTML string to convert.
 * @returns The Quill Delta representation of the HTML.
 * @throws If the input HTML is not a string or if running in SSR.
 */
export async function htmlToDelta(html: string): Promise<Delta> {
  if (typeof html !== "string") {
    throw new TypeError("The input HTML must be a string.");
  }

  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('htmlToDelta can only be used in browser environment');
  }

  // Dynamic import to avoid SSR issues
  const { default: Quill } = await import('quill');

  // Create a temporary container
  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "absolute",
    visibility: "hidden",
    height: "0",
  });
  document.body.appendChild(container);

  let delta: Delta;
  try {
    // Initialize Quill instance
    const quill = new Quill(container, {
      theme: "bubble",
      modules: {
        clipboard: {
          matchVisual: false,
        },
      },
    });

    // Convert HTML to Delta
    quill.clipboard.dangerouslyPasteHTML(html);
    delta = quill.getContents() as Delta;
  } finally {
    // Ensure cleanup
    container.remove();
  }

  return delta;
}

/**
 * Browser-safe wrapper for htmlToDelta that returns null during SSR
 */
export async function safeHtmlToDelta(html: string): Promise<Delta | null> {
  try {
    return await htmlToDelta(html);
  } catch (error) {
    console.warn('htmlToDelta failed (likely SSR):', error);
    return null;
  }
}

/**
 * Checks if a Quill Delta object is not empty.
 *
 * @param delta The Delta object to check.
 * @returns Returns `true` if the Delta is not empty, otherwise `false`.
 */
export function isDeltaNotEmpty(delta: any): boolean {
  if (!delta || !Array.isArray(delta.ops)) {
    return false;
  }

  return delta.ops.some((op: any) => {
    if (typeof op.insert === "string") {
      return op.insert.trim() !== "";
    }
    return typeof op.insert === "object" && op.insert !== null;
  });
}

/**
 * Server-side HTML to Delta converter using basic parsing
 * This is a simplified version that works without Quill
 */
export function htmlToDeltaSSR(html: string): Delta {
  if (typeof html !== "string") {
    throw new TypeError("The input HTML must be a string.");
  }

  // Basic HTML to Delta conversion without Quill
  // This is a simplified implementation
  const ops: DeltaInsert[] = [];

  // Remove HTML tags and get plain text for basic conversion
  const textContent = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (textContent) {
    ops.push({ insert: textContent });
  }

  // Add final newline
  ops.push({ insert: '\n' });

  return { ops };
}

/**
 * Universal HTML to Delta converter that works in both SSR and browser
 */
export async function universalHtmlToDelta(html: string): Promise<Delta> {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Browser environment - use full Quill functionality
    return await htmlToDelta(html);
  } else {
    // SSR environment - use simplified conversion
    return htmlToDeltaSSR(html);
  }
}