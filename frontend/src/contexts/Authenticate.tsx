import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { me } from "../services/admin/me";

type User = { id: number | null, role: string };
type Authenticate = { auth: User };

const AuthenticateContext = createContext({} as Authenticate);

export const useAuth = () => useContext(AuthenticateContext);

function Authenticate({ children }: PropsWithChildren) {
    const [auth, setAuth] = useState<User>({ id: null, role: "" });

    useEffect(() => {
        me()
        .then(async res => {
            const { data } = await res.json();
            setAuth(data);
        });
    }, [])

    const state = {
        auth
    }

    return (
        <AuthenticateContext.Provider value={state}>
            { children }
        </AuthenticateContext.Provider>
    )
}

export default Authenticate;