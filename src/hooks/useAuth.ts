import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../store/userSlice";

export function useAuth() {
    // @ts-ignore
    const {is_authenticated, username} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const login = (username:string) => {
        dispatch(updateUser({
            is_authenticated: true,
            username: username
        }))
    }

    const logout = () => {
        dispatch(cleanUser())
    }

    return {
        is_authenticated,
        username,
        logout,
        login
    };
}