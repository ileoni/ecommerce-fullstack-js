import { createContext, useContext, useEffect, useState, type ChangeEvent, type Dispatch, type InputHTMLAttributes, type SetStateAction } from "react";
import Label from "./Label";
import { Eye, EyeOff } from "lucide-react";

type PasswordContext = { show: boolean, setToggle: Dispatch<SetStateAction<boolean>> };
type Props = { label?: string, message?: string } & InputHTMLAttributes<HTMLInputElement>;

const PasswordContext = createContext({} as PasswordContext);

const usePassword = () => useContext(PasswordContext);

function Password(props: Props) {
    const { onChange, value, ...rest } = props;

    const [show, setToggle] = useState(false);
    const [filled, setIsFilled] = useState(false);

    const state = {
        show, setToggle
    }
    
    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const notEmpty = e.target.value !== "" ? true: false;
        setIsFilled(notEmpty);
        if(onChange) onChange(e);
    }

    useEffect(() => {
        const notEmpty = value !== "" ? true: false;
        setIsFilled(notEmpty)
    }, [value])

    return (
        <PasswordContext.Provider value={state}>
            <Label {...props} filled={filled}>
                <div className="grid grid-flow-col grid-cols-[1fr_auto]">
                    <input
                        type={show ? "text": "password"}
                        className="w-full px-4 py-2 outline-none"
                        onBlur={handleBlur}
                        {...rest}
                    />
                    <Password.Toggle />
                </div>
            </Label>
        </PasswordContext.Provider>
    )
}

const Toggle = () => {
    const { show, setToggle } = usePassword();
    return (
        <button className="px-4 w-fit" onClick={() => setToggle(!show)}>
            { show ? <Eye/>: <EyeOff/>}
        </button>
    )
}

Password.Toggle = Toggle;

export default Password;