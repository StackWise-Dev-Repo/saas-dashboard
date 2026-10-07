import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/LocalStorage";


const AuthContext = createContext(null);

export function AuthContextProvider({children}) {

    const [users, setUsers] = useLocalStorage("auth-users", []);
    const [currentSession, setCurrentSession] = useLocalStorage("current-session", {});

    const loginUser = (data) => {
        if (!data) {
            throw new Error("Data should be provided.");
        }
        const userExists = users.find(
            user => user.email === data.email
        );
        if (!userExists) {
            return {};
        }
        const newSession = {
            email: userExists.email,
            sessionStarts: Date.now(),
        };
        setCurrentSession(newSession);
        return newSession;
    }

    const singupUser = (data) => {
        if (!data) {
            throw new Error("Data should be provided.");
        }
        const userExists = users.find(user => user.email === data.email);
        if (userExists) {
            return {};
        }
        const newUser = {
            username: data.username,
            email: data.email,
            password: data.password,
        };
        setUsers(old => [
            ...old,
            newUser
        ]);
        const newSession = {
            email: newUser.email,
            sessionStarts: Date.now(),
        };
        setCurrentSession(newSession);
        return newSession;
    }

    const clearSession = (email) => {
        if(currentSession.email === email) {
            setCurrentSession({});
            localStorage.removeItem("current-session");
        }
    }


    return (
        <AuthContext.Provider value={{
            session: currentSession,
            login: loginUser,
            signup: singupUser,
            removeSession: clearSession,
        }}>
            {children}
        </AuthContext.Provider>
    )
};


export function useAuthContext() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("Authentication context is not provided.")
    };

    return context
}

