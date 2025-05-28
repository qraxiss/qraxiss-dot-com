// Import Dependencies
import { useEffect, useRef, useState } from "react";

// Local Imports
import { TextEditor, TextEditorRef } from "@/components/shared/form/TextEditor";
import invariant from "tiny-invariant";

// ----------------------------------------------------------------------

const Instance = () => {
  const [wordLength, setWordLength] = useState(0);
  const ref = useRef<TextEditorRef>(null);

  useEffect(() => {
    // Taş devri yöntemi: Quill'in yüklenmesini bekle 🦕
    const checkQuill = () => {
      const ql = ref.current?.getQuillInstance();
      
      if (ql) {
        console.log("Quill bulundu!", ql);
        
        const calc = () => {
          const trimmed = ql.getText().trim();
          setWordLength(trimmed.length > 0 ? trimmed.split(/\s+/).length : 0);
        };

        ql.on("text-change", calc);
        calc(); // İlk hesaplama

        return () => {
          ql.off("text-change", calc);
        };
      } else {
        console.log("Quill henüz hazır değil, bekliyoruz...");
        // 100ms sonra tekrar dene
        setTimeout(checkQuill, 100);
      }
    };

    const timeoutId = setTimeout(checkQuill, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="max-w-xl">
      <TextEditor ref={ref} placeholder="Enter your content here..." />
      <p className="mt-1 text-end text-xs">{wordLength} Words</p>
    </div>
  );
};

export { Instance };
