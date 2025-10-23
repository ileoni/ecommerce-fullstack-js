import Theme from "../contexts/Theme";
import Header from "../components/ui/Header";
import LogoIpsum from "../components/ui/LogoIpsum";
import Navbar from "../components/ui/Navbar";
import DropdownAvatar from "../components/ui/DropdownAvatar";
import Logo from "../assets/react.svg";
import { NavLink } from "react-router";
import { useConfigs } from "../hooks/useConfigs";

function AdminLayout() {
    const { profile, logout } = useConfigs("menus.admin.authenticate");

    return (
        <>
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
                                <DropdownAvatar>
                                    <DropdownAvatar.Toggle>
                                        <img src={Logo} alt="" />
                                    </DropdownAvatar.Toggle>
                                    <DropdownAvatar.Menu>
                                        <ul>
                                            <li className="px-4 py-2">
                                                <NavLink to={ profile.slug }>
                                                    { profile.title }
                                                </NavLink>
                                            </li>
                                        </ul>
                                        <ul className="bg-zinc-300 dark:bg-zinc-600">
                                            <li className="px-4 py-2">
                                                <NavLink to={ logout.slug }>
                                                    { logout.title }
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </DropdownAvatar.Menu>
                                </DropdownAvatar>
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
            {/* <Footer>
                Desenvolvido por Igor, todos os direitos reservados.
            </Footer> */}
        </>
    )
}

export default AdminLayout;