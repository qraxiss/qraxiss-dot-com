// Import Dependencies
import { useState } from "react";

// Local Imports
import { TextEditor } from "@/components/shared/form/TextEditor";

// ----------------------------------------------------------------------

const createDelta = (): any => {
  if (typeof window === 'undefined') {
    return {}; // Return empty object for SSR
  }
  
  // Try to get Delta from Quill if it's loaded
  try {
    const Quill = require('quill');
    const Delta = Quill.import('delta');
    return new Delta();
  } catch (e) {
    // Quill not loaded yet, return empty object
    return {};
  }
};

const Controlled = () => {
  const defaultValue = createDelta();

  const [content, setContent] = useState(defaultValue);

  return (
    <div className="max-w-xl">
      <TextEditor
        value={content}
        onChange={(val: any) => setContent(val)}
        placeholder="Enter your content here..."
      />
    </div>
  );
};

export { Controlled };
