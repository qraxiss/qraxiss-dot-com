import { useEffect, useState } from "react";
import { TextEditor } from "@/components/shared/form/TextEditor";
import { universalHtmlToDelta } from "@/utils/quillUtils";

const html = `<p>Only <em>italic</em> is allowed. <strong>Bold</strong> is not.</p>`;

const ConvertHtmlToDelta = () => {
  const [delta, setDelta] = useState(null);

  useEffect(() => {
    const convertHtml = async () => {
      try {
        const convertedDelta = await universalHtmlToDelta(html);
        setDelta(convertedDelta);
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
