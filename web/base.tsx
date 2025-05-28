import routes from './routes.js';

type Config = {
    url: string;
    props: {
        pageProps: Record<string, any>;
        appProps: Record<string, any>;
    };
};

export const createApp = ({ url, props }: Config) => {
    // Remove /web prefix if present for route matching
    const normalizedUrl = url.startsWith('/web') ? url.slice(4) : url;
    
    const route = routes.find((route) => route.match(normalizedUrl));
    
    if (!route) {
        return {
            metadata: { title: 'Not Found' },
            component: <div>Route not found for {normalizedUrl}</div>,
        };
    }
    
    const Component = route.component;

    return {
        metadata: route.metadata(props),
        component: <Component {...props} />,
    };
};
