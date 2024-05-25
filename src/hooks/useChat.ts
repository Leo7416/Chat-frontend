import {useDispatch, useSelector} from "react-redux";
import {addMessage, cleanMessages} from "../store/chatSlice.ts";
import {useAuth} from "./useAuth.ts";
import {createUUID} from "../utils/utils.ts";

type ChatMessage = {
    user: string,
    message: string,
    datetime: string,
    isError: boolean
}

export function useChat() {
    // @ts-ignore
    const {messages} = useSelector(state => state.chat)

    const {username} = useAuth()

    const dispatch = useDispatch()

    const newMessage = (data: ChatMessage) => {
        console.log("newMessage");
    
        const self = data.user == username;
    
        const message = {
            self: self,
            user: data.user,
            time: new Date(Number(data.datetime)).toString(),
            content: data.message,
            error: data.isError,
            id: createUUID()
        };
    
        console.log(message);
    
        dispatch(addMessage(message));
    }    

    const exit = () => {
        dispatch(cleanMessages())
    }

    return {
        messages,
        newMessage,
        exit
    }
}