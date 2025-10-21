import { createContext, useContext, useState, type HTMLAttributes, type PropsWithChildren } from "react";
import AlertDangerStyle from "../components/ui/HOC/AlertDangerStyle";
import AlertWarningStyle from "../components/ui/HOC/AlertWarningStyle";
import AlertInfoStyle from "../components/ui/HOC/AlertInfoStyle";
import AlertSuccessStyle from "../components/ui/HOC/AlertSucessoStyle";


type Type = "danger" | "warning" | "info" | "success"; 
type Options = { show: boolean, message: string }
type Alert = { options: Options, handleShowAlert: (message: string, type: Type, timeout?: number | undefined) => void }

const AlertContext = createContext({} as Alert);

export const useAlert = () => useContext(AlertContext);

const initialState = {
    show: false, message: "", type: ""
}

function Alert({ children }: PropsWithChildren) {
    const [options, setOptions] = useState(initialState);

    const handleShowAlert = (message: string, type: Type, timeout: number | undefined = 2500) => {
        setOptions({ show: true, message, type });
        setTimeout(() => setOptions(initialState), timeout);
    }

    const state = {
        options,
        handleShowAlert
    }

    const AlertDanger = AlertDangerStyle(Alert.Body);
    const AlertWarning = AlertWarningStyle(Alert.Body);
    const AlertInfo = AlertInfoStyle(Alert.Body);
    const AlertSuccess = AlertSuccessStyle(Alert.Body);

    return (
        <AlertContext.Provider value={state}>
            { children }
            {
                options.type.includes("danger") && (
                    <AlertDanger style={{ visibility: options.show ? "visible": "hidden" }}/>
                ) || options.type.includes("warning") && (
                    <AlertWarning style={{ visibility: options.show ? "visible": "hidden" }}/>
                ) || options.type.includes("info") && (
                    <AlertInfo style={{ visibility: options.show ? "visible": "hidden" }}/>
                ) || options.type.includes("success") && (
                    <AlertSuccess style={{ visibility: options.show ? "visible": "hidden" }}/>
                )
            }
        </AlertContext.Provider>
    )
}

const Body = (props: HTMLAttributes<HTMLDivElement>) => {
    const { options } = useAlert();
    return <div {...props}>{ options.message }</div>;
}

Alert.Body = Body;

export default Alert;