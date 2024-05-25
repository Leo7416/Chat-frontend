import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./userSlice.ts"
import chatReducer from "./chatSlice.ts"

export default configureStore({
    reducer: {
        chat: chatReducer,
        user: userReducer
    }
});