import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import Label from "./Label";

type Props = { label?: string, message?: string } & InputHTMLAttributes<HTMLInputElement>;

function Text(props: Props) {
    const { onChange } = props;

    const [float, setFloatToggle] = useState(false);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const toggle = e.target.value !== "" ? true: false;
        setFloatToggle(toggle);
        if(onChange) onChange(e);
    }

    return (
        <Label {...props} float={float}>
            <input 
                {...props}
                type="text"
                className="w-full px-4 py-2 outline-none"
                onChange={handleChange}
            />
        </Label>
    );
}

export default Text;