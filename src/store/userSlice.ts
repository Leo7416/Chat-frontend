import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    username: "",
    is_authenticated: false
}

const authSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateUser: (state, action) => {
            state.is_authenticated = action.payload.is_authenticated
            state.username = action.payload.username
        },
        cleanUser: (state) => {
            state.is_authenticated = false
            state.username = ""
        }
    }
})

export const { updateUser, cleanUser } = authSlice.actions

export default authSlice.reducer