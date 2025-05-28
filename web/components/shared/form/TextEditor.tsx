// TextEditorImproved.tsx
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  ReactNode,
  useState,
} from "react";
import clsx from "clsx";
// Define DeltaStatic interface for SSR compatibility
export interface DeltaStatic {
  ops: Array<{
    insert?: string | Record<string, any>;
    delete?: number;
    retain?: number;
    attributes?: Record<string, any>;
  }>;
  diff?: (other: DeltaStatic) => DeltaStatic;
}

// Local Imports
import { InputErrorMsg } from "@/components/ui";
import { useUncontrolled } from "@/hooks";
import {
  injectStyles,
  insertStylesToHead,
  makeStyleTag,
} from "@/utils/dom/injectStylesToHead";

// Dynamic imports - only load on client side
let Quill: any = null;
let Delta: any = null;
let quillCSS: string = "";

const DEFAULT_PLACEHOLDER = "Type here...";

type RangeStatic = {
  index: number;
  length: number;
};

interface TextEditorProps {
  readOnly?: boolean;
  value?: DeltaStatic;
  defaultValue?: DeltaStatic;
  onTextChange?: (
    delta: DeltaStatic,
    oldDelta: DeltaStatic,
    source: string,
  ) => void;
  onSelectionChange?: (
    range: RangeStatic | null,
    oldRange: RangeStatic | null,
    source: string,
  ) => void;
  onChange?: (value: DeltaStatic, quill?: any) => void;
  onReady?: (quill: any) => void;
  placeholder?: string;
  modules?: Record<string, any>;
  className?: string;
  error?: boolean | ReactNode;
  classNames?: {
    root?: string;
    container?: string;
    error?: string;
  };
  label?: ReactNode;
}

interface TextEditorRef {
  getQuillInstance: () => any | null;
  blur: () => void;
  focus: () => void;
  hasFocus: () => boolean;
}

// Loading skeleton component
const EditorSkeleton = ({ label, className, classNames }: Partial<TextEditorProps>) => (
  <div className={clsx("flex flex-col", className, classNames?.root)}>
    {label && <label>{label}</label>}
    <div className={clsx(
      "border border-gray-300 rounded-md min-h-[200px] bg-gray-50 animate-pulse",
      label && "mt-1.5",
      classNames?.container
    )}>
      <div className="h-10 bg-white border-b border-gray-200 rounded-t-md"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(
  (
    {
      readOnly,
      value,
      defaultValue,
      onTextChange,
      onSelectionChange,
      onChange,
      onReady,
      placeholder,
      modules,
      className,
      error,
      classNames,
      label,
    },
    forwardedRef,
  ) => {
    const [isClient, setIsClient] = useState(false);
    const [isQuillLoaded, setIsQuillLoaded] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any | null>(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    const [_value, handleChange] = useUncontrolled<DeltaStatic>({
      value,
      defaultValue,
      finalValue: isClient && Delta ? new Delta() : {},
      onChange,
    });

    const onChangeRef = useRef(handleChange);

    // Check if we're on client side
    useEffect(() => {
      setIsClient(true);

      // Load Quill dynamically
      const loadQuill = async () => {
        try {
          const [quillModule, quillCSSModule] = await Promise.all([
            import("quill"),
            import("quill/dist/quill.snow.css?inline")
          ]);

          console.log(quillModule)

          Quill = quillModule.default;
          // In Quill 1.3.x, Delta is imported via Quill.import
          try {
            Delta = Quill.import("delta");
          } catch (e) {
            // Fallback if Delta import fails
            console.error("Failed to import Delta:", e);
            Delta = class DeltaFallback {
              ops: any[];
              constructor() { this.ops = []; }
            };
          }
          quillCSS = quillCSSModule.default;

          // Inject styles
          const styles = `@layer vendor {
            ${quillCSS} 
          }`;
          const sheet = makeStyleTag();
          injectStyles(sheet, styles);
          insertStylesToHead(sheet);

          setIsQuillLoaded(true);
        } catch (error) {
          console.error("Failed to load Quill:", error);
        }
      };

      loadQuill();
    }, []);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
      onChangeRef.current = handleChange;
    }, [handleChange, onSelectionChange, onTextChange]);

    useEffect(() => {
      if (!isQuillLoaded || !Quill) return;

      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div"),
      );

      const quill = new Quill(editorContainer, {
        theme: "snow",
        placeholder: placeholder || DEFAULT_PLACEHOLDER,
        modules: modules || {},
      });

      quill.enable(!readOnly);

      // Initial value setting only
      if (value && typeof value === 'object') {
        quill.setContents(value);
      } else if (defaultValue && typeof defaultValue === 'object') {
        quill.setContents(defaultValue);
      }

      quillRef.current = quill;

      // Quill hazır olduğunda callback'i çağır
      onReady?.(quill);

      quill.on(Quill.events.TEXT_CHANGE, (...args: any[]) => {
        const [delta, oldDelta, source] = args;
        if (source === "user") {
          const newContent = quill.getContents();
          onChangeRef?.current(newContent, quill);
          onTextChangeRef.current?.(delta, oldDelta, source);
        }
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args: any[]) => {
        const [range, oldRange, source] = args;
        onSelectionChangeRef.current?.(range, oldRange, source);
      });

      return () => {
        quill.off(Quill.events.TEXT_CHANGE);
        quill.off(Quill.events.SELECTION_CHANGE);
        quillRef.current = null;
        container.innerHTML = "";
      };
    }, [isQuillLoaded, readOnly, modules, placeholder]);

    useImperativeHandle(forwardedRef, () => ({
      getQuillInstance: () => quillRef.current,
      blur: () => quillRef.current?.blur(),
      focus: () => quillRef.current?.focus(),
      hasFocus: () => quillRef.current?.hasFocus() ?? false,
    }));

    useEffect(() => {
      // Only update if external value prop changes (not internal state)
      if (quillRef.current && value !== undefined && Delta) {
        const currentContent = quillRef.current.getContents();
        
        // Only update if there's a real difference and we're not currently focused
        if (!quillRef.current.hasFocus()) {
          const diff = currentContent.diff(value);
          if (diff && diff?.ops?.length > 0) {
            quillRef.current.setContents(value);
          }
        }
      }
    }, [value]);

    // Show skeleton during SSR or while loading
    if (!isClient || !isQuillLoaded) {
      return <EditorSkeleton label={label} className={className} classNames={classNames} />;
    }

    return (
      <div
        className={clsx(
          "flex flex-col",
          className,
          error && "ql-error",
          classNames?.root,
        )}
      >
        {label && <label>{label}</label>}
        <div
          className={clsx(
            "ql-container",
            label && "mt-1.5!",
            classNames?.container,
          )}
          ref={containerRef}
        ></div>

        <InputErrorMsg
          when={!!error && typeof error !== "boolean"}
          className={classNames?.error}
        >
          {error}
        </InputErrorMsg>
      </div>
    );
  },
);

TextEditor.displayName = "TextEditor";

export { TextEditor };
export type { TextEditorProps, TextEditorRef };