// Import Dependencies
import MagicUrl from "quill-magic-url";

// Local Imports
import { TextEditor, Quill } from "@/components/shared/form/TextEditor";

// ----------------------------------------------------------------------


const ExternalModule = () => {
  Quill.register("modules/magicUrl", MagicUrl);

  return (
    <div className="max-w-xl">
      <TextEditor
        placeholder="Enter your content here..."
        modules={{ magicUrl: true }}
      />
    </div>
  );
};

export { ExternalModule };
