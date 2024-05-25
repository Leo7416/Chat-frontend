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
    // messages: [
    //     {
    //         id: "1",
    //         self: false,
    //         user: "Константин Арбузов",
    //         content: "Всем, привет! А у кого сейчас последняя версия продуктовой презентации?",
    //         time: new Date().toString(),
    //         error: false
    //     },
    //     {
    //         id: "2",
    //         self: false,
    //         user: "Константин Арбузов",
    //         content: "У нас встреча назначена на 12:30,хотелось бы успеть ознакомиться?",
    //         time: new Date().toString(),
    //         error: false
    //     },
    //     {
    //         id: "3",
    //         self: true,
    //         user: "Ярослав Михалёв",
    //         content: "Все проверено на моей стороне. Можно отправлять",
    //         time: new Date().toString(),
    //         error: false
    //     },
    //     {
    //         id: "4",
    //         self: false,
    //         user: "Максим Васильев",
    //         content: "Коллеги, кто сможет захватить проектор?",
    //         time: new Date().toString(),
    //         error: false
    //     },
    //     {
    //         id: "5",
    //         self: true,
    //         user: "Ярослав Михалёв",
    //         content: "Кстати, насчет оформления промо-стенда прайс-лист от подрядчика",
    //         time: new Date().toString(),
    //         error: false
    //     }
    // ],
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