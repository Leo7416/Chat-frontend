import "../styles/main.sass"
import Logo from "/src/assets/12.png"
import IconRedactor from "/src/assets/1.png"
import IconSetting from "/src/assets/2.png"
import {useAuth} from "../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Chat from "../components/Chat.tsx";
import ButtonLogout from "../components/ButtonLogout.tsx"

function MainPage() {
    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }
    }, []);

    return (
        <div className="main-page-wrapper">
            <div className="chats-container">
                <div className="bottom-panel">
                    <div className="chat-item">
                        <div className="left-container">
                            <img src={Logo} alt="" className="chat-image"/>
                        </div>
                        <h3 className="chat-title">Чат</h3>
                        <div className="icon-redactor">
                            <img src={IconRedactor} alt="" className="chat-image"/>
                        </div>
                        <div className="icon-setting">
                            <img src={IconSetting} alt="" className="chat-image"/>
                        </div>
                        <div className="search">
                            <span className="text-search">
                                <span>Поиск</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="logout-button-container"><ButtonLogout /></div>
                    
            </div>
            <Chat />
        </div>
    )
}


export default MainPage