import { NavLink, Outlet } from "react-router";

import Theme from "../contexts/Theme";
import Header from "../components/auth/Header";
import Footer from "../components/auth/Footer";
import LogoIpsum from "../components/ui/LogoIpsum";
import Container from "../components/auth/Container";

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
            <Container>
                <Outlet />
            </Container>
            <Footer>
                Desenvolvido por Igor, todos os direitos reservados.
            </Footer>
        </>
    )
}

export default AuthLoyout;