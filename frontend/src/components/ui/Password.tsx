import { createContext, useContext, useState, type ChangeEvent, type Dispatch, type InputHTMLAttributes, type SetStateAction } from "react";
import Label from "./Label";
import { Eye, EyeOff } from "lucide-react";

type Password = { show: boolean, setToggle: Dispatch<SetStateAction<boolean>> };
type Props = { label?: string, message?: string } & InputHTMLAttributes<HTMLInputElement>;

const PasswordContext = createContext({} as Password);

const usePassword = () => useContext(PasswordContext);

function Password(props: Props) {
    const [show, setToggle] = useState(false);
    const [float, setFloatToggle] = useState(false);

    const state = {
        show, setToggle
    }
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const toggle = e.target.value !== "" ? true: false;
        setFloatToggle(toggle);
    }

    return (
        <PasswordContext.Provider value={state}>
            <Label {...props} float={float}>
                <div className="grid grid-flow-col grid-cols-[1fr_auto]">
                    <input
                        type={show ? "text": "password"}
                        className="w-full px-4 py-2 outline-none"
                        onChange={handleChange}
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