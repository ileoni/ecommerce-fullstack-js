import { Outlet } from "react-router";

import Theme from "../contexts/Theme";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";
import Container from "../components/ui/Container";
import LogoIpsum from "../components/ui/LogoIpsum";
import Authenticate from "../contexts/Authenticate";
import DropdownWithAvatar from "../components/admin/DropdownWithAvatar";

function AdminLayout() {
    return (
        <Authenticate>
            <Header>
                <Navbar>
                    <div className="h-16 px-4 lg:px-0">
                        <div className="max-w-5xl h-full mx-auto relative grid grid-flow-col justify-between items-center">
                            <div className="h-full grid grid-flow-col justify-start items-center gap-5">
                                <Navbar.Toggle />
                                <LogoIpsum />
                                <Theme.Toggle />
                            </div>
                            <div className="relative grid items-center">
                                <DropdownWithAvatar />
                            </div>
                        </div>
                    </div>
                    <div className="sm:h-16">
                        <div className="max-w-5xl h-full mx-auto">
                            <Navbar.Menu />
                        </div>
                    </div>
                </Navbar>
            </Header>
            <Container>
                <Outlet />
            </Container>
            <Footer>
                Desenvolvido por Igor, todos os direitos reservados.
            </Footer>
        </Authenticate>
    )
}

export default AdminLayout;