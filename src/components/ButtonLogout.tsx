import { Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth.ts";
import { useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat.ts";

function ButtonLogout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { exit } = useChat();

    const handleLogout = () => {
        logout();
        exit();
        navigate("/");
    };

    return (
        <Button onClick={handleLogout}>Выйти</Button>
    );
}

export default ButtonLogout;
