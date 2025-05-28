import { useEffect, useState } from "react";
import { TextEditor } from "@/components/shared/form/TextEditor";
import { universalHtmlToDelta } from "@/utils/quillUtils";
import type { DeltaStatic } from "@/components/shared/form/TextEditor";

const html = `<p>Only <em>italic</em> is allowed. <strong>Bold</strong> is not.</p>`;

const ConvertHtmlToDelta = () => {
  const [delta, setDelta] = useState<DeltaStatic | undefined>(undefined);

  useEffect(() => {
    const convertHtml = async () => {
      try {
        const convertedDelta = await universalHtmlToDelta(html);
        setDelta(convertedDelta as any);
      } catch (error) {
        console.error("Failed to convert HTML to Delta:", error);
      }
    };

    convertHtml();
  }, []);

  return (
    <div className="max-w-xl">
      <TextEditor
        defaultValue={delta}
        placeholder="Enter your content here..."
      />
    </div>
  );
};

export { ConvertHtmlToDelta };
