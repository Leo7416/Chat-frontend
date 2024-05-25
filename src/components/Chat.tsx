import Logo from "/src/assets/13.png"
import { IconButton } from "@mui/material";
import { MessageType } from "../store/chatSlice.ts";
import moment from "moment/moment";
import Avatar from "./Avatar.tsx";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FaRegSmile } from "react-icons/fa";
import SendIcon from '@mui/icons-material/Send';
import { useChat } from "../hooks/useChat.ts";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import io from 'socket.io-client';
import { MdError } from 'react-icons/md'; // импортируем значок ошибки

const SERVER_PORT = 8080
const SERVER_URL = 'http://localhost:' + SERVER_PORT

const Chat = () => {
    const { username } = useAuth()

    const { messages, newMessage } = useChat()

    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const [message, setMessage] = useState("")

    const socketRef = useRef(null)

    useEffect(() => {
        socketRef.current = io(SERVER_URL)

        // отправляем событие добавления пользователя,
        // в качестве данных передаем объект с именем и id пользователя
        socketRef.current.emit('user:add', { username })

        // отправляем запрос на получение сообщений
        socketRef.current.emit('message:get')

        // обрабатываем получение сообщений
        socketRef.current.on('message', (message) => {
            console.log("on message")
            console.log(message)

            newMessage(message)
            setTimeout(() => scrollToBottom(), 100)
        })

        return () => {
            // при размонтировании компонента выполняем отключение сокета
            socketRef.current.disconnect()
        }
    }, []);

    const sendMessage = (message) => {
        console.log("sendMessage")
        // добавляем в объект id пользователя при отправке на сервер
        socketRef.current.emit('message', message)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!message) {
            return
        }

        sendMessage(JSON.stringify({
            "user": username,
            "datetime": new Date().getTime().toString(),
            "message": message.replace(/['"]+/g, '')
        }))

        setMessage("")
        setTimeout(() => scrollToBottom(), 100)
    }

    const scrollToBottom = () => {
        console.log("scrollToBottom")
        console.log(messagesEndRef.current?.lastElementChild)

        messagesEndRef.current?.lastElementChild?.scrollIntoView()
    }

    return (
        <div className="chat">
            <div className="top-panel">
                <div className="left-container">
                    <img src={Logo} alt="" className="chat-avatar" />
                    <h3>Чат</h3>
                </div>
            </div>
            <div className="center-panel" ref={messagesEndRef}>
                {messages.map((message: MessageType) => (
                    message.self ?
                        <div className="self-message" key={message.id}>
                            <div className={"message " + (message.error ? "error" : "")}>
                                <span className="message-content">{message.error ? "Сообщение пришло с ошибкой" : message.content}</span>
                                <span className="message-send-time">{moment(message.time).format('HH:mm')}</span>
                                {message.error && <MdError className="error-icon" />}
                            </div>
                        </div>
                        :
                        <div className="message-container" key={message.id}>
                            <div className="avatar-container">
                                <Avatar username={message.user} />
                            </div>
                            <div className="message-body">
                                <span className="username">{message.user}</span>
                                <div className={"message " + (message.error ? "error" : "")}>
                                    <span className="message-content">{message.error ? "Сообщение пришло с ошибкой" : message.content}</span>
                                    <span className="message-send-time">{moment(message.time).format('HH:mm')}</span>
                                    {message.error && <MdError className="error-icon" />}
                                </div>
                                
                            </div>
                        </div>
                ))}
            </div>
            <form className="bottom-panel" onSubmit={handleSubmit}>
                <IconButton>
                    <AccountCircleIcon style={{ fontSize: '45px' }} />
                </IconButton>
                <input type="text" className="message-input" placeholder="Написать сообщение" value={message} onChange={e => setMessage(e.target.value)} />
                <IconButton>
                    <FaRegSmile style={{ fontSize: '38px' }} />
                </IconButton>
                <IconButton type="submit">
                    <SendIcon style={{ fontSize: '38px' }} />
                </IconButton>
            </form>
        </div>
    )
}

export default Chat;
