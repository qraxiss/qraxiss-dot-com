// SSR stubs for external React components
// This file provides SSR-safe versions of components that cause issues during server-side rendering

// Heroicons stub for SSR
export const createIconStub = (displayName: string) => {
  const IconStub = (props: any) => {
    // During SSR, render an empty span with the className
    if (typeof window === 'undefined') {
      return props.className ? 
        <span className={props.className} style={{ display: 'none' }} /> : 
        <span style={{ display: 'none' }} />;
    }
    // This should never be reached since we'll use real icons on client
    return null;
  };
  
  IconStub.displayName = displayName;
  return IconStub;
};

// Export common icon stubs
export const EllipsisHorizontalIcon = createIconStub('EllipsisHorizontalIcon');
export const ChevronRightIcon = createIconStub('ChevronRightIcon');
export const ChevronDownIcon = createIconStub('ChevronDownIcon');
export const PresentationChartLineIcon = createIconStub('PresentationChartLineIcon');
export const ClockIcon = createIconStub('ClockIcon');
export const TicketIcon = createIconStub('TicketIcon');
export const ShieldCheckIcon = createIconStub('ShieldCheckIcon');
export const ArrowTrendingUpIcon = createIconStub('ArrowTrendingUpIcon');
export const ArrowTrendingDownIcon = createIconStub('ArrowTrendingDownIcon');