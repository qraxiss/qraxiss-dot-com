// Import Dependencies
import { ComponentType, SVGProps } from "react";

// ----------------------------------------------------------------------

interface SafeIconProps extends SVGProps<SVGSVGElement> {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/**
 * SafeIcon wrapper to prevent SSR issues with icon components
 * Ensures icons render properly during server-side rendering
 */
export function SafeIcon({ Icon, ...props }: SafeIconProps) {
  // During SSR, render a placeholder that accepts all icon props
  if (typeof window === 'undefined') {
    return <svg {...props} style={{ display: 'none' }} />;
  }

  // On client side, render the actual icon
  return <Icon {...props} />;
}