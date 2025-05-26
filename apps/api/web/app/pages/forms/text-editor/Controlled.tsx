// Import Dependencies
import { useState } from "react";

// Local Imports
import { Delta, TextEditor } from "@/components/shared/form/TextEditor";

// ----------------------------------------------------------------------


const Controlled = () => {
  const defaultValue = new Delta();

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
