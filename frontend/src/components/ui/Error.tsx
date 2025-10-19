import { createContext, useContext, useState, type PropsWithChildren } from "react";

type Options = { show: boolean, message: string }
type Error = { options: Options, handleError: (message: string) => void }

const ErrorContext = createContext({} as Error);

export const useError = () => useContext(ErrorContext);

function Error({ children }: PropsWithChildren) {
    const [options, setOptions] =  useState(() => {
        return { show: false, message: "" }
    });

    const handleError = (message: string) => {
        setOptions({ show: true, message });
        
        setTimeout(() => {
            setOptions({ show: false, message: "" });
        }, 2500);
    }
    
    const state = {
        options,
        handleError
    }

    return (
        <ErrorContext.Provider value={state}>
            { children }
            <Error.Message />
        </ErrorContext.Provider>
    )
}

const Message = () => {
    const { options } = useError();
    return (
        <div 
            className="w-96 h-14 grid place-items-center absolute bottom-10 right-10 bg-red-400/80 dark:bg-red-300/80 border border-zinc-200 dark:border-zinc-700 rounded shadow-xl"
            style={{ visibility: options.show ? "visible": "hidden" }}
        >
            <p className="font-bold text-white">
                { options.message }
            </p>
        </div>
    )
}

Error.Message = Message;

export default Error;