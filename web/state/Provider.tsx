import { Provider } from "react-redux";
import store from "./store";
import { ReactNode } from "react";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
}

export { ReduxProvider }