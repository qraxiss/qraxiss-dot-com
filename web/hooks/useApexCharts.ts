import { useState, useEffect } from 'react';

// Placeholder component for SSR that accepts and ignores all props
const ChartPlaceholder = (_props: any) => null;

export function useApexCharts() {
    const [Chart, setChart] = useState<any>(() => {
        // Return placeholder during SSR
        if (typeof window === 'undefined') {
            return ChartPlaceholder;
        }
        return null;
    });

    useEffect(() => {
        // Only import on client side
        if (typeof window !== 'undefined' && !Chart) {
            import("react-apexcharts").then((mod) => {
                setChart(() => mod.default);
            }).catch(err => {
                console.error('Failed to load ApexCharts:', err);
                setChart(() => ChartPlaceholder);
            });
        }
    }, [Chart]);

    // Always return a component (either the real Chart or placeholder)
    return Chart || ChartPlaceholder;
};