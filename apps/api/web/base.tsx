import { h } from 'preact';

type Config = {
    url: string;
    props: {
        pageProps: Record<string, any>;
        appProps: Record<string, any>;
    };
};

export const createApp = ({ url, props }: Config) => {
    return {
        component: <></>,
    };
};
