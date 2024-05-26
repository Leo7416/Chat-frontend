import { createSlice } from "@reduxjs/toolkit"

export type MessageType = {
    self: boolean,
    user: string,
    content: string,
    datetime: string,
    id: string,
    isError: boolean
}

type chatStateType = {
    messages: MessageType[]
}


const initialState:chatStateType = {
    messages: []
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload]
        },
        cleanMessages: (state) => {
            state.messages = []
        }
    }
})

export const { addMessage, cleanMessages } = chatSlice.actions

export default chatSlice.reducer