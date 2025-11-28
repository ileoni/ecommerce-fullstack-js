import { MenuIcon, X } from "lucide-react";
import { createContext, useContext, useState, type Dispatch, type JSX, type PropsWithChildren, type SetStateAction } from "react";
import Dropdown from "./Dropdown";
import { useConfigs } from "../../hooks/useConfigs";
import { NavLink, useLocation } from "react-router";

type Navbar = { show: boolean, setShowToggle: Dispatch<SetStateAction<boolean>> }

const NavbarContext = createContext({} as Navbar);   

const useNavbar = () => useContext(NavbarContext);

function Navbar({ children }: PropsWithChildren) {
    const [show, setShowToggle] = useState(false);

    const state = {
        show, setShowToggle
    }
    
    return (
        <NavbarContext.Provider value={state}>
            { children }
        </NavbarContext.Provider>
    )
}

const Toggle = () => {
    const { show, setShowToggle } = useNavbar();
    return (
        <button
            className="p-1 sm:hidden bg-zinc-100 dark:bg-zinc-900 rounded-full"
            onClick={() => setShowToggle(!show)}
        >
            { !show ? <MenuIcon /> : <X /> }
        </button>
    )
}


const Menu = () => {
    const { pathname } = useLocation();
    const { show } = useNavbar();

    const items = useConfigs("menus.admin.authenticate");

    const createMenuRows = () => {
        let html: JSX.Element[] = [];

        const itemsArray = Object.entries(items);
        for (const [index, item] of itemsArray as any) {            
            if(item.isVisible) {
                if(item.children?.visible) {
                    const { isVisible, ...restChildren } = item.children.visible; // feito para remover o item extra no filho
                    const childrenArray = Object.values(restChildren);

                    html.push(
                        <li key={index} className={`capitalize ${pathname.includes(item.slug) ? "sm:border-b-4 border-zinc-200 dark:border-zinc-700 transition-[border]" : ""}`}>
                            <Dropdown>
                                <Dropdown.Toggle>
                                    <span>{item.title}</span> <Dropdown.ToggleIcon />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="sm:absolute z-50">
                                    <ul>
                                        {childrenArray.map((child: any, index) => (
                                            <li key={index}>
                                                <NavLink className="px-4 py-2 block" to={ child.slug }>
                                                    { child.title }
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    );
                } else {
                    html.push(
                        <li 
                            key={index}
                            className={`size-full px-4 py-2 lg:p-0 grid sm:place-content-center capitalize ${pathname.includes(item.slug) ? "sm:border-b-4 border-zinc-200 dark:border-zinc-700 transition-all" : ""}`}
                        >
                            <NavLink to={item.slug}>
                                { item.title }
                            </NavLink>
                        </li>
                    );
                }
            }
        }
        
        return html;
    }

    return (
        <nav className={`${show ? "max-h-[1000px]": "max-h-0"} sm:max-h-full size-full overflow-y-hidden sm:overflow-y-visible transition-[max-height]`}>
            <ul className="h-full sm:grid grid-flow-col divide-y sm:divide-y-0 divide-zinc-200 dark:divide-zinc-700">
                { createMenuRows() }
            </ul>
        </nav>
    );
}

Navbar.Toggle = Toggle;
Navbar.Menu = Menu;

export default Navbar;