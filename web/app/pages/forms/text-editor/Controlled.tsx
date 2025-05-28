// Import Dependencies
import { useState } from "react";

// Local Imports
import { TextEditor, type DeltaStatic } from "@/components/shared/form/TextEditor";

// ----------------------------------------------------------------------

const createDelta = (): DeltaStatic => {
  // Return a valid Delta-like object
  return { ops: [] };
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
