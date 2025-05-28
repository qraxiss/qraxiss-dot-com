// Import Dependencies
import { useEffect, useState } from "react";

// Local Imports
import { TextEditor } from "@/components/shared/form/TextEditor";

// ----------------------------------------------------------------------

const ExternalModule = () => {
  const [isModuleRegistered, setIsModuleRegistered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only import and register the module on client side
    if (!isClient) return;

    const registerMagicUrl = async () => {
      try {
        const [QuillModule, MagicUrl] = await Promise.all([
          import("quill"),
          import("quill-magic-url")
        ]);

        const Quill = QuillModule.default;
        const MagicUrlModule = MagicUrl.default;

        // Register the magic URL module
        Quill.register("modules/magicUrl", MagicUrlModule);
        setIsModuleRegistered(true);
      } catch (error) {
        console.error("Failed to load quill-magic-url:", error);
      }
    };

    registerMagicUrl();
  }, [isClient]);

  // Show a placeholder during SSR
  if (!isClient) {
    return (
      <div className="max-w-xl">
        <div className="border border-gray-300 rounded-md min-h-[200px] bg-gray-50 animate-pulse">
          <div className="h-10 bg-white border-b border-gray-200 rounded-t-md"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <TextEditor
        placeholder="Enter your content here..."
        modules={isModuleRegistered ? { magicUrl: true } : {}}
      />
    </div>
  );
};

export { ExternalModule };
