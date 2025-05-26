import { h } from 'preact';
import App from './App';
import Component from './Component';

type Config = {
    url: string;
    props: {
        pageProps: Record<string, any>;
        appProps: Record<string, any>;
    };
};

export const createApp = ({ url, props }: Config) => {
    console.log(url, props)

    return {
        component: <Component blabla='"' />,
    };
};
