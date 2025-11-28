import { useRef, useState, type ChangeEvent, type ChangeEventHandler, type InputHTMLAttributes, type MouseEvent, type MouseEventHandler } from "react";

type Props = {} & InputHTMLAttributes<HTMLInputElement>

function TogglePill(props: Props) {
    const { onClick, onChange } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [toggle, setTogglePill] = useState(false);

    const handleClick = function(callback: MouseEventHandler<HTMLDivElement> | undefined) {
        return (event: MouseEvent<HTMLDivElement>) => {
            if(!inputRef.current) return;
            inputRef.current.click();

            if(callback) callback(event);
        }
    }

    const handleChange = function(callback: ChangeEventHandler<HTMLInputElement> | undefined) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            setTogglePill(!toggle);
            if(callback) callback(event);
        }
    }

    return (
        <div 
            className="group dgrid relative"
            onClick={handleClick(onClick)}
        >
            <input
                {...props}
                hidden
                onChange={handleChange(onChange)}
                ref={inputRef}
                type="checkbox"
            />
            <span className="h-12 grid items-center">
                <span className="h-8 w-16 absolute bg-zinc-200 dark:bg-zinc-700 group-has-[input:checked]:bg-lime-300 transition-colors rounded-full"></span>
                <span 
                    className="size-6 m-1 absolute bg-white dark:bg-zinc-800 rounded-full group-has-[input:checked]:translate-x-8 transition-transform shadow shadow-zinc-800/70"
                ></span>
            </span>
        </div>
    )
}

export default TogglePill;