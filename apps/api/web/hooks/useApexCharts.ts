import { useState, useEffect } from 'react';

export function useApexCharts() {
    const [Chart, setChart] = useState<any>(null);

    useEffect(() => {
        import("react-apexcharts").then((mod) => {
            setChart(mod.default);
        });
    }, []);

    return Chart;
};