import { useState, useEffect } from 'react';

interface SyntaxHighlighterProps {
  children: string;
  language?: string;
  [key: string]: any;
}

function SyntaxHighlighter({ children, language = 'jsx', ...rest }: SyntaxHighlighterProps) {
  const [PrismLight, setPrismLight] = useState<any>(null);
  const [atomDark, setAtomDark] = useState<any>(null);

  useEffect(() => {
    const loadHighlighter = async () => {
      const { PrismLight: PrismLightComponent } = await import('react-syntax-highlighter');
      const { atomDark: atomDarkStyle } = await import('react-syntax-highlighter/dist/cjs/styles/prism');
      const jsx = await import('react-syntax-highlighter/dist/cjs/languages/prism/jsx');

      PrismLightComponent.registerLanguage('jsx', jsx.default);

      setPrismLight(() => PrismLightComponent);
      setAtomDark(atomDarkStyle);
    };

    loadHighlighter();
  }, []);

  if (!PrismLight || !atomDark) {
    return <pre>{children}</pre>; // Fallback
  }

  return (
    <PrismLight style={atomDark} language={language} {...rest}>
      {children}
    </PrismLight>
  );
}

export { SyntaxHighlighter };