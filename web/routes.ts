import { match } from 'path-to-regexp';

function removeTrailingSlash(path: string) {
    return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

function defaultMetadata() {
    return {
        title: '',
    };
}

function getPageRoutes(importMap: any) {
    return (
        Object.keys(importMap)
            // Ensure that static routes have
            // precedence over the dynamic ones
            .sort((a, b) => (a > b ? -1 : 1))
            .map((path) => {
                const normalizedPath = removeTrailingSlash(
                    path
                        // Remove /app/pages and .tsx extension
                        .slice(10, -4)
                        // Replace [id] with :id
                        .replace(/\[(\w+)\]/, (_, m) => `:${m}`)
                        // Replace '/index' with '/'
                        .replace(/\/index$/, '/'),
                );

                return {
                    path: normalizedPath,
                    match: match(normalizedPath),
                    component: importMap[path].default,
                    metadata: importMap[path].metadata ?? defaultMetadata,
                };
            })
    );
}

export default getPageRoutes(
    (import.meta as any).glob('/app/pages/**/*.(t|j)sx', { eager: true }),
);
