// Import Dependencies
import { useState, useRef } from "react";

// Local Imports
import { TextEditor, type TextEditorRef } from "@/components/shared/form/TextEditor";

// ----------------------------------------------------------------------

const InstanceOnReady = () => {
  const [wordLength, setWordLength] = useState(0);
  const ref = useRef<TextEditorRef>(null);

  const handleReady = (quill: any) => {
    console.log("Quill ready! 🚀", quill);
    
    const calc = () => {
      const trimmed = quill.getText().trim();
      setWordLength(trimmed.length > 0 ? trimmed.split(/\s+/).length : 0);
    };

    // Initial calculation
    calc();

    // Listen for changes
    quill.on("text-change", calc);
    
    // Cleanup will be handled by TextEditor component
  };

  return (
    <div className="max-w-xl">
      <div className="mb-4 text-sm text-gray-600">
        Word count: <span className="font-semibold">{wordLength}</span>
      </div>
      
      <TextEditor
        ref={ref}
        placeholder="Start typing to see word count..."
        onReady={handleReady}
      />
    </div>
  );
};

export { InstanceOnReady };