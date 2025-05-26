import { useState, useEffect, useRef } from 'react';

type ImportFunction<T> = () => Promise<T>;

interface UseDynamicImportOptions {
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}

interface UseDynamicImportReturn<T> {
    component: T | null;
    loading: boolean;
    error: Error | null;
    retry: () => void;
}

export function useDynamicImport<T = any>(
    importFunction: ImportFunction<T>,
    options: UseDynamicImportOptions = {}
): UseDynamicImportReturn<T> {
    const [component, setComponent] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const mountedRef = useRef(true);

    const { onError, onSuccess } = options;

    const loadComponent = async () => {
        try {
            setLoading(true);
            setError(null);

            const module = await importFunction();

            if (mountedRef.current) {
                setComponent(module);
                onSuccess?.();
            }
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Import failed');

            if (mountedRef.current) {
                setError(error);
                onError?.(error);
            }
        } finally {
            if (mountedRef.current) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        mountedRef.current = true;
        loadComponent();

        return () => {
            mountedRef.current = false;
        };
    }, []);

    const retry = () => {
        if (!loading) {
            loadComponent();
        }
    };

    return {
        component,
        loading,
        error,
        retry
    };
}

export function useApexCharts() {
    return useDynamicImport(
        () => import('react-apexcharts').then(mod => mod.default),
        {
            onError: (error) => console.error('ApexCharts yüklenemedi:', error),
            onSuccess: () => console.log('ApexCharts başarıyla yüklendi')
        }
    );
}