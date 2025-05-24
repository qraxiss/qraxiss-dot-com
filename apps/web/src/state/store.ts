import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";

import { authMiddleware } from "@/state/api/auth";
import { logsMiddleware } from "./api/logs";

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            ...[authMiddleware, logsMiddleware]
        )
    },
});

export default store;