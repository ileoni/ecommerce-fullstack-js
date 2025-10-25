import { useEffect, useState, type FocusEvent, type InputHTMLAttributes } from "react";
import Label from "./Label";

type Props = { label?: string, message?: string } & InputHTMLAttributes<HTMLInputElement>;

function Text(props: Props) {
    const { value, ...rest } = props;

    const [filled, setIsFilled] = useState(false);
    
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const notEmpty = e.target.value !== "" ? true: false;
        setIsFilled(notEmpty);
    }
    
    useEffect(() => {
        const notEmpty = value !== "" ? true: false;
        setIsFilled(notEmpty);
    }, [value])

    return (
        <Label {...props} filled={filled}>
            <input
                type="text"
                value={value}
                className="w-full px-4 py-2 outline-none"
                onBlur={handleBlur}
                {...rest}
            />
        </Label>
    );
}

export default Text;