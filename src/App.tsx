import AuthPage from "./pages/auth";
import "./App.sass"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/main";
import {Provider} from "react-redux";
import store from "./store/store"

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/chat" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App
