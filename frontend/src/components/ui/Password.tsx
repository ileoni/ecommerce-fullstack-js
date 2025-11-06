import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import Label from "./Label";
import { Eye, EyeOff } from "lucide-react";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

type PasswordContext = { show: boolean, setToggle: Dispatch<SetStateAction<boolean>> };
type Props<T extends FieldValues> = { label?: string, message?: string } & UseControllerProps<T>;

const PasswordContext = createContext({} as PasswordContext);

const usePassword = () => useContext(PasswordContext);

function Password<T extends FieldValues>(props: Props<T>) {
    const { control, name, label } = props;

    const [filled, setFilled] = useState(false);
    const [show, setToggle] = useState(false);

    const state = {
        show, setToggle
    }
    
    const { field, fieldState: { error, isDirty } } = useController({
        name,
        control
    })
    
    useEffect(() => {
        const notEmpty = field.value !== "" ? true : false;
        setFilled(notEmpty);
    }, [field])

    return (
        <PasswordContext.Provider value={state}>
            <Label label={label} isDirty={isDirty} message={error?.message} filled={filled}>
                <div className="grid grid-flow-col grid-cols-[1fr_auto]">
                    <input
                        {...field}
                        className="px-5 py-5 outline-none"
                        type={show ? "text": "password"}
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