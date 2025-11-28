import { ChevronDown, Minus } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState, type HTMLAttributes, type PropsWithChildren } from "react";

type Props = {} & PropsWithChildren;
type Dropdown = { closeDropdown: () => void, handleClick: (e: any) => void, show: boolean, toggleDropdown: () => void };

const DropdownContext = createContext({} as Dropdown);

const useDropdown = () => useContext(DropdownContext);

function Dropdown({ children }: Props) {
    const [show, setShowToggle] = useState(false);
    const dropdownRef = useRef<null | any>(null);

    const toggleDropdown = () => {
        setShowToggle(!show);
    }
    
    const closeDropdown = () => {
        setShowToggle(false);
    }

    const handleClick = (e: any) => {
        const dropdown = dropdownRef.current;
        
        if(dropdown && dropdown.contains(e.target)) {
            closeDropdown();
        }
    }
    
    useEffect(() => {
        const dropdown = dropdownRef.current;

        const clickOutside = (e: Event) => {
            if(dropdown && !dropdown.contains(e.target)) {
                closeDropdown();
            }
        }

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        }
    }, []);
    
    const state = {
        closeDropdown,
        handleClick,
        show,
        toggleDropdown
    }

    return (
        <DropdownContext.Provider value={state}>
            <div ref={dropdownRef} className="h-full relative">
                { children }
            </div>
        </DropdownContext.Provider>
    )
}

const Menu = ({ children, className }: PropsWithChildren & HTMLAttributes<HTMLDivElement>) => {
    const { handleClick, show } = useDropdown();
    
    return (
        <div
            className={`${show ? "max-h-[1000px]": "max-h-0"} w-full sm:mt-2 overflow-hidden bg-zinc-200 dark:bg-zinc-700 transition-[max-height] ${className}`}
            onClick={handleClick}
        >
            { children }
        </div>
    )
}

const Toggle = ({ children }: PropsWithChildren) => {
    const { toggleDropdown } = useDropdown();
    return (
        <button 
            className="size-full px-4 py-2 sm:p-0 grid grid-flow-col sm:grid-cols-[1fr_auto] justify-between items-center capitalize"
            onClick={toggleDropdown}
        >
            { children }
        </button>
    )
}

const ToggleIcon = () => {
    const { show } = useDropdown();
    return !show ? <ChevronDown/> : <Minus/>
}

Dropdown.Menu = Menu;
Dropdown.Toggle = Toggle;
Dropdown.ToggleIcon = ToggleIcon;

export default Dropdown;