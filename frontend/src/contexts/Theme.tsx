import { createContext, useContext, useEffect, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Moon, SunMedium, SunMoonIcon } from "lucide-react";

type Themes = "light" | "dark";
type Theme = { theme: Themes | string, setTheme: Dispatch<SetStateAction<Themes | string>>, isLight: boolean }

const ThemeContext = createContext({} as Theme);

const html = document.querySelector("html")!;
export const useTheme = () => useContext(ThemeContext);

function Theme({ children }: PropsWithChildren) {
    const { get, add } = useLocalStorage("apptheme");

    const [theme, setTheme] = useState(() => {
        const stored = get();
        return stored || "light";
    })

    const isLight = theme.includes("light") ? true: false;

    useEffect(() => {
        add(theme)
        html.dataset.theme = theme;
    }, [theme]);

    const state = {
        theme,
        setTheme,
        isLight
    }

    return <ThemeContext.Provider value={state}>{ children }</ThemeContext.Provider>
}

const Toggle = () => {
    const { isLight, setTheme } = useTheme();
    return (
        <button 
            className="p-1 bg-zinc-100 dark:bg-zinc-900 rounded-full"
            onClick={() => setTheme(() => isLight ? "dark": "light")}
        >
            { isLight ? <SunMedium /> : <SunMoonIcon /> }
        </button>
    )
}

Theme.Toggle = Toggle;

export default Theme;