import { combineReducers } from "@reduxjs/toolkit"

import { authPath, authReducer } from "@/state/api/auth"
import { logsPath, logsReducer } from "./api/logs"

export const rootReducer = combineReducers({
    [authPath]: authReducer,
    [logsPath]: logsReducer,
})