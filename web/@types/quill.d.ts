// Type declarations for Quill in SSR environment
declare module 'quill/dist/quill.snow.css?inline' {
  const content: string;
  export default content;
}

// Re-export types from the main module
declare module 'quill' {
  export interface DeltaOperation {
    insert?: any;
    delete?: number;
    retain?: number;
    attributes?: any;
  }

  export interface Delta {
    ops: DeltaOperation[];
    diff(other: Delta): Delta;
  }

  export interface RangeStatic {
    index: number;
    length: number;
  }

  export interface QuillOptionsStatic {
    theme?: string;
    modules?: any;
    placeholder?: string;
    readOnly?: boolean;
    debug?: string | boolean;
    formats?: string[];
    bounds?: HTMLElement | string | null;
    scrollingContainer?: HTMLElement | string | null;
    strict?: boolean;
  }

  export interface EventEmitter {
    on(eventName: string, handler: Function): EventEmitter;
    off(eventName: string, handler: Function): EventEmitter;
    once(eventName: string, handler: Function): EventEmitter;
    emit(eventName: string, ...args: any[]): EventEmitter;
  }

  export interface Quill extends EventEmitter {
    constructor(container: HTMLElement | string, options?: QuillOptionsStatic): void;
    
    // Content manipulation
    deleteText(index: number, length: number, source?: string): Delta;
    disable(): void;
    enable(enabled?: boolean): void;
    getContents(index?: number, length?: number): Delta;
    getLength(): number;
    getText(index?: number, length?: number): string;
    insertEmbed(index: number, type: string, value: any, source?: string): Delta;
    insertText(index: number, text: string, source?: string): Delta;
    insertText(index: number, text: string, format: string, value: any, source?: string): Delta;
    insertText(index: number, text: string, formats: { [key: string]: any }, source?: string): Delta;
    setContents(delta: Delta, source?: string): Delta;
    setText(text: string, source?: string): Delta;
    updateContents(delta: Delta, source?: string): Delta;
    
    // Formatting
    format(name: string, value: any, source?: string): Delta;
    formatLine(index: number, length: number, source?: string): Delta;
    formatLine(index: number, length: number, format: string, value: any, source?: string): Delta;
    formatLine(index: number, length: number, formats: { [key: string]: any }, source?: string): Delta;
    formatText(index: number, length: number, source?: string): Delta;
    formatText(index: number, length: number, format: string, value: any, source?: string): Delta;
    formatText(index: number, length: number, formats: { [key: string]: any }, source?: string): Delta;
    getFormat(index?: number, length?: number): { [key: string]: any };
    removeFormat(index: number, length: number, source?: string): Delta;
    
    // Selection
    blur(): void;
    focus(): void;
    getBounds(index: number, length?: number): any;
    getSelection(focus?: boolean): RangeStatic | null;
    hasFocus(): boolean;
    setSelection(index: number, length: number, source?: string): void;
    setSelection(range: RangeStatic | null, source?: string): void;
    
    // Editor
    addContainer(className: string, refNode?: any): HTMLDivElement;
    getModule(name: string): any;
    
    // Clipboard
    clipboard: {
      dangerouslyPasteHTML(html: string): void;
      dangerouslyPasteHTML(index: number, html: string): void;
    };
    
    // Static methods
    static import(path: string): any;
    static register(path: string, module: any, suppressWarning?: boolean): void;
    static events: {
      EDITOR_CHANGE: string;
      SCROLL_BEFORE_UPDATE: string;
      SCROLL_OPTIMIZE: string;
      SCROLL_UPDATE: string;
      SELECTION_CHANGE: string;
      TEXT_CHANGE: string;
    };
  }

  const Quill: {
    new(container: HTMLElement | string, options?: QuillOptionsStatic): Quill;
    import(path: string): any;
    register(path: string, module: any, suppressWarning?: boolean): void;
    events: {
      EDITOR_CHANGE: string;
      SCROLL_BEFORE_UPDATE: string;
      SCROLL_OPTIMIZE: string;
      SCROLL_UPDATE: string;
      SELECTION_CHANGE: string;
      TEXT_CHANGE: string;
    };
  };

  export default Quill;
}