import Theme from "../contexts/Theme";
import Header from "../components/auth/Header";
import LogoIpsum from "../components/ui/LogoIpsum";
import { NavLink } from "react-router";

function AuthLoyout() {
    return (
        <>
            <Header>
                <div className="h-full grid grid-flow-col justify-start gap-5 items-center">
                    <NavLink to="/administrador">
                        <LogoIpsum />
                    </NavLink>
                    <Theme.Toggle />
                </div>
            </Header>
        </>
    )
}

export default AuthLoyout;